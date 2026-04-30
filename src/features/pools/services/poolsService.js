// Operaciones puras de Supabase para la tabla `pools`.
// Sin estado de React — pueden llamarse desde hooks, servicios o tests.

import { supabase } from '../../../services/supabase';

// Convierte una fila de Supabase al formato interno de la app
export function mapPoolRow(row) {
  return {
    tokenId:            row.token_id,
    chainName:          row.chain_name,
    chainId:            row.chain_id,
    poolAddress:        row.pool_address,
    dex:                row.dex,
    token0Symbol:       row.token0_symbol,
    token1Symbol:       row.token1_symbol,
    token0Address:      row.token0_address,
    token1Address:      row.token1_address,
    priceLower:         parseFloat(row.price_lower  || 0),
    priceUpper:         parseFloat(row.price_upper  || 0),
    tickLower:          row.tick_lower,
    tickUpper:          row.tick_upper,
    priceAtCreation:    parseFloat(row.price_at_creation  || 0),
    valueAtCreation:    parseFloat(row.value_at_creation  || 0),
    walletAddress:      row.wallet_address,
    importedAt:         new Date(row.imported_at).getTime(),
    createdAtTimestamp: new Date(row.created_at).getTime(),
    // Campos de runtime — no están en DB, los rellena el enriquecedor (Revert)
    valueUsd:    0,
    currentPrice: 0,
    amount0:     "0",
    amount1:     "0",
    status:      { label: "Cargando...", color: "#4a7a96", bg: "#0a1520", border: "#1a3a5e" },
    _dbId:       row.id,
  };
}

export async function fetchPools(userId) {
  const { data, error } = await supabase
    .from('pools')
    .select('*')
    .eq('user_id', userId)
    .order('imported_at', { ascending: false });
  if (error) throw error;
  return (data || []).map(mapPoolRow);
}

export async function insertPool(pool, userId) {
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
    .single();

  if (error) {
    if (error.code === '23505') throw new Error('Este pool ya está importado');
    if (error.code === 'P0001') throw new Error(error.message); // límite de plan
    throw error;
  }

  return { ...pool, _dbId: data.id };
}

export async function deletePool(dbId) {
  const { error } = await supabase.from('pools').delete().eq('id', dbId);
  if (error) throw error;
}
