import { supabase } from '../../../services/supabase'
import type { Pool, PoolStatus } from '../../../types'

type PoolRow = Record<string, unknown>

export function mapPoolRow(row: PoolRow): Pool {
  return {
    tokenId:            Number(row.token_id),
    chainName:          row.chain_name        as string,
    chainId:            row.chain_id          as number,
    poolAddress:        row.pool_address      as string,
    dex:                row.dex               as string,
    token0Symbol:       row.token0_symbol     as string,
    token1Symbol:       row.token1_symbol     as string,
    token0Address:      row.token0_address    as string,
    token1Address:      row.token1_address    as string,
    priceLower:         parseFloat((row.price_lower  as string) || "0"),
    priceUpper:         parseFloat((row.price_upper  as string) || "0"),
    tickLower:          row.tick_lower        as number,
    tickUpper:          row.tick_upper        as number,
    priceAtCreation:    parseFloat((row.price_at_creation as string) || "0"),
    valueAtCreation:    parseFloat((row.value_at_creation as string) || "0"),
    walletAddress:      row.wallet_address    as string,
    importedAt:         new Date(row.imported_at as string).getTime(),
    createdAtTimestamp: new Date(row.created_at  as string).getTime(),
    valueUsd:     0,
    currentPrice: 0,
    amount0:      "0",
    amount1:      "0",
    status:       { label: "Cargando...", color: "#4a7a96", bg: "#0a1520", border: "#1a3a5e" } satisfies PoolStatus,
    _dbId:        row.id as string,
  }
}

export async function fetchPools(userId: string): Promise<Pool[]> {
  const { data, error } = await supabase
    .from('pools')
    .select('*')
    .eq('user_id', userId)
    .order('imported_at', { ascending: false })
  if (error) throw error
  return (data || []).map(mapPoolRow)
}

export async function insertPool(pool: Partial<Pool> & Record<string, unknown>, userId: string): Promise<Pool> {
  const { data, error } = await supabase
    .from('pools')
    .insert({
      user_id:           userId,
      token_id:          pool.tokenId,
      chain_name:        pool.chainName,
      chain_id:          pool.chainId,
      pool_address:      pool.poolAddress,
      dex:               pool.dex || 'uniswap_v3',
      token0_symbol:     pool.token0Symbol,
      token1_symbol:     pool.token1Symbol,
      token0_address:    pool.token0Address,
      token1_address:    pool.token1Address,
      price_lower:       pool.priceLower,
      price_upper:       pool.priceUpper,
      tick_lower:        pool.tickLower,
      tick_upper:        pool.tickUpper,
      price_at_creation: pool.priceAtCreation || pool.currentPrice,
      value_at_creation: pool.valueAtCreation || pool.valueUsd,
      wallet_address:    pool.walletAddress || pool.og_owner,
    })
    .select()
    .single()

  if (error) {
    if (error.code === '23505') throw new Error('Este pool ya está importado')
    if (error.code === 'P0001') throw new Error(error.message)
    throw error
  }

  return { ...(pool as Pool), _dbId: (data as PoolRow).id as string }
}

export async function deletePool(dbId: string | number): Promise<void> {
  const { error } = await supabase.from('pools').delete().eq('id', dbId)
  if (error) throw error
}
