// src/lib/useSupabaseSync.js
// Sincronización bidireccional con Supabase para pools y wallets
// Estrategia: Supabase es la fuente de verdad, localStorage es cache local
// Las private keys NUNCA van a Supabase — solo a localStorage

import { useState, useEffect, useCallback, useRef } from 'react'
import { supabase } from './supabase'

// Helper global — inserta notificación para cualquier usuario
export async function insertarNotificacion(userId, tipo, titulo, mensaje) {
  return supabase.from('notificaciones').insert({ user_id: userId, tipo, titulo, mensaje })
}

// ════════════════════════════════════════════════════════════════════
// POOLS SYNC
// ════════════════════════════════════════════════════════════════════
export function usePoolsSync(userId) {
  const [pools, setPools]     = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)

  // ── Load pools from Supabase on mount ───────────────────────────
  const loadPools = useCallback(async () => {
    if (!userId) { setLoading(false); return }
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('pools')
        .select('*')
        .eq('user_id', userId)
        .order('imported_at', { ascending: false })

      if (error) throw error

      // Convert Supabase rows to app format
      const mapped = (data || []).map(row => ({
        tokenId:      row.token_id,
        chainName:    row.chain_name,
        chainId:      row.chain_id,
        poolAddress:  row.pool_address,
        dex:          row.dex,
        token0Symbol: row.token0_symbol,
        token1Symbol: row.token1_symbol,
        token0Address:row.token0_address,
        token1Address:row.token1_address,
        priceLower:   parseFloat(row.price_lower  || 0),
        priceUpper:   parseFloat(row.price_upper  || 0),
        tickLower:    row.tick_lower,
        tickUpper:    row.tick_upper,
        priceAtCreation:  parseFloat(row.price_at_creation  || 0),
        valueAtCreation:  parseFloat(row.value_at_creation  || 0),
        walletAddress:    row.wallet_address,
        importedAt:       new Date(row.imported_at).getTime(),
        createdAtTimestamp: new Date(row.created_at).getTime(),
        // Runtime fields (not in DB, will be refreshed by Revert)
        valueUsd:  0,
        currentPrice: 0,
        amount0:   "0",
        amount1:   "0",
        status:    { label:"Cargando...", color:"#4a7a96", bg:"#0a1520", border:"#1a3a5e" },
        _dbId:     row.id,  // keep DB id for updates/deletes
      }))

      setPools(mapped)
      // Also sync to localStorage as cache
      localStorage.setItem('liquidity_engine_pools', JSON.stringify(mapped))
    } catch (e) {
      setError(e.message)
      // Fallback to localStorage cache
      try {
        const cached = JSON.parse(localStorage.getItem('liquidity_engine_pools') || '[]')
        setPools(cached)
      } catch {}
    }
    setLoading(false)
  }, [userId])

  useEffect(() => { loadPools() }, [loadPools])

  // ── Add pool ─────────────────────────────────────────────────────
  const addPool = useCallback(async (pool) => {
    if (!userId) return

    const row = {
      user_id:          userId,
      token_id:         pool.tokenId,
      chain_name:       pool.chainName,
      chain_id:         pool.chainId,
      pool_address:     pool.poolAddress,
      dex:              pool.dex || 'uniswap_v3',
      token0_symbol:    pool.token0Symbol,
      token1_symbol:    pool.token1Symbol,
      token0_address:   pool.token0Address,
      token1_address:   pool.token1Address,
      price_lower:      pool.priceLower,
      price_upper:      pool.priceUpper,
      tick_lower:       pool.tickLower,
      tick_upper:       pool.tickUpper,
      price_at_creation: pool.priceAtCreation || pool.currentPrice,
      value_at_creation: pool.valueAtCreation || pool.valueUsd,
      wallet_address:   pool.walletAddress || pool.og_owner,
    }

    const { data, error } = await supabase
      .from('pools')
      .insert(row)
      .select()
      .single()

    if (error) {
      if (error.code === '23505') throw new Error('Este pool ya está importado')
      if (error.code === 'P0001') throw new Error(error.message) // plan limit trigger
      throw error
    }

    const newPool = { ...pool, _dbId: data.id }
    setPools(prev => {
      const updated = [...prev, newPool]
      localStorage.setItem('liquidity_engine_pools', JSON.stringify(updated))
      return updated
    })
    return newPool
  }, [userId])

  // ── Remove pool ──────────────────────────────────────────────────
  const removePool = useCallback(async (tokenId) => {
    if (!userId) return

    const pool = pools.find(p => p.tokenId === tokenId)
    if (pool?._dbId) {
      await supabase.from('pools').delete().eq('id', pool._dbId)
    }

    setPools(prev => {
      const updated = prev.filter(p => p.tokenId !== tokenId)
      localStorage.setItem('liquidity_engine_pools', JSON.stringify(updated))
      return updated
    })
  }, [userId, pools])

  // ── Update pool runtime data (Revert enrichment) ─────────────────
  const updatePoolRuntime = useCallback((tokenId, runtimeData) => {
    setPools(prev => {
      const updated = prev.map(p =>
        p.tokenId === tokenId ? { ...p, ...runtimeData } : p
      )
      localStorage.setItem('liquidity_engine_pools', JSON.stringify(updated))
      return updated
    })
  }, [])

  return { pools, setPools, loading, error, addPool, removePool, updatePoolRuntime, reload: loadPools }
}

