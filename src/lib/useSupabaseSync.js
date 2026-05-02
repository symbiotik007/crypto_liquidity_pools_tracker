// src/lib/useSupabaseSync.js
// Sincronización bidireccional con Supabase para pools y wallets
// Estrategia: Supabase es la fuente de verdad, localStorage es cache local
// Las private keys NUNCA van a Supabase — solo a localStorage

import { useState, useEffect, useCallback, useRef } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from './supabase'
import { fetchPools, insertPool, deletePool } from '../features/pools/services/poolsService'

// Helper global — inserta notificación para cualquier usuario
export async function insertarNotificacion(userId, tipo, titulo, mensaje) {
  return supabase.from('notificaciones').insert({ user_id: userId, tipo, titulo, mensaje })
}

// ════════════════════════════════════════════════════════════════════
// POOLS SYNC  (React Query — shared cache across all consumers)
// ════════════════════════════════════════════════════════════════════
export function usePoolsSync(userId) {
  const queryClient = useQueryClient()
  const qKey = ['pools', userId]

  const { data: pools = [], isPending: loading, error: qError } = useQuery({
    queryKey: qKey,
    queryFn: async () => {
      const fresh = await fetchPools(userId)
      // Preserve enriched runtime fields (revert, currentPrice, status, valueUsd, amounts)
      // that were written by enrichPoolsWithMarketData — Supabase only stores base DB fields
      let cached = []
      try { cached = JSON.parse(localStorage.getItem('liquidity_engine_pools') || '[]') } catch {}
      const cachedById = Object.fromEntries(cached.map(p => [String(p.tokenId), p]))
      const RUNTIME = ['revert', 'currentPrice', 'status', 'valueUsd', 'amount0', 'amount1', '_noLiveData', 'og_owner']
      const merged = fresh.map(p => {
        const c = cachedById[String(p.tokenId)]
        if (!c || !c.revert) return p
        const patch = {}
        for (const k of RUNTIME) if (c[k] !== undefined) patch[k] = c[k]
        return { ...p, ...patch }
      })
      localStorage.setItem('liquidity_engine_pools', JSON.stringify(merged))
      return merged
    },
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
    initialData: () => {
      try { return JSON.parse(localStorage.getItem('liquidity_engine_pools') || '[]') } catch { return [] }
    },
    initialDataUpdatedAt: () => {
      try {
        const cached = JSON.parse(localStorage.getItem('liquidity_engine_pools') || '[]')
        return cached.length > 0 ? Date.now() : 0
      } catch { return 0 }
    },
  })

  const { mutateAsync: addPool } = useMutation({
    mutationFn: (pool) => insertPool(pool, userId),
    onSuccess: (newPool) => {
      queryClient.setQueryData(qKey, prev => {
        const updated = [...(prev || []), newPool]
        localStorage.setItem('liquidity_engine_pools', JSON.stringify(updated))
        return updated
      })
    },
  })

  const { mutateAsync: removePool } = useMutation({
    mutationFn: async (tokenId) => {
      const pool = (queryClient.getQueryData(qKey) || []).find(p => String(p.tokenId) === String(tokenId))
      if (userId && pool?._dbId) await deletePool(pool._dbId)
      return tokenId
    },
    onSuccess: (tokenId) => {
      queryClient.setQueryData(qKey, prev => {
        const updated = (prev || []).filter(p => String(p.tokenId) !== String(tokenId))
        localStorage.setItem('liquidity_engine_pools', JSON.stringify(updated))
        return updated
      })
    },
  })

  const setPools = useCallback((newPools) => {
    const updated = typeof newPools === 'function' ? newPools(queryClient.getQueryData(qKey) || []) : newPools
    queryClient.setQueryData(qKey, updated)
    localStorage.setItem('liquidity_engine_pools', JSON.stringify(updated))
  }, [queryClient, qKey])

  const updatePoolRuntime = useCallback((tokenId, runtimeData) => {
    queryClient.setQueryData(qKey, prev =>
      (prev || []).map(p => p.tokenId === tokenId ? { ...p, ...runtimeData } : p)
    )
  }, [queryClient, qKey])

  const reload = () => queryClient.invalidateQueries({ queryKey: qKey })

  return { pools, setPools, loading, error: qError?.message || null, addPool, removePool, updatePoolRuntime, reload }
}

