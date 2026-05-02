// Lógica pura de escaneo on-chain para Uniswap.
// Lee el contrato NonfungiblePositionManager directamente via RPC,
// sin dependencias de React ni de estado de UI.

import { CHAINS_CONFIG, SEL } from './chainConfig';
import {
  rpcCall,
  encodeAddress,
  encodeUint256,
  decodeUint256,
  decodeInt24,
  decodeString,
  tickToPrice,
  getStatus,
} from '../../../lib/rpcCodec';

/**
 * Escanea todas las posiciones Uniswap activas de una wallet en una cadena.
 *
 * @param {string}   walletAddr  - Dirección de la wallet (0x...)
 * @param {string}   chainKey    - Clave de cadena (ethereum | arbitrum | optimism | base)
 * @param {function} onProgress  - Callback con { phase, scanned, total }
 * @param {AbortSignal} signal   - Para cancelación
 * @returns {Promise<Array>}     - Array de posiciones enriquecidas
 */
export async function scanWalletOnChain(walletAddr, chainKey, onProgress, signal) {
  const cfg = CHAINS_CONFIG[chainKey];
  const rpc = cfg.rpc;
  const nft = cfg.nftManager;

  // 1. Cuántos NFTs tiene la wallet
  const balHex  = await rpcCall(rpc, nft, SEL.balanceOf + encodeAddress(walletAddr));
  const balance = Number(decodeUint256(balHex));
  if (balance === 0) return [];

  onProgress({ phase: "enumerating", scanned: 0, total: balance });

  const positions  = [];
  const tokenCache = {};

  for (let i = 0; i < balance; i++) {
    if (signal?.aborted) break;

    // 2. Obtener tokenId[i]
    const tokHex  = await rpcCall(
      rpc, nft,
      SEL.tokenOfOwnerByIndex + encodeAddress(walletAddr) + encodeUint256(i)
    );
    const tokenId = decodeUint256(tokHex).toString();

    // 3. Leer la posición
    // positions() retorna: nonce, operator, token0, token1, fee, tickLower, tickUpper,
    //   liquidity, feeGrowth0, feeGrowth1, tokensOwed0, tokensOwed1
    const posHex = await rpcCall(rpc, nft, SEL.positions + encodeUint256(tokenId));
    const raw    = posHex.slice(2);

    const token0Addr = "0x" + raw.slice(2 * 64 + 24, 3 * 64);
    const token1Addr = "0x" + raw.slice(3 * 64 + 24, 4 * 64);
    const fee        = Number(decodeUint256(posHex, 4));
    const tickLower  = decodeInt24(posHex, 5);
    const tickUpper  = decodeInt24(posHex, 6);
    const liquidity  = decodeUint256(posHex, 7);

    // Saltar posiciones cerradas (liquidez 0)
    if (liquidity === 0n) {
      onProgress({ phase: "resolving", scanned: i + 1, total: balance });
      continue;
    }

    // 4. Info de tokens (con cache por dirección)
    const getTokenInfo = async (addr) => {
      const key = addr.toLowerCase();
      if (tokenCache[key]) return tokenCache[key];
      const [symHex, decHex] = await Promise.all([
        rpcCall(rpc, addr, SEL.symbol),
        rpcCall(rpc, addr, SEL.decimals),
      ]);
      tokenCache[key] = { symbol: decodeString(symHex), decimals: Number(decodeUint256(decHex)) };
      return tokenCache[key];
    };

    const [tok0, tok1] = await Promise.all([
      getTokenInfo(token0Addr),
      getTokenInfo(token1Addr),
    ]);

    // 5. Obtener pool address via factory.getPool(token0, token1, fee)
    //    y leer slot0() para el currentTick real
    let currentTick = Math.round((tickLower + tickUpper) / 2); // fallback
    let poolAddress = null;
    try {
      const getPoolData = SEL.getPool
        + encodeAddress(token0Addr)
        + encodeAddress(token1Addr)
        + encodeUint256(fee);
      const poolHex = await rpcCall(rpc, cfg.factory, getPoolData);
      poolAddress   = "0x" + poolHex.slice(26);

      if (poolAddress !== "0x0000000000000000000000000000000000000000") {
        const slot0Hex = await rpcCall(rpc, poolAddress, SEL.slot0);
        // slot0 returns: sqrtPriceX96(0), tick(1), ...
        const raw24 = BigInt("0x" + slot0Hex.slice(2 + 64, 2 + 128));
        const MAX   = BigInt(2) ** BigInt(255);
        currentTick = raw24 >= MAX ? Number(raw24 - BigInt(2) ** BigInt(256)) : Number(raw24);
      }
    } catch (_) { /* usa fallback */ }

    const displayPriceLow  = tickToPrice(tickLower,   tok0.decimals, tok1.decimals);
    const displayPriceHigh = tickToPrice(tickUpper,   tok0.decimals, tok1.decimals);
    const currentPrice     = tickToPrice(currentTick, tok0.decimals, tok1.decimals);
    const status           = getStatus(currentTick, tickLower, tickUpper);

    positions.push({
      tokenId,
      token0Symbol:        tok0.symbol,
      token1Symbol:        tok1.symbol,
      token0Address:       token0Addr,
      token1Address:       token1Addr,
      token0Decimals:      tok0.decimals,
      token1Decimals:      tok1.decimals,
      fee,
      tickLower,
      tickUpper,
      priceLower:          displayPriceLow,
      priceUpper:          displayPriceHigh,
      currentPrice,
      priceAtCreation:     currentPrice,
      liquidity:           liquidity.toString(),
      poolAddress,
      chainId:             cfg.chainId,
      chainName:           cfg.label,
      chainKey,
      status,
      valueUsd:            0,
      valueAtCreation:     0,
      collectedFeesUsd:    0,
      uncollectedFeesUsd:  0,
      createdAtTimestamp:  Date.now(),
      walletAddress:       walletAddr,
      og_owner:            walletAddr,
    });

    onProgress({ phase: "resolving", scanned: i + 1, total: balance });
  }

  return positions;
}