// ════════════════════════════════════════════════════════════════════
// WALLETS SYNC
// Private keys NUNCA van a Supabase — solo dirección y metadata
// La private key se guarda en localStorage con clave por wallet_id
// ════════════════════════════════════════════════════════════════════
export function useWalletsSync(userId) {
  const [wallets, setWallets]   = useState([])
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState(null)

  // ── Private key helpers (localStorage only) ──────────────────────
  const getPk   = (id) => localStorage.getItem(`hl_pk_${id}`) || ''
  const savePk  = (id, pk) => localStorage.setItem(`hl_pk_${id}`, pk)
  const removePk = (id) => localStorage.removeItem(`hl_pk_${id}`)

  // ── Load wallets from Supabase ───────────────────────────────────
  const loadWallets = useCallback(async () => {
    if (!userId) { setLoading(false); return }
    setLoading(true)
    try {
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
        createdAt:    new Date(row.created_at).getTime(),
        // Rehydrate private key from localStorage
        privateKey:   getPk(row.id),
      }))

      setWallets(mapped)
      // Sync to localStorage for offline access by other components
      syncToLocalStorage(mapped)
    } catch (e) {
      setError(e.message)
      // Fallback to localStorage
      try {
        const cached = JSON.parse(localStorage.getItem('hl_wallets') || '[]')
        setWallets(cached)
      } catch {}
    }
    setLoading(false)
  }, [userId])

  useEffect(() => { loadWallets() }, [loadWallets])

  // Keep hl_wallets localStorage in sync (used by CoberturaTab, TradingTab, etc.)
  const syncToLocalStorage = (wList) => {
    localStorage.setItem('hl_wallets', JSON.stringify(wList))
  }

  // ── Add wallet ───────────────────────────────────────────────────
  const addWallet = useCallback(async ({ label, address, agentAddress, purpose, privateKey }) => {
    if (!userId) return

    const { data, error } = await supabase
      .from('wallets')
      .insert({
        user_id:       userId,
        label,
        address,
        agent_address: agentAddress || null,
        purpose:       purpose || 'proteccion',
      })
      .select()
      .single()

    if (error) {
      if (error.code === '23505') throw new Error('Esta wallet ya está registrada')
      throw error
    }

    // Save private key ONLY to localStorage, never to Supabase
    if (privateKey) savePk(data.id, privateKey)

    const newWallet = {
      id:           data.id,
      label:        data.label,
      address:      data.address,
      agentAddress: data.agent_address,
      purpose:      data.purpose,
      createdAt:    new Date(data.created_at).getTime(),
      privateKey:   privateKey || '',
    }

    setWallets(prev => {
      const updated = [newWallet, ...prev]
      syncToLocalStorage(updated)
      return updated
    })

    return newWallet
  }, [userId])

  // ── Remove wallet ────────────────────────────────────────────────
  const removeWallet = useCallback(async (id) => {
    if (!userId) return

    await supabase.from('wallets').delete().eq('id', id)
    removePk(id)

    setWallets(prev => {
      const updated = prev.filter(w => w.id !== id)
      syncToLocalStorage(updated)
      return updated
    })
  }, [userId])

  return { wallets, loading, error, addWallet, removeWallet, reload: loadWallets }
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
// NOTIFICACIONES
// ════════════════════════════════════════════════════════════════════
export function useNotificaciones(userId) {
  const [notifs,  setNotifs]  = useState([])
  const [loading, setLoading] = useState(true)

  const load = useCallback(async () => {
    if (!userId) { setLoading(false); return }
    const { data } = await supabase
      .from('notificaciones')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(50)
    setNotifs(data || [])
    setLoading(false)
  }, [userId])

  useEffect(() => { load() }, [load])

  // Realtime — escucha nuevas notificaciones en tiempo real
  useEffect(() => {
    if (!userId) return
    const channel = supabase
      .channel('notifs_' + userId)
      .on('postgres_changes', {
        event: 'INSERT', schema: 'public',
        table: 'notificaciones',
        filter: `user_id=eq.${userId}`,
      }, payload => {
        setNotifs(prev => [payload.new, ...prev])
      })
      .subscribe()
    return () => supabase.removeChannel(channel)
  }, [userId])

  const marcarLeida = useCallback(async (id) => {
    await supabase.from('notificaciones').update({ leida: true }).eq('id', id)
    setNotifs(prev => prev.map(n => n.id === id ? { ...n, leida: true } : n))
  }, [])

  const marcarTodasLeidas = useCallback(async () => {
    if (!userId) return
    await supabase.from('notificaciones').update({ leida: true }).eq('user_id', userId).eq('leida', false)
    setNotifs(prev => prev.map(n => ({ ...n, leida: true })))
  }, [userId])

  const noLeidas = notifs.filter(n => !n.leida).length

  return { notifs, loading, noLeidas, marcarLeida, marcarTodasLeidas, reload: load }
}