// ════════════════════════════════════════════════════════════════════
// WALLETS SYNC  (React Query — shared cache across all consumers)
// Private keys NUNCA van a Supabase — solo dirección y metadata
// ════════════════════════════════════════════════════════════════════
export function useWalletsSync(userId) {
  const queryClient = useQueryClient()
  const qKey = ['wallets', userId]

  const { data: wallets = [], isPending: loading, error: qError } = useQuery({
    queryKey: qKey,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('wallets')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
      if (error) throw error

      const mapped = (data || []).map(row => ({
        id:           row.id,
        label:        row.label,
        address:      row.address,
        agentAddress: row.agent_address,
        purpose:      row.purpose,
        exchange:     row.exchange || 'hyperliquid',
        createdAt:    new Date(row.created_at).getTime(),
        privateKey:   row.private_key || localStorage.getItem(`hl_pk_${row.id}`) || '',
      }))

      localStorage.setItem('hl_wallets', JSON.stringify(mapped))

      // Migrate private keys from localStorage → Supabase
      for (const row of (data || [])) {
        const localPk = localStorage.getItem(`hl_pk_${row.id}`)
        if (localPk && !row.private_key) {
          await supabase.from('wallets').update({ private_key: localPk }).eq('id', row.id)
          localStorage.removeItem(`hl_pk_${row.id}`)
        }
      }

      return mapped
    },
    enabled: !!userId,
    initialData: () => {
      try { return JSON.parse(localStorage.getItem('hl_wallets') || '[]') } catch { return [] }
    },
    initialDataUpdatedAt: 0,
  })

  const { mutateAsync: addWallet } = useMutation({
    mutationFn: async ({ label, address, agentAddress, purpose, privateKey, exchange }) => {
      const { data, error } = await supabase
        .from('wallets')
        .insert({
          user_id:       userId,
          label,
          address,
          agent_address: agentAddress || null,
          private_key:   privateKey   || null,
          purpose:       purpose      || 'proteccion',
          exchange:      exchange     || 'hyperliquid',
        })
        .select()
        .single()
      if (error) {
        if (error.code === '23505') throw new Error('Esta wallet ya está registrada')
        throw error
      }
      return {
        id:           data.id,
        label:        data.label,
        address:      data.address,
        agentAddress: data.agent_address,
        purpose:      data.purpose,
        exchange:     data.exchange || 'hyperliquid',
        createdAt:    new Date(data.created_at).getTime(),
        privateKey:   data.private_key || '',
      }
    },
    onSuccess: (newWallet) => {
      queryClient.setQueryData(qKey, prev => {
        const updated = [newWallet, ...(prev || [])]
        localStorage.setItem('hl_wallets', JSON.stringify(updated))
        return updated
      })
    },
  })

  const { mutateAsync: removeWallet } = useMutation({
    mutationFn: async (id) => {
      await supabase.from('wallets').delete().eq('id', id)
      localStorage.removeItem(`hl_pk_${id}`)
      return id
    },
    onSuccess: (id) => {
      queryClient.setQueryData(qKey, prev => {
        const updated = (prev || []).filter(w => w.id !== id)
        localStorage.setItem('hl_wallets', JSON.stringify(updated))
        return updated
      })
    },
  })

  const reload = () => queryClient.invalidateQueries({ queryKey: qKey })

  return { wallets, loading, error: qError?.message || null, addWallet, removeWallet, reload }
}

