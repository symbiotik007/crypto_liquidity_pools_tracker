// src/lib/useSupabaseSync.js
// Sincronización bidireccional con Supabase para pools y wallets
// Estrategia: Supabase es la fuente de verdad, localStorage es cache local
// Las private keys NUNCA van a Supabase — solo a localStorage

import { useState, useEffect, useCallback } from 'react'
import { supabase } from './supabase'

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

  // Keep hl_wallets localStorage in sync (used by HedgeTab, TradingTab, etc.)
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