// ════════════════════════════════════════════════════════════════════
// NOTAS SYNC
// notas es un mapa { [leccionId]: contenido }
// Escritura local inmediata → Supabase con debounce de 800ms
// Tabla requerida:
//   create table notas (
//     id uuid default gen_random_uuid() primary key,
//     user_id uuid references auth.users(id) on delete cascade not null,
//     leccion_id text not null,
//     contenido text not null default '',
//     updated_at timestamptz default now(),
//     unique(user_id, leccion_id)
//   );
//   alter table notas enable row level security;
//   create policy "own notes" on notas for all
//     using (auth.uid() = user_id) with check (auth.uid() = user_id);
// ════════════════════════════════════════════════════════════════════
export function useNotasSync(userId) {
  const [notas, setNotas] = useState(() => {
    try { return JSON.parse(localStorage.getItem('crypto_edu_notas') || '{}') }
    catch { return {} }
  })
  const [saving, setSaving]     = useState(false)
  const [lastSaved, setLastSaved] = useState(null)
  const [syncError, setSyncError] = useState(null)
  const timer = useRef(null)

  const [notasMeta, setNotasMeta] = useState(() => {
    try { return JSON.parse(localStorage.getItem('crypto_edu_notas_meta') || '{}') }
    catch { return {} }
  })

  // Carga todas las notas del usuario desde Supabase al montar
  useEffect(() => {
    if (!userId) return
    supabase
      .from('notas')
      .select('leccion_id, contenido, updated_at')
      .eq('user_id', userId)
      .then(({ data, error }) => {
        if (error || !data) return
        const map  = {}
        const meta = {}
        data.forEach(r => {
          map[r.leccion_id]  = r.contenido
          meta[r.leccion_id] = r.updated_at
        })
        setNotas(prev => {
          const merged = { ...prev, ...map }
          localStorage.setItem('crypto_edu_notas', JSON.stringify(merged))
          return merged
        })
        setNotasMeta(prev => {
          const merged = { ...prev, ...meta }
          localStorage.setItem('crypto_edu_notas_meta', JSON.stringify(merged))
          return merged
        })
      })
  }, [userId])

  const saveNota = useCallback((leccionId, contenido) => {
    // 1. Escritura local inmediata — sin lag para el usuario
    setNotas(prev => {
      const updated = { ...prev, [leccionId]: contenido }
      localStorage.setItem('crypto_edu_notas', JSON.stringify(updated))
      return updated
    })
    setSyncError(null)

    // 2. Guardar en Supabase con debounce
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(async () => {
      if (!userId) return
      setSaving(true)
      const { error } = await supabase
        .from('notas')
        .upsert(
          { user_id: userId, leccion_id: leccionId, contenido, updated_at: new Date().toISOString() },
          { onConflict: 'user_id,leccion_id' }
        )
      setSaving(false)
      if (error) { setSyncError('No se pudo guardar en la nube') }
      else {
        const ts = new Date().toISOString()
        setLastSaved(new Date())
        setNotasMeta(prev => {
          const updated = { ...prev, [leccionId]: ts }
          localStorage.setItem('crypto_edu_notas_meta', JSON.stringify(updated))
          return updated
        })
      }
    }, 800)
  }, [userId])

  return { notas, notasMeta, saveNota, saving, lastSaved, syncError }
}

// ════════════════════════════════════════════════════════════════════
// PREGUNTAS SYNC
// Sistema de preguntas/respuestas con panel admin para Oscar
//
// Tabla requerida — ejecutar en Supabase SQL Editor:
//
//   create table preguntas (
//     id          uuid default gen_random_uuid() primary key,
//     user_id     uuid references auth.users(id) on delete cascade not null,
//     user_name   text,
//     pregunta    text not null,
//     respuesta   text,
//     respondida  boolean default false not null,
//     publica     boolean default true not null,
//     created_at  timestamptz default now(),
//     answered_at timestamptz
//   );
//   alter table preguntas enable row level security;
//   create policy "insert own" on preguntas for insert
//     with check (auth.uid() = user_id);
//   create policy "select own or public" on preguntas for select
//     using (auth.uid() = user_id or (respondida = true and publica = true));
//   create policy "admin select all" on preguntas for select
//     using ((auth.jwt() ->> 'email') = 'profeoscarbol@gmail.com');
//   create policy "admin update" on preguntas for update
//     using ((auth.jwt() ->> 'email') = 'profeoscarbol@gmail.com');
//   create policy "admin delete" on preguntas for delete
//     using ((auth.jwt() ->> 'email') = 'profeoscarbol@gmail.com');
// ════════════════════════════════════════════════════════════════════
export function usePreguntasSync(userId, isAdmin) {
  const [misPreguntas, setMisPreguntas]   = useState([])
  const [faqPublica,   setFaqPublica]     = useState([])
  const [pendientes,   setPendientes]     = useState([])
  const [loading,      setLoading]        = useState(true)

  const loadData = useCallback(async () => {
    setLoading(true)
    try {
      // FAQ pública — visible para todos
      const { data: faq } = await supabase
        .from('preguntas')
        .select('id, user_name, pregunta, respuesta, answered_at')
        .eq('respondida', true)
        .eq('publica', true)
        .order('answered_at', { ascending: false })
        .limit(50)
      setFaqPublica(faq || [])

      if (!userId) { setLoading(false); return }

      if (isAdmin) {
        // Admin ve todas las preguntas
        const { data: todas } = await supabase
          .from('preguntas')
          .select('*')
          .order('created_at', { ascending: false })
        const all = todas || []
        setPendientes(all.filter(p => !p.respondida))
        setMisPreguntas(all.filter(p => p.respondida))
      } else {
        // Usuario ve sus propias preguntas
        const { data: propias } = await supabase
          .from('preguntas')
          .select('*')
          .eq('user_id', userId)
          .order('created_at', { ascending: false })
        setMisPreguntas(propias || [])
      }
    } catch {}
    setLoading(false)
  }, [userId, isAdmin])

  useEffect(() => { loadData() }, [loadData])

  const enviarPregunta = useCallback(async (pregunta, userName) => {
    if (!userId) return { error: 'No autenticado' }
    const { data, error } = await supabase
      .from('preguntas')
      .insert({ user_id: userId, user_name: userName, pregunta })
      .select().single()
    if (!error && data) setMisPreguntas(prev => [data, ...prev])
    return { data, error }
  }, [userId])

  const responderPregunta = useCallback(async (id, respuesta, publica) => {
    if (!isAdmin) return { error: 'No autorizado' }
    const { data, error } = await supabase
      .from('preguntas')
      .update({ respuesta, respondida: true, publica, answered_at: new Date().toISOString() })
      .eq('id', id)
      .select().single()
    if (!error && data) {
      setPendientes(prev => prev.filter(p => p.id !== id))
      setMisPreguntas(prev => [data, ...prev])
      if (publica) setFaqPublica(prev => [data, ...prev])
      // Notificar al usuario
      await insertarNotificacion(
        data.user_id,
        'pregunta_respondida',
        '💬 Oscar respondió tu pregunta',
        `"${data.pregunta.slice(0, 80)}${data.pregunta.length > 80 ? '…' : ''}"`
      )
    }
    return { error }
  }, [isAdmin])

  const eliminarPregunta = useCallback(async (id) => {
    if (!isAdmin) return
    await supabase.from('preguntas').delete().eq('id', id)
    setPendientes(prev => prev.filter(p => p.id !== id))
    setMisPreguntas(prev => prev.filter(p => p.id !== id))
    setFaqPublica(prev => prev.filter(p => p.id !== id))
  }, [isAdmin])

  return { misPreguntas, faqPublica, pendientes, loading, isAdmin, enviarPregunta, responderPregunta, eliminarPregunta, reload: loadData }
}

// ════════════════════════════════════════════════════════════════════
// USERS ADMIN SYNC
// Solo accesible para usuarios con is_admin = true en profiles
//
// Política RLS adicional requerida en Supabase:
//   DROP POLICY IF EXISTS "admin update profiles" ON public.profiles;
//   CREATE POLICY "admin update profiles" ON public.profiles FOR UPDATE
//     USING (EXISTS (
//       SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = TRUE
//     ));
//   DROP POLICY IF EXISTS "admin select all profiles" ON public.profiles;
//   CREATE POLICY "admin select all profiles" ON public.profiles FOR SELECT
//     USING (EXISTS (
//       SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = TRUE
//     ));
// ════════════════════════════════════════════════════════════════════
export function useUsersAdmin(isAdmin) {
  const [users,   setUsers]   = useState([])
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState(null)

  const loadUsers = useCallback(async () => {
    if (!isAdmin) { setLoading(false); return }
    setLoading(true)
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) setError(error.message)
    else setUsers(data || [])
    setLoading(false)
  }, [isAdmin])

  useEffect(() => { loadUsers() }, [loadUsers])

  const updateUser = useCallback(async (id, changes) => {
    if (!isAdmin) return { error: 'No autorizado' }
    const { data, error } = await supabase
      .from('profiles')
      .update(changes)
      .eq('id', id)
      .select()
      .single()
    if (!error && data) {
      setUsers(prev => prev.map(u => u.id === id ? data : u))
      // Notificaciones según el cambio
      if (changes.is_paid === true)
        await insertarNotificacion(id, 'plan_actualizado', '⚡ Plan activado', '¡Bienvenido al programa Trader en Formación! Ya tienes acceso completo a todas las herramientas y el programa educativo.')
      else if (changes.is_paid === false)
        await insertarNotificacion(id, 'plan_actualizado', '📋 Plan actualizado', 'Tu plan ha sido actualizado a Potencial Trader. Contacta a Oscar si tienes dudas.')
      else if (changes.is_paused === true)
        await insertarNotificacion(id, 'plan_actualizado', '⏸ Membresía pausada', 'Tu membresía ha sido pausada temporalmente. Comunícate con Oscar para reactivarla.')
      else if (changes.is_paused === false)
        await insertarNotificacion(id, 'plan_actualizado', '▶ Membresía reactivada', '¡Tu membresía ha sido reactivada! Ya puedes acceder a todos los contenidos.')
    }
    return { data, error }
  }, [isAdmin])

  const deleteUser = useCallback(async (id) => {
    if (!isAdmin) return { error: 'No autorizado' }
    const { error } = await supabase.from('profiles').delete().eq('id', id)
    if (!error) setUsers(prev => prev.filter(u => u.id !== id))
    return { error }
  }, [isAdmin])

  return { users, loading, error, updateUser, deleteUser, reload: loadUsers }
}

// ════════════════════════════════════════════════════════════════════
// NOTIFICACIONES  (React Query + Supabase realtime)
// ════════════════════════════════════════════════════════════════════
export function useNotificaciones(userId) {
  const queryClient = useQueryClient()
  const qKey = ['notifs', userId]

  const { data: notifs = [], isPending: loading } = useQuery({
    queryKey: qKey,
    queryFn: async () => {
      const { data } = await supabase
        .from('notificaciones')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(50)
      return data || []
    },
    enabled: !!userId,
    staleTime: 60_000,
  })

  // Realtime — push new notif into cache without refetch
  useEffect(() => {
    if (!userId) return
    const channel = supabase
      .channel('notifs_' + userId)
      .on('postgres_changes', {
        event: 'INSERT', schema: 'public',
        table: 'notificaciones',
        filter: `user_id=eq.${userId}`,
      }, payload => {
        queryClient.setQueryData(qKey, prev => [payload.new, ...(prev || [])])
      })
      .subscribe()
    return () => supabase.removeChannel(channel)
  }, [userId, queryClient])

  const marcarLeida = useCallback(async (id) => {
    await supabase.from('notificaciones').update({ leida: true }).eq('id', id)
    queryClient.setQueryData(qKey, prev => (prev || []).map(n => n.id === id ? { ...n, leida: true } : n))
  }, [userId, queryClient])

  const marcarTodasLeidas = useCallback(async () => {
    if (!userId) return
    await supabase.from('notificaciones').update({ leida: true }).eq('user_id', userId).eq('leida', false)
    queryClient.setQueryData(qKey, prev => (prev || []).map(n => ({ ...n, leida: true })))
  }, [userId, queryClient])

  const noLeidas = notifs.filter(n => !n.leida).length
  const reload = () => queryClient.invalidateQueries({ queryKey: qKey })

  return { notifs, loading, noLeidas, marcarLeida, marcarTodasLeidas, reload }
}

// ════════════════════════════════════════════════════════════════════
// COBERTURAS (Hedge Tracker)
//
// Tabla requerida — ejecutar en Supabase SQL Editor:
//
//   create table coberturas (
//     id          uuid default gen_random_uuid() primary key,
//     user_id     uuid references auth.users(id) on delete cascade not null,
//     pool_id     text not null,
//     wallet_id   text,
//     coin        text not null,
//     size        text not null,
//     leverage    numeric default 1,
//     buffer      numeric default 0,
//     stop_loss   numeric,
//     breakeven   numeric,
//     open_price  numeric,
//     opened_at   timestamptz default now(),
//     close_price numeric,
//     closed_at   timestamptz,
//     final_pnl   numeric,
//     close_reason text,
//     status      text default 'active',
//     is_demo     boolean default false,
//     chain_name  text,
//     sym0        text,
//     sym1        text,
//     pool_pair   text
//   );
//   alter table coberturas enable row level security;
//   create policy "own coberturas" on coberturas for all
//     using (auth.uid() = user_id) with check (auth.uid() = user_id);
// ════════════════════════════════════════════════════════════════════
export function useCoberturas(userId) {
  const [activas,  setActivas]  = useState([])
  const [historial, setHistorial] = useState([])
  const [loading,  setLoading]  = useState(true)

  const load = useCallback(async () => {
    if (!userId) { setLoading(false); return }
    setLoading(true)
    const { data } = await supabase
      .from('coberturas')
      .select('*')
      .eq('user_id', userId)
      .order('opened_at', { ascending: false })
      .limit(200)
    const rows = data || []
    setActivas(rows.filter(r => r.status === 'active').map(mapRow))
    setHistorial(rows.filter(r => r.status !== 'active').map(mapRow))
    setLoading(false)
  }, [userId])

  useEffect(() => { load() }, [load])

  // Realtime
  useEffect(() => {
    if (!userId) return
    const ch = supabase.channel('coberturas_' + userId)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'coberturas', filter: `user_id=eq.${userId}` },
        () => load())
      .subscribe()
    return () => supabase.removeChannel(ch)
  }, [userId, load])

  const abrir = useCallback(async (prot) => {
    if (!userId) return { error: 'No autenticado' }
    const row = {
      user_id:      userId,
      pool_id:      String(prot.poolId),
      wallet_id:    prot.walletId ?? null,
      coin:         prot.coin,
      size:         String(prot.size),
      leverage:     prot.leverage ?? 1,
      buffer:       prot.buffer ?? 0,
      stop_loss:    prot.stopLoss ?? null,
      breakeven:    prot.breakeven ?? null,
      open_price:   prot.openPrice,
      opened_at:    new Date(prot.openedAt).toISOString(),
      status:       'active',
      is_demo:      prot._demo ?? false,
      chain_name:   prot.chainName ?? null,
      sym0:         prot.sym0 ?? null,
      sym1:         prot.sym1 ?? null,
      pool_pair:    prot.poolPair ?? null,
    }
    const { data, error } = await supabase.from('coberturas').insert(row).select().single()
    if (error) console.error('[useCoberturas] abrir error:', error)
    return { data, error }
  }, [userId])

  const cerrar = useCallback(async (id, { closePrice, finalPnl, closeReason }) => {
    const { error } = await supabase.from('coberturas').update({
      status:       'closed',
      close_price:  closePrice,
      closed_at:    new Date().toISOString(),
      final_pnl:    finalPnl,
      close_reason: closeReason,
    }).eq('id', id)
    if (error) console.error('[useCoberturas] cerrar error:', error)
    else load()
    return { error }
  }, [load])

  return { activas, historial, loading, abrir, cerrar, reload: load }
}

function mapRow(r) {
  return {
    id:           r.id,
    poolId:       r.pool_id,
    walletId:     r.wallet_id,
    coin:         r.coin,
    size:         r.size,
    leverage:     r.leverage,
    buffer:       r.buffer,
    stopLoss:     r.stop_loss,
    breakeven:    r.breakeven,
    openPrice:    r.open_price,
    openedAt:     new Date(r.opened_at).getTime(),
    closePrice:   r.close_price,
    closedAt:     r.closed_at ? new Date(r.closed_at).getTime() : null,
    finalPnl:     r.final_pnl,
    closeReason:  r.close_reason,
    status:       r.status,
    _demo:        r.is_demo,
    chainName:    r.chain_name,
    sym0:         r.sym0,
    sym1:         r.sym1,
    poolPair:     r.pool_pair,
  }
}

// ════════════════════════════════════════════════════════════════════
// TRADING CONFIGS  (hl_trading)
//
//   create table trading_configs (
//     id              uuid default gen_random_uuid() primary key,
//     user_id         uuid references auth.users(id) on delete cascade not null,
//     pool_id         text not null,
//     wallet_id       text,
//     coin            text not null,
//     direction       text default 'both',
//     capital         numeric,
//     leverage        numeric default 1,
//     buffer          numeric default 0,
//     breakout_buffer numeric,
//     stop_loss       numeric,
//     breakeven       numeric,
//     trailing_stop   boolean default false,
//     take_profit     numeric,
//     auto_rearm      boolean default false,
//     status          text default 'active',
//     activated_at    timestamptz default now()
//   );
//   alter table trading_configs enable row level security;
//   create policy "own trading_configs" on trading_configs for all
//     using (auth.uid() = user_id) with check (auth.uid() = user_id);
// ════════════════════════════════════════════════════════════════════
export function useTradingConfigs(userId) {
  const [configs,  setConfigs]  = useState([])
  const [loading,  setLoading]  = useState(true)

  const syncLS = (rows) => {
    // Mantiene localStorage en sync para que PoolCard.savedTrading siga funcionando
    localStorage.setItem('hl_trading', JSON.stringify(rows))
  }

  const load = useCallback(async () => {
    if (!userId) {
      // Fallback a localStorage si no hay sesión
      try { setConfigs(JSON.parse(localStorage.getItem('hl_trading') || '[]')) } catch {}
      setLoading(false); return
    }
    setLoading(true)
    const { data } = await supabase
      .from('trading_configs')
      .select('*')
      .eq('user_id', userId)
      .order('activated_at', { ascending: false })
    const rows = (data || []).map(mapTradingRow)
    setConfigs(rows)
    syncLS(rows)
    setLoading(false)
  }, [userId])

  useEffect(() => { load() }, [load])

  const guardar = useCallback(async (cfg) => {
    const newCfg = { ...cfg, id: crypto.randomUUID(), activatedAt: Date.now(), status: 'active' }
    if (userId) {
      const { error } = await supabase.from('trading_configs').insert({
        user_id:         userId,
        pool_id:         String(cfg.poolId),
        wallet_id:       cfg.walletId ?? null,
        coin:            cfg.coin,
        direction:       cfg.direction ?? 'both',
        capital:         cfg.capital ?? null,
        leverage:        cfg.leverage ?? 1,
        buffer:          cfg.buffer ?? 0,
        breakout_buffer: cfg.breakoutBuffer ?? null,
        stop_loss:       cfg.stopLoss ?? null,
        breakeven:       cfg.breakeven ?? null,
        trailing_stop:   cfg.trailingStop ?? false,
        take_profit:     cfg.takeProfit ?? null,
        auto_rearm:      cfg.autoRearm ?? false,
        status:          'active',
      })
      if (!error) { load(); return { ok: true } }
    }
    // Fallback: solo localStorage
    const ls = JSON.parse(localStorage.getItem('hl_trading') || '[]')
    ls.push(newCfg)
    localStorage.setItem('hl_trading', JSON.stringify(ls))
    setConfigs(prev => [newCfg, ...prev])
    return { ok: true }
  }, [userId, load])

  const desactivar = useCallback(async (poolId) => {
    if (userId) {
      await supabase.from('trading_configs')
        .update({ status: 'closed' })
        .eq('user_id', userId).eq('pool_id', String(poolId)).eq('status', 'active')
      load()
    }
    const ls = JSON.parse(localStorage.getItem('hl_trading') || '[]')
    localStorage.setItem('hl_trading', JSON.stringify(
      ls.map(c => c.poolId === poolId ? { ...c, status: 'closed' } : c)
    ))
  }, [userId, load])

  return { configs, loading, guardar, desactivar, reload: load }
}

function mapTradingRow(r) {
  return {
    id:             r.id,
    poolId:         r.pool_id,
    walletId:       r.wallet_id,
    coin:           r.coin,
    direction:      r.direction,
    capital:        r.capital,
    leverage:       r.leverage,
    buffer:         r.buffer,
    breakoutBuffer: r.breakout_buffer,
    stopLoss:       r.stop_loss,
    breakeven:      r.breakeven,
    trailingStop:   r.trailing_stop,
    takeProfit:     r.take_profit,
    autoRearm:      r.auto_rearm,
    status:         r.status,
    activatedAt:    r.activated_at ? new Date(r.activated_at).getTime() : Date.now(),
  }
}

// ════════════════════════════════════════════════════════════════════
// INSIDER TRADES  (hl_insider_trades)
//
//   create table insider_trades (
//     id          uuid default gen_random_uuid() primary key,
//     user_id     uuid references auth.users(id) on delete cascade not null,
//     pool_id     text,
//     wallet_id   text,
//     coin        text not null,
//     size        text,
//     leverage    numeric default 1,
//     buffer      numeric default 0,
//     stop_loss   numeric,
//     open_price  numeric,
//     opened_at   timestamptz default now(),
//     closed_at   timestamptz,
//     close_price numeric,
//     final_pnl   numeric,
//     status      text default 'active',
//     sym0        text,
//     sym1        text,
//     chain_name  text,
//     pool_pair   text,
//     price_upper numeric,
//     price_lower numeric
//   );
//   alter table insider_trades enable row level security;
//   create policy "own insider_trades" on insider_trades for all
//     using (auth.uid() = user_id) with check (auth.uid() = user_id);
// ════════════════════════════════════════════════════════════════════
export function useInsiderTrades(userId) {
  const [trades,  setTrades]  = useState([])
  const [loading, setLoading] = useState(true)

  const syncLS = (rows) => localStorage.setItem('hl_insider_trades', JSON.stringify(rows))

  const load = useCallback(async () => {
    if (!userId) {
      try { setTrades(JSON.parse(localStorage.getItem('hl_insider_trades') || '[]')) } catch {}
      setLoading(false); return
    }
    setLoading(true)
    const { data } = await supabase
      .from('insider_trades')
      .select('*')
      .eq('user_id', userId)
      .order('opened_at', { ascending: false })
    const rows = (data || []).map(mapInsiderRow)
    setTrades(rows)
    syncLS(rows)
    setLoading(false)
  }, [userId])

  useEffect(() => { load() }, [load])

  const abrir = useCallback(async (trade) => {
    if (userId) {
      const { error } = await supabase.from('insider_trades').insert({
        user_id:    userId,
        pool_id:    trade.poolId ? String(trade.poolId) : null,
        wallet_id:  trade.walletId ?? null,
        coin:       trade.coin,
        size:       String(trade.size),
        leverage:   trade.leverage ?? 1,
        buffer:     trade.buffer ?? 0,
        stop_loss:  trade.stopLoss ?? null,
        open_price: trade.openPrice,
        opened_at:  new Date().toISOString(),
        status:     'active',
        sym0:       trade.sym0 ?? null,
        sym1:       trade.sym1 ?? null,
        chain_name: trade.chainName ?? null,
        pool_pair:  trade.poolPair ?? null,
        price_upper: trade.priceUpper ?? null,
        price_lower: trade.priceLower ?? null,
      })
      if (!error) { load(); return { ok: true } }
    }
    // Fallback localStorage
    const ls = JSON.parse(localStorage.getItem('hl_insider_trades') || '[]')
    const newT = { ...trade, id: crypto.randomUUID(), openedAt: Date.now(), status: 'active' }
    ls.push(newT)
    localStorage.setItem('hl_insider_trades', JSON.stringify(ls))
    setTrades(prev => [newT, ...prev])
    return { ok: true }
  }, [userId, load])

  const cerrar = useCallback(async (id, { closePrice, finalPnl }) => {
    if (userId) {
      await supabase.from('insider_trades').update({
        status: 'closed', close_price: closePrice,
        closed_at: new Date().toISOString(), final_pnl: finalPnl,
      }).eq('id', id)
      load()
    } else {
      const ls = JSON.parse(localStorage.getItem('hl_insider_trades') || '[]')
      localStorage.setItem('hl_insider_trades', JSON.stringify(
        ls.map(t => t.id === id ? { ...t, status: 'closed', closePrice, finalPnl } : t)
      ))
      setTrades(prev => prev.filter(t => t.id !== id))
    }
  }, [userId, load])

  const activos = trades.filter(t => t.status === 'active')

  return { trades, activos, loading, abrir, cerrar, reload: load }
}

function mapInsiderRow(r) {
  return {
    id:         r.id,
    poolId:     r.pool_id,
    walletId:   r.wallet_id,
    coin:       r.coin,
    size:       r.size,
    leverage:   r.leverage,
    buffer:     r.buffer,
    stopLoss:   r.stop_loss,
    openPrice:  r.open_price,
    openedAt:   r.opened_at ? new Date(r.opened_at).getTime() : Date.now(),
    closedAt:   r.closed_at ? new Date(r.closed_at).getTime() : null,
    closePrice: r.close_price,
    finalPnl:   r.final_pnl,
    status:     r.status,
    sym0:       r.sym0,
    sym1:       r.sym1,
    chainName:  r.chain_name,
    poolPair:   r.pool_pair,
    priceUpper: r.price_upper,
    priceLower: r.price_lower,
  }
}

// ════════════════════════════════════════════════════════════════════
// ACTIVIDAD POOLS  (liquidity_engine_activity)
//
//   create table actividad_pools (
//     id         uuid default gen_random_uuid() primary key,
//     user_id    uuid references auth.users(id) on delete cascade not null,
//     pool_id    text,
//     pair       text,
//     chain      text,
//     action     text default 'imported',
//     created_at timestamptz default now()
//   );
//   alter table actividad_pools enable row level security;
//   create policy "own actividad_pools" on actividad_pools for all
//     using (auth.uid() = user_id) with check (auth.uid() = user_id);
// ════════════════════════════════════════════════════════════════════
export function useActividadPools(userId) {
  const [actividad, setActividad] = useState(() => {
    try { return JSON.parse(localStorage.getItem('liquidity_engine_activity') || '[]') } catch { return [] }
  })
  const [loading, setLoading] = useState(true)

  const syncLS = (rows) => localStorage.setItem('liquidity_engine_activity', JSON.stringify(rows))

  const load = useCallback(async () => {
    if (!userId) { setLoading(false); return }
    const { data } = await supabase
      .from('actividad_pools')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(100)
    if (data) {
      const rows = data.map(r => ({
        id:     r.pool_id,
        pair:   r.pair,
        chain:  r.chain,
        action: r.action,
        time:   new Date(r.created_at).toLocaleString('es-CO', { day:'2-digit', month:'short', hour:'2-digit', minute:'2-digit' }),
      }))
      setActividad(rows)
      syncLS(rows)
    }
    setLoading(false)
  }, [userId])

  useEffect(() => { load() }, [load])

  const registrar = useCallback(async ({ poolId, pair, chain, action = 'imported' }) => {
    const entry = {
      id:     poolId,
      pair,
      chain,
      action,
      time:   new Date().toLocaleString('es-CO', { day:'2-digit', month:'short', hour:'2-digit', minute:'2-digit' }),
    }
    // Optimistic update
    setActividad(prev => {
      const updated = [entry, ...prev].slice(0, 100)
      syncLS(updated)
      return updated
    })
    if (userId) {
      await supabase.from('actividad_pools').insert({
        user_id: userId,
        pool_id: poolId ? String(poolId) : null,
        pair, chain, action,
      }).catch(console.error)
    }
  }, [userId])

  return { actividad, loading, registrar, reload: load }
}
