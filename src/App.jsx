import { useState, useEffect, useRef } from "react";
import { useAuth } from "./lib/AuthContext";
import { usePoolsSync, useWalletsSync } from "./lib/useSupabaseSync";
import { encode as msgpackEncode } from "@msgpack/msgpack";

// ══════════════════════════════════════════════════════
// ON-CHAIN RPC CONFIG
// Usamos RPCs públicos gratuitos para leer el contrato
// NonfungiblePositionManager de Uniswap V3
// ══════════════════════════════════════════════════════
const CHAINS_CONFIG = {
  ethereum: {
    label: "Ethereum",
    chainId: 1,
    rpc: "https://eth.llamarpc.com",
    nftManager: "0xC36442b4a4522E871399CD717aBDD847Ab11FE88",
    factory:    "0x1F98431c8aD98523631AE4a59f267346ea31F984",
  },
  arbitrum: {
    label: "Arbitrum",
    chainId: 42161,
    rpc: "https://arb1.arbitrum.io/rpc",
    nftManager: "0xC36442b4a4522E871399CD717aBDD847Ab11FE88",
    factory:    "0x1F98431c8aD98523631AE4a59f267346ea31F984",
  },
  optimism: {
    label: "Optimism",
    chainId: 10,
    rpc: "https://mainnet.optimism.io",
    nftManager: "0xC36442b4a4522E871399CD717aBDD847Ab11FE88",
    factory:    "0x1F98431c8aD98523631AE4a59f267346ea31F984",
  },
  base: {
    label: "Base",
    chainId: 8453,
    rpc: "https://mainnet.base.org",
    nftManager: "0x03a520b32C04BF3bEEf7BEb72E919cf822Ed34f1",
    factory:    "0x33128a8fC17869897dcE68Ed026d694621f6FDfD",
  },
};

const CHAINS = Object.entries(CHAINS_CONFIG).map(([id, c]) => ({ id, label: c.label }));

// ── ABI selectors (keccak256 de la firma) ──────────────────────────
const SEL = {
  balanceOf:           "0x70a08231", // balanceOf(address)
  tokenOfOwnerByIndex: "0x2f745c59", // tokenOfOwnerByIndex(address,uint256)
  positions:           "0x99fbab88", // positions(uint256)
  getPool:             "0x1698ee82", // getPool(address,address,uint24)
  slot0:               "0x3850c7bd", // slot0()
  decimals:            "0x313ce567", // decimals()
  symbol:              "0x95d89b41", // symbol()
};

// ── RPC call helper ────────────────────────────────────────────────
async function rpcCall(rpc, to, data) {
  const res = await fetch(rpc, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      jsonrpc: "2.0", id: 1, method: "eth_call",
      params: [{ to, data }, "latest"],
    }),
  });
  const json = await res.json();
  if (json.error) throw new Error(json.error.message);
  return json.result;
}

// ── ABI encode helpers ─────────────────────────────────────────────
function encodeAddress(addr) {
  return addr.toLowerCase().replace("0x", "").padStart(64, "0");
}
function encodeUint256(n) {
  return BigInt(n).toString(16).padStart(64, "0");
}
function decodeUint256(hex, offset = 0) {
  return BigInt("0x" + hex.slice(2 + offset * 64, 2 + (offset + 1) * 64));
}
function decodeAddress(hex, offset = 0) {
  return "0x" + hex.slice(2 + offset * 64 + 24, 2 + (offset + 1) * 64);
}
function decodeInt24(hex, offset = 0) {
  const raw = BigInt("0x" + hex.slice(2 + offset * 64, 2 + (offset + 1) * 64));
  const bits = BigInt(24);
  const max  = BigInt(1) << bits;
  return raw >= max / BigInt(2) ? Number(raw - (BigInt(1) << BigInt(256))) : Number(raw);
}

// ── Decode string from ABI — browser compatible (no Buffer) ────────
function hexToBytes(hexStr) {
  const bytes = new Uint8Array(hexStr.length / 2);
  for (let i = 0; i < hexStr.length; i += 2)
    bytes[i / 2] = parseInt(hexStr.slice(i, i + 2), 16);
  return bytes;
}

function decodeString(hex) {
  try {
    const raw    = hex.startsWith("0x") ? hex.slice(2) : hex;
    const offset = Number(BigInt("0x" + raw.slice(0, 64))) * 2;
    const len    = Number(BigInt("0x" + raw.slice(offset, offset + 64)));
    if (len === 0) throw new Error("empty");
    const strHex = raw.slice(offset + 64, offset + 64 + len * 2);
    const decoded = new TextDecoder("utf-8").decode(hexToBytes(strHex));
    if (decoded && decoded.trim().length > 0) return decoded;
    throw new Error("blank");
  } catch {
    try {
      // bytes32 fixed-length fallback
      const raw   = hex.startsWith("0x") ? hex.slice(2) : hex;
      const bytes = hexToBytes(raw.slice(0, 64));
      const nullI = bytes.indexOf(0);
      return new TextDecoder("utf-8").decode(nullI > 0 ? bytes.slice(0, nullI) : bytes);
    } catch { return "?"; }
  }
}

// ── tick → price ───────────────────────────────────────────────────
function tickToPrice(tick, decimals0, decimals1) {
  const raw = Math.pow(1.0001, tick);
  return raw * Math.pow(10, decimals0 - decimals1);
}

function getStatus(currentTick, tickLower, tickUpper) {
  if (currentTick < tickLower) return { label: "Fuera (Abajo)", color: "#ff4f6e", bg: "#1a0810", border: "#5a1a28" };
  if (currentTick > tickUpper) return { label: "Fuera (Arriba)", color: "#ffb347", bg: "#1a0e00", border: "#5a3a00" };
  return { label: "En Rango", color: "#00ff88", bg: "#001a0e", border: "#003a22" };
}

function formatPrice(p) {
  if (!p || isNaN(p)) return "0";
  if (p > 10000) return p.toLocaleString("en-US", { maximumFractionDigits: 2 });
  if (p > 1)     return p.toFixed(2);
  return p.toFixed(6);
}

// ════════════════════════════════════════════════════════════════════
// CORE SCANNER — lee el contrato on-chain directamente
// ════════════════════════════════════════════════════════════════════
async function scanWalletOnChain(walletAddr, chainKey, onProgress, signal) {
  const cfg = CHAINS_CONFIG[chainKey];
  const rpc = cfg.rpc;
  const nft = cfg.nftManager;

  // 1. Cuántos NFTs tiene la wallet
  const balHex = await rpcCall(rpc, nft, SEL.balanceOf + encodeAddress(walletAddr));
  const balance = Number(decodeUint256(balHex));
  if (balance === 0) return [];

  onProgress({ phase: "enumerating", scanned: 0, total: balance });

  const positions = [];
  const tokenCache = {}; // cache de token info

  for (let i = 0; i < balance; i++) {
    if (signal?.aborted) break;

    // 2. Obtener tokenId[i]
    const tokHex = await rpcCall(
      rpc, nft,
      SEL.tokenOfOwnerByIndex + encodeAddress(walletAddr) + encodeUint256(i)
    );
    const tokenId = decodeUint256(tokHex).toString();

    // 3. Leer la posición
    const posHex = await rpcCall(rpc, nft, SEL.positions + encodeUint256(tokenId));
    const raw = posHex.slice(2);

    // positions() retorna: nonce, operator, token0, token1, fee, tickLower, tickUpper,
    //   liquidity, feeGrowth0, feeGrowth1, tokensOwed0, tokensOwed1
    const token0Addr = "0x" + raw.slice(2 * 64 + 24, 3 * 64);
    const token1Addr = "0x" + raw.slice(3 * 64 + 24, 4 * 64);
    const fee        = Number(decodeUint256(posHex, 4));
    const tickLower  = decodeInt24(posHex, 5);
    const tickUpper  = decodeInt24(posHex, 6);
    const liquidity  = decodeUint256(posHex, 7);

    // Skip posiciones con liquidez 0 (cerradas)
    if (liquidity === 0n) {
      onProgress({ phase: "resolving", scanned: i + 1, total: balance });
      continue;
    }

    // 4. Info de tokens (con cache)
    const getTokenInfo = async (addr) => {
      const key = addr.toLowerCase();
      if (tokenCache[key]) return tokenCache[key];
      const [symHex, decHex] = await Promise.all([
        rpcCall(rpc, addr, SEL.symbol),
        rpcCall(rpc, addr, SEL.decimals),
      ]);
      const symbol   = decodeString(symHex);
      const decimals = Number(decodeUint256(decHex));
      tokenCache[key] = { symbol, decimals };
      return tokenCache[key];
    };

    const [tok0, tok1] = await Promise.all([
      getTokenInfo(token0Addr),
      getTokenInfo(token1Addr),
    ]);

    // 5. Obtener pool address via factory.getPool(token0, token1, fee)
    //    Luego leer slot0() para el currentTick real
    let currentTick = Math.round((tickLower + tickUpper) / 2); // fallback
    let poolAddress = null;
    try {
      const getPoolData = SEL.getPool
        + encodeAddress(token0Addr)
        + encodeAddress(token1Addr)
        + encodeUint256(fee);
      const poolHex  = await rpcCall(rpc, cfg.factory, getPoolData);
      poolAddress    = "0x" + poolHex.slice(26); // address from 32-byte result
      if (poolAddress !== "0x0000000000000000000000000000000000000000") {
        const slot0Hex = await rpcCall(rpc, poolAddress, SEL.slot0);
        // slot0 returns: sqrtPriceX96(0), tick(1), ...
        currentTick = Number(
          BigInt("0x" + slot0Hex.slice(2 + 64, 2 + 128)) << 0n
            ? BigInt("0x" + slot0Hex.slice(2 + 64, 2 + 128))
            : 0n
        );
        // int24 sign correction
        const raw24 = BigInt("0x" + slot0Hex.slice(2 + 64, 2 + 128));
        const MAX   = BigInt(2) ** BigInt(255);
        currentTick = raw24 >= MAX ? Number(raw24 - BigInt(2) ** BigInt(256)) : Number(raw24);
      }
    } catch (_) { /* usa fallback */ }

    // tickToPrice(tick, dec0, dec1) = 1.0001^tick * 10^(dec0-dec1)
    // Para WETH(dec0=18)/USDT(dec1=6) esto ya da el precio de ETH en USDT directamente
    const displayPriceLow  = tickToPrice(tickLower,  tok0.decimals, tok1.decimals);
    const displayPriceHigh = tickToPrice(tickUpper,  tok0.decimals, tok1.decimals);
    const currentPrice     = tickToPrice(currentTick, tok0.decimals, tok1.decimals);
    const status = getStatus(currentTick, tickLower, tickUpper);

    positions.push({
      tokenId,
      token0Symbol:       tok0.symbol,
      token1Symbol:       tok1.symbol,
      token0Address:      token0Addr,
      token1Address:      token1Addr,
      token0Decimals:     tok0.decimals,
      token1Decimals:     tok1.decimals,
      fee,
      tickLower,
      tickUpper,
      priceLower:         displayPriceLow,
      priceUpper:         displayPriceHigh,
      currentPrice,
      priceAtCreation:    currentPrice,
      liquidity:          liquidity.toString(),
      poolAddress,
      chainId:            cfg.chainId,
      chainName:          cfg.label,
      chainKey,
      status,
      valueUsd:           0,
      valueAtCreation:    0,
      collectedFeesUsd:   0,
      uncollectedFeesUsd: 0,
      createdAtTimestamp: Date.now(),
      walletAddress:      walletAddr,   // ← save for Revert API
      og_owner:           walletAddr,
    });

    onProgress({ phase: "resolving", scanned: i + 1, total: balance });
  }

  return positions;
}

// ════════════════════════════════════════════════════════════════════
// STYLES
// ════════════════════════════════════════════════════════════════════
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #050a0f; }
  .app { display: flex; height: 100vh; background: #050a0f; color: #c8d8e8; font-family: 'Outfit', sans-serif; font-size: 15px; overflow: hidden; }

  /* SIDEBAR */
  .sidebar { width: 220px; min-width: 220px; background: #070d14; border-right: 1px solid #0e2435; display: flex; flex-direction: column; transition: transform 0.25s ease; z-index: 100; }
  .logo { padding: 20px 18px; border-bottom: 1px solid #0e2435; display: flex; align-items: center; gap: 10px; }
  .logo-box { width: 36px; height: 36px; min-width: 36px; background: #00e5ff; display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 13px; color: #050a0f; }
  .logo-text { font-size: 13px; font-weight: 700; color: #00e5ff; letter-spacing: 1px; line-height: 1.3; text-transform: uppercase; }
  .nav-section { padding: 16px 0 8px; }
  .nav-label { font-size: 11px; letter-spacing: 2px; color: #2a4a5e; text-transform: uppercase; padding: 0 18px; margin-bottom: 6px; }
  .nav-item { display: flex; align-items: center; gap: 10px; padding: 9px 18px; cursor: pointer; color: #4a7a96; font-size: 14px; transition: all 0.15s; border-left: 2px solid transparent; }
  .nav-item:hover { color: #7ab8d4; background: #0a1a24; }
  .nav-item.active { color: #00e5ff; background: #0a1a24; border-left: 2px solid #00e5ff; }
  .badge { font-size: 10px; letter-spacing: 1px; padding: 2px 7px; background: #001a22; color: #00e5ff; border: 1px solid #003a4e; text-transform: uppercase; margin-left: auto; }
  .sidebar-spacer { flex: 1; }
  .user-info { padding: 16px 18px; border-top: 1px solid #0e2435; display: flex; align-items: center; gap: 10px; }
  .user-avatar { width: 32px; height: 32px; min-width: 32px; background: #0a2a3e; border: 1px solid #1a4a6e; display: flex; align-items: center; justify-content: center; font-size: 13px; color: #00b4d8; font-weight: 700; }
  .user-name { font-size: 13px; color: #7ab8d4; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .user-plan { font-size: 12px; color: #2a5a72; }
  .hamburger { display: none; background: none; border: none; cursor: pointer; padding: 4px 8px 4px 0; color: #4a7a96; font-size: 20px; line-height: 1; }
  .overlay { display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.65); z-index: 99; }
  .overlay.open { display: block; }

  /* MAIN */
  .main { flex: 1; display: flex; flex-direction: column; overflow: hidden; min-width: 0; }
  .topbar { padding: 18px 28px 0; border-bottom: 1px solid #0e2435; }
  .topbar-row { display: flex; align-items: center; gap: 12px; margin-bottom: 6px; }
  .page-title { font-size: 24px; font-weight: 700; color: #e0f4ff; letter-spacing: -0.5px; }
  .beta-tag { font-size: 11px; padding: 3px 9px; background: #001e2e; color: #00e5ff; border: 1px solid #005577; letter-spacing: 1.5px; text-transform: uppercase; }
  .page-sub { font-size: 14px; color: #2a5a72; margin-bottom: 16px; display: flex; align-items: center; gap: 8px; }
  .dot-active { width: 7px; height: 7px; min-width: 7px; background: #00ff88; border-radius: 50%; display: inline-block; }
  .tabs { display: flex; overflow-x: auto; scrollbar-width: none; }
  .tabs::-webkit-scrollbar { display: none; }
  .tab { padding: 10px 18px; font-size: 14px; cursor: pointer; color: #2a5a72; border-bottom: 2px solid transparent; white-space: nowrap; transition: all 0.15s; background: none; border-top: none; border-left: none; border-right: none; font-family: 'Outfit', sans-serif; }
  .tab:hover { color: #7ab8d4; }
  .tab.active { color: #00e5ff; border-bottom: 2px solid #00e5ff; }
  .tab-badge { font-size: 10px; padding: 1px 6px; background: #001a22; color: #00ff88; border: 1px solid #003a22; margin-left: 4px; }
  .content { flex: 1; overflow-y: auto; padding: 22px 28px; }

  /* BUTTONS */
  .btn { padding: 7px 16px; font-size: 13px; cursor: pointer; font-family: 'Outfit', sans-serif; letter-spacing: 0.5px; transition: all 0.15s; border: none; }
  .btn-ghost { background: transparent; border: 1px solid #1a3a4e; color: #4a7a96; }
  .btn-ghost:hover { border-color: #00e5ff; color: #00e5ff; }
  .btn-primary { background: #00e5ff; border: 1px solid #00e5ff; color: #050a0f; font-weight: 700; }
  .btn-primary:hover { background: #33eeff; }
  .btn-gold { background: #c9a227; border: 1px solid #c9a227; color: #050a0f; font-weight: 700; }
  .btn-gold:hover { background: #e0b82e; }
  .btn-gold:disabled { opacity: 0.4; cursor: not-allowed; }
  .btn-danger { background: transparent; border: 1px solid #ff4f6e; color: #ff4f6e; font-family: 'Outfit', sans-serif; }
  .btn-danger:hover { background: #1a0810; }

  /* STATS */
  .stats-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 14px; margin-bottom: 22px; }
  .stat-card { background: #070d14; border: 1px solid #0e2435; padding: 16px 18px; position: relative; overflow: hidden; }
  .stat-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px; background: #1a3a5e; }
  .stat-label { font-size: 11px; letter-spacing: 1.5px; color: #2a5a72; text-transform: uppercase; margin-bottom: 10px; }
  .stat-value { font-size: 26px; font-weight: 700; color: #c8d8e8; letter-spacing: -0.5px; }
  .stat-value.danger { color: #ff4f6e; }
  .stat-value.success { color: #00ff88; }

  /* SECTION */
  .section-header { display: flex; align-items: center; gap: 10px; margin-bottom: 14px; flex-wrap: wrap; }
  .section-title { font-size: 15px; font-weight: 600; color: #7ab8d4; letter-spacing: 0.5px; text-transform: uppercase; }
  .count-badge { font-size: 12px; padding: 2px 9px; background: #001a22; border: 1px solid #003a4e; color: #00e5ff; }
  .section-actions { margin-left: auto; display: flex; gap: 6px; flex-wrap: wrap; }
  .action-btn { padding: 7px 12px; font-size: 13px; background: #070d14; border: 1px solid #0e2435; color: #4a7a96; cursor: pointer; font-family: 'Outfit', sans-serif; transition: all 0.15s; white-space: nowrap; }
  .action-btn:hover { border-color: #00e5ff; color: #00e5ff; }
  .action-btn.highlighted { border-color: #c9a227; color: #c9a227; background: #0f0900; }
  .action-btn.highlighted:hover { border-color: #e0b82e; color: #e0b82e; }

  /* POOL CARD */
  .pool-card { background: #070d14; border: 1px solid #0e2435; padding: 16px 20px; margin-bottom: 10px; }
  .pool-header { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
  .pool-pair { font-size: 16px; font-weight: 700; color: #c8d8e8; }
  .pool-status-badge { font-size: 11px; padding: 3px 9px; letter-spacing: 1px; text-transform: uppercase; }
  .pool-network { font-size: 11px; padding: 2px 8px; background: #0a1a24; border: 1px solid #1a3a4e; color: #4a7a96; }
  .pool-version { font-size: 10px; padding: 2px 6px; background: #001030; border: 1px solid #003080; color: #4a80ff; font-weight: 700; }
  .pool-price { font-size: 22px; font-weight: 700; color: #00e5ff; margin-top: 6px; }
  .pool-range { font-size: 12px; color: #4a7a96; margin-top: 3px; }
  .pool-stats { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 10px; margin-top: 14px; padding-top: 14px; border-top: 1px solid #0e2435; }
  .pool-stat-label { font-size: 11px; letter-spacing: 1px; color: #2a5a72; text-transform: uppercase; margin-bottom: 4px; }
  .pool-stat-value { font-size: 14px; font-weight: 600; color: #7ab8d4; }
  .pool-id { font-size: 10px; color: #2a4a5e; margin-top: 6px; }

  /* EMPTY */
  .empty-state { background: #060c12; border: 1px solid #0e2435; padding: 40px 20px; text-align: center; }
  .empty-title { font-size: 14px; color: #4a7a96; margin-bottom: 6px; }
  .empty-sub { font-size: 13px; color: #2a4a5e; }

  /* ACTIVITY */
  .activity-card { background: #070d14; border: 1px solid #0e2435; padding: 14px 20px; margin-bottom: 8px; display: flex; align-items: center; gap: 14px; }
  .activity-icon { width: 36px; height: 36px; min-width: 36px; background: #0a1a2e; border: 1px solid #1a3a5e; display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 14px; color: #00b4d8; }
  .activity-title { font-size: 13px; color: #00b4d8; font-weight: 600; margin-bottom: 3px; }
  .activity-sub { font-size: 14px; color: #7ab8d4; }
  .activity-time { font-size: 12px; color: #2a5a72; margin-left: auto; white-space: nowrap; }

  /* WALLETS TAB */
  .info-box { background: #060c12; border: 1px solid #0e2435; padding: 14px 18px; margin-bottom: 20px; font-size: 13px; color: #4a7a96; line-height: 1.6; }
  .info-box strong { color: #7ab8d4; }
  .wallets-section { background: #070d14; border: 1px solid #0e2435; padding: 18px 20px; margin-bottom: 20px; }
  .wallets-section-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
  .wallets-section-title { font-size: 15px; font-weight: 600; color: #7ab8d4; }

  /* MODAL */
  .modal-overlay { display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.8); z-index: 300; align-items: center; justify-content: center; }
  .modal-overlay.open { display: flex; }
  .modal { background: #0a1520; border: 1px solid #1a3a5e; width: 100%; max-width: 500px; margin: 20px; max-height: 90vh; display: flex; flex-direction: column; }
  .modal-header { display: flex; align-items: flex-start; justify-content: space-between; padding: 20px 22px 14px; border-bottom: 1px solid #0e2435; }
  .modal-title { font-size: 18px; font-weight: 700; color: #e0f4ff; margin-bottom: 4px; }
  .modal-subtitle { font-size: 12px; color: #2a5a72; line-height: 1.5; max-width: 360px; }
  .modal-close { background: none; border: none; color: #4a7a96; cursor: pointer; font-size: 20px; padding: 0 0 0 12px; flex-shrink: 0; }
  .modal-close:hover { color: #00e5ff; }
  .modal-body { padding: 20px 22px; overflow-y: auto; flex: 1; }
  .modal-footer { display: flex; gap: 10px; padding: 16px 22px; border-top: 1px solid #0e2435; justify-content: flex-end; }

  .form-group { margin-bottom: 16px; }
  .form-label { font-size: 13px; color: #7ab8d4; margin-bottom: 6px; display: block; font-weight: 500; }
  .form-input { width: 100%; background: #060c12; border: 1px solid #1a3a5e; color: #c8d8e8; padding: 10px 14px; font-size: 13px; font-family: 'Outfit', monospace; outline: none; transition: border 0.15s; }
  .form-input::placeholder { color: #2a4a5e; font-family: 'Outfit', sans-serif; }
  .form-input:focus { border-color: #00e5ff; }
  .form-select { width: 100%; background: #060c12; border: 1px solid #1a3a5e; color: #c8d8e8; padding: 10px 14px; font-size: 13px; font-family: 'Outfit', sans-serif; outline: none; cursor: pointer; appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%234a7a96' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 14px center; }
  .form-select:focus { border-color: #00e5ff; outline: none; }
  .form-select option { background: #0a1520; }

  .btn-scan { width: 100%; padding: 12px; font-size: 14px; font-weight: 600; cursor: pointer; font-family: 'Outfit', sans-serif; transition: all 0.2s; border: none; display: flex; align-items: center; justify-content: center; gap: 8px; margin-top: 6px; }
  .btn-scan-idle { background: #1a3a6e; color: #7ab8d4; border: 1px solid #2a5a9e; }
  .btn-scan-idle:hover { background: #2a4a8e; color: #00e5ff; border-color: #00e5ff; }
  .btn-scan-loading { background: #0f2040; color: #4a7a96; border: 1px solid #1a3a5e; cursor: not-allowed; }

  @keyframes spin { to { transform: rotate(360deg); } }
  .spinner { width: 16px; height: 16px; border: 2px solid #1a3a5e; border-top-color: #4a7aff; border-radius: 50%; animation: spin 0.8s linear infinite; display: inline-block; }

  .scan-status { margin-top: 14px; text-align: center; }
  .scan-status-row { font-size: 13px; color: #4a7a96; margin-bottom: 4px; }
  .scan-status-row strong { color: #ffb347; }
  .scan-hint { font-size: 12px; color: #2a4a5e; margin-top: 4px; }
  .scan-hint span { color: #00b4d8; cursor: pointer; }
  .scan-hint span:hover { color: #00e5ff; }

  .progress-bar-bg { background: #0a1a2e; height: 4px; margin-top: 10px; }
  .progress-bar-fill { background: #00e5ff; height: 4px; transition: width 0.3s; }

  .results-header { display: flex; align-items: center; justify-content: space-between; margin: 14px 0 8px; }
  .results-count { font-size: 13px; color: #7ab8d4; }
  .results-deselect { font-size: 12px; color: #c9a227; cursor: pointer; background: none; border: none; font-family: 'Outfit', sans-serif; }
  .results-deselect:hover { color: #e0b82e; }

  .position-item { background: #060c12; border: 1px solid #1a3a5e; padding: 12px 14px; margin-bottom: 6px; display: flex; align-items: flex-start; gap: 10px; cursor: pointer; transition: border 0.15s; }
  .position-item:hover { border-color: #2a5a8e; }
  .position-item.selected { border-color: #c9a227; background: #0f0e00; }
  .position-checkbox { width: 16px; height: 16px; min-width: 16px; border: 1px solid #2a5a7e; background: #060c12; display: flex; align-items: center; justify-content: center; margin-top: 2px; }
  .position-checkbox.checked { background: #c9a227; border-color: #c9a227; color: #050a0f; font-size: 11px; font-weight: 700; }
  .position-info { flex: 1; min-width: 0; }
  .position-pair { display: flex; align-items: center; gap: 6px; margin-bottom: 4px; flex-wrap: wrap; }
  .position-pair-name { font-size: 14px; font-weight: 700; color: #c8d8e8; }
  .position-version { font-size: 10px; padding: 1px 5px; background: #001030; border: 1px solid #003080; color: #4a80ff; font-weight: 700; }
  .position-fee { font-size: 11px; color: #4a7a96; }
  .position-status { font-size: 10px; padding: 2px 7px; letter-spacing: 0.5px; }
  .position-range { font-size: 12px; color: #4a7a96; margin-bottom: 2px; }
  .position-price { font-size: 13px; font-weight: 600; color: #00e5ff; }
  .position-id { font-size: 10px; color: #2a4a5e; margin-top: 3px; }

  .error-box { background: #1a0808; border: 1px solid #5a1a1a; color: #ff6b6b; padding: 12px 14px; font-size: 13px; margin-top: 12px; line-height: 1.5; }

  /* ADD WALLET MODAL */
  .wallet-modal { background: #0a1520; border: 1px solid #1a3a5e; width: 100%; max-width: 440px; margin: 20px; }
  .form-hint { font-size: 11px; color: #2a4a5e; display: inline-flex; align-items: center; justify-content: center; width: 16px; height: 16px; border: 1px solid #2a4a5e; border-radius: 50%; cursor: help; margin-left: 6px; }
  .form-sub { font-size: 11px; color: #2a4a5e; margin-top: 5px; line-height: 1.5; }
  .form-sub a { color: #00b4d8; text-decoration: none; }
  .wallet-types { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; }
  .wallet-type { background: #060c12; border: 1px solid #1a3a5e; padding: 10px 8px; cursor: pointer; text-align: center; transition: all 0.15s; }
  .wallet-type:hover { border-color: #2a5a7e; }
  .wallet-type.selected { border-color: #c9a227; background: #1a1200; }
  .wallet-type.disabled { opacity: 0.35; cursor: not-allowed; }
  .wallet-type-icon { font-size: 18px; margin-bottom: 4px; }
  .wallet-type-name { font-size: 12px; font-weight: 600; color: #c8d8e8; margin-bottom: 2px; }
  .wallet-type-sub { font-size: 10px; color: #4a7a96; }
  .wallet-type.selected .wallet-type-name { color: #c9a227; }

  /* ── POOL CARD ── */
  .pc-wrap { background: #070d14; border: 1px solid #0e2435; margin-bottom: 8px; }
  .pc-row { display: flex; align-items: center; gap: 12px; padding: 14px 18px; cursor: pointer; transition: background 0.15s; }
  .pc-row:hover { background: #0a1520; }
  .pc-left { display: flex; align-items: center; gap: 8px; min-width: 180px; }
  .pc-pair { font-size: 15px; font-weight: 700; color: #c8d8e8; }
  .pc-status { font-size: 10px; padding: 2px 8px; letter-spacing: 0.5px; text-transform: uppercase; white-space: nowrap; }
  .pc-chain { font-size: 11px; padding: 2px 7px; background: #0a1a24; border: 1px solid #1a3a4e; color: #4a7a96; }
  .pc-stats { display: flex; gap: 0; flex: 1; justify-content: flex-end; }
  .pc-stat { padding: 0 16px; border-left: 1px solid #0e2435; text-align: right; }
  .pc-stat:first-child { border-left: none; }
  .pc-stat-label { font-size: 10px; letter-spacing: 1px; color: #2a5a72; text-transform: uppercase; margin-bottom: 3px; }
  .pc-stat-val { font-size: 13px; font-weight: 600; color: #7ab8d4; }
  .pc-stat-val.red { color: #ff4f6e; }
  .pc-stat-val.green { color: #00ff88; }
  .pc-chevron { font-size: 20px; color: #2a5a72; transition: transform 0.2s; margin-left: 8px; line-height: 1; }
  .pc-chevron.open { transform: rotate(90deg); }

  /* expanded panel */
  .pc-panel { border-top: 1px solid #0e2435; padding: 20px 20px 16px; background: #060c12; }
  .pc-price-section { margin-bottom: 24px; }
  .pc-current-price { font-size: 28px; font-weight: 700; color: #00e5ff; margin-bottom: 24px; }

  /* ══ FUTURISTIC RANGE BAR ══ */
  .rb-wrap { position: relative; user-select: none; }

  /* ── Row 1: price tag (floats above dot) ── */
  .rb-tag-row { position: relative; height: 28px; margin-bottom: 2px; }
  .rb-tag {
    position: absolute; transform: translateX(-50%);
    background: #070d14; border: 1px solid #00e5ff;
    padding: 2px 8px; font-size: 12px; font-weight: 700;
    color: #00e5ff; white-space: nowrap;
    box-shadow: 0 0 10px rgba(0,229,255,0.35);
  }
  .rb-tag.oor { border-color: #ff4f6e; color: #ff4f6e; box-shadow: 0 0 10px rgba(255,79,110,0.35); }
  .rb-tag::after {
    content: ''; position: absolute; top: 100%; left: 50%; transform: translateX(-50%);
    border: 5px solid transparent; border-top-color: #00e5ff;
  }
  .rb-tag.oor::after { border-top-color: #ff4f6e; }

  /* ── Row 2: the bar itself ── */
  .rb-bar-row { position: relative; height: 18px; }

  /* Outer metallic shell */
  .rb-shell {
    position: absolute; inset: 0;
    border-radius: 9px;
    background: #020810;
    border: 1px solid rgba(0,229,255,0.15);
    box-shadow: inset 0 2px 6px rgba(0,0,0,0.9), 0 0 0 1px rgba(0,0,0,0.5);
    overflow: hidden;
  }

  /* Zone fills inside shell */
  .rb-z-left  { position: absolute; top: 0; bottom: 0; left: 0;
    background: linear-gradient(90deg, rgba(120,10,25,0.7), rgba(255,79,110,0.45)); }
  .rb-z-range {
    position: absolute; top: 0; bottom: 0;
    background: linear-gradient(180deg,
      rgba(0,255,100,0.1) 0%, rgba(0,200,80,0.95) 15%,
      rgba(0,255,130,1) 45%, rgba(180,255,200,1) 50%,
      rgba(0,255,130,1) 55%, rgba(0,170,60,0.95) 85%,
      rgba(0,80,30,0.2) 100%
    );
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.25), inset 0 -1px 0 rgba(0,0,0,0.4);
    overflow: hidden;
  }
  .rb-z-range::after {
    content: ''; position: absolute; inset: 0; top: -50%; left: -60%; width: 40%; height: 200%;
    background: linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.22) 50%, transparent 70%);
    animation: rb-shine 3.5s ease-in-out infinite;
  }
  @keyframes rb-shine { 0%{ left:-60% } 100%{ left:140% } }
  .rb-z-right { position: absolute; top: 0; bottom: 0; right: 0;
    background: linear-gradient(90deg, rgba(255,150,30,0.3), rgba(140,60,0,0.6)); }

  /* Boundary lines — ON TOP of shell (outside overflow:hidden) */
  .rb-bound-line {
    position: absolute; top: -2px; bottom: -2px; width: 2px;
    transform: translateX(-50%);
    background: rgba(255,255,255,0.18);
    z-index: 2; pointer-events: none;
  }

  /* Dot — sits on top of bar row */
  .rb-dot-pos { position: absolute; top: 50%; transform: translate(-50%,-50%); z-index: 5; }
  .rb-dot {
    width: 22px; height: 22px; border-radius: 50%;
    background: radial-gradient(circle at 32% 30%, #ffffff 0%, #00e5ff 35%, #006a99 80%);
    border: 2px solid rgba(255,255,255,0.35);
    box-shadow: 0 0 0 0 rgba(0,229,255,0.6);
    animation: rb-glow-in 2s ease-in-out infinite;
  }
  .rb-dot.oor {
    background: radial-gradient(circle at 32% 30%, #ffffff 0%, #ff4f6e 35%, #7a0020 80%);
    animation: rb-glow-out 2s ease-in-out infinite;
  }
  @keyframes rb-glow-in  { 0%,100%{box-shadow:0 0 0 0 rgba(0,229,255,0.6),0 0 14px rgba(0,229,255,0.4)} 50%{box-shadow:0 0 0 6px rgba(0,229,255,0),0 0 22px rgba(0,229,255,0.7)} }
  @keyframes rb-glow-out { 0%,100%{box-shadow:0 0 0 0 rgba(255,79,110,0.6),0 0 14px rgba(255,79,110,0.4)} 50%{box-shadow:0 0 0 6px rgba(255,79,110,0),0 0 22px rgba(255,79,110,0.7)} }

  /* ── Row 3: entry + MIN/MAX labels ── */
  .rb-label-row { position: relative; height: 32px; margin-top: 4px; }
  .rb-entry-tick {
    position: absolute; transform: translateX(-50%);
    display: flex; flex-direction: column; align-items: center; gap: 2px;
  }
  .rb-entry-line { width: 1px; height: 8px; background: #4a7aff; box-shadow: 0 0 4px rgba(74,122,255,0.8); }
  .rb-entry-text { font-size: 10px; color: #4a7aff; white-space: nowrap; font-weight: 600; }
  .rb-min-block { position: absolute; left: 0; top: 0; }
  .rb-max-block { position: absolute; right: 0; top: 0; text-align: right; }
  .rb-minmax-lbl { font-size: 9px; letter-spacing: 1.5px; text-transform: uppercase; font-weight: 700; margin-bottom: 1px; }
  .rb-min-block .rb-minmax-lbl { color: #ff4f6e; }
  .rb-max-block .rb-minmax-lbl { color: #00ff88; }
  .rb-minmax-val { font-size: 13px; font-weight: 700; }
  .rb-min-block .rb-minmax-val { color: #ff6b88; }
  .rb-max-block .rb-minmax-val { color: #00ff88; }

  .pc-section-title { font-size: 10px; letter-spacing: 2px; color: #2a5a72; text-transform: uppercase; padding: 12px 0 8px; border-top: 1px solid #0e2435; margin-top: 8px; }
  .pc-section-title:first-of-type { margin-top: 0; }
  .pc-grid4 { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 10px; margin-bottom: 4px; }
  .pc-metric { background: #070d14; border: 1px solid #0e2435; padding: 10px 12px; }
  .pc-metric-label { font-size: 10px; letter-spacing: 1px; color: #2a5a72; text-transform: uppercase; margin-bottom: 4px; }
  .pc-metric-val { font-size: 13px; font-weight: 600; color: #7ab8d4; }
  .pc-metric-val.red { color: #ff4f6e; }
  .pc-metric-val.green { color: #00ff88; }
  .pc-metric-sub { font-size: 10px; color: #2a4a5e; margin-top: 3px; }
  .pc-info-row { display: flex; gap: 20px; flex-wrap: wrap; font-size: 12px; color: #4a7a96; padding: 10px 0; }
  .pc-addr { color: #00b4d8; font-family: monospace; }
  .pc-actions { display: flex; align-items: center; gap: 10px; padding-top: 14px; border-top: 1px solid #0e2435; margin-top: 8px; flex-wrap: wrap; }
  .pc-btn-link { font-size: 12px; color: #7ab8d4; text-decoration: none; padding: 6px 12px; border: 1px solid #1a3a4e; background: transparent; transition: all 0.15s; }
  .pc-btn-link:hover { border-color: #00e5ff; color: #00e5ff; }
  .pc-btn-close { font-size: 12px; color: #4a7a96; background: transparent; border: 1px solid #1a3a4e; padding: 6px 14px; cursor: pointer; font-family: 'Outfit', sans-serif; transition: all 0.15s; }
  .pc-btn-close:hover { border-color: #7ab8d4; color: #7ab8d4; }
  .pc-btn-remove { font-size: 12px; color: #ff4f6e; background: transparent; border: 1px solid #5a1a28; padding: 6px 14px; cursor: pointer; font-family: 'Outfit', sans-serif; transition: all 0.15s; margin-left: auto; }
  .pc-btn-remove:hover { background: #1a0810; }

  .pc-revert-badge { font-size: 9px; padding: 2px 5px; background: #001a0e; border: 1px solid #00ff88; color: #00ff88; font-weight: 700; letter-spacing: 0.5px; }
  .pc-amounts { display: flex; justify-content: space-between; font-size: 12px; color: #4a7a96; margin-top: 8px; padding-top: 6px; border-top: 1px solid #0e2435; }

  /* RESPONSIVE */
  @media (max-width: 1024px) {
    .sidebar { width: 190px; min-width: 190px; }
    .stats-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .topbar { padding: 14px 18px 0; }
    .content { padding: 18px; }
    .section-actions { width: 100%; margin-left: 0; margin-top: 6px; }
    .pc-stats { gap: 0; }
    .pc-stat { padding: 0 10px; }
    .pc-grid4 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  }
  @media (max-width: 768px) {
    .sidebar { position: fixed; top: 0; left: 0; bottom: 0; width: 260px; transform: translateX(-100%); box-shadow: 4px 0 24px rgba(0,0,0,0.7); }
    .sidebar.open { transform: translateX(0); }
    .hamburger { display: flex; }
    .stats-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; }
    .stat-value { font-size: 22px; }
    .pool-stats { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .topbar { padding: 12px 16px 0; }
    .content { padding: 14px 16px; }
    .page-title { font-size: 20px; }
    .wallet-types { grid-template-columns: repeat(2, 1fr); }
    .modal { margin: 12px; }
    .pc-row { flex-wrap: wrap; gap: 8px; }
    .pc-stats { flex-wrap: wrap; justify-content: flex-start; width: 100%; }
    .pc-stat { padding: 4px 12px 4px 0; border-left: none; text-align: left; }
    .pc-grid4 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .pc-info-row { gap: 10px; }
  }
  @media (max-width: 480px) {
    .stat-value { font-size: 18px; }
    .content { padding: 10px 12px; }
    .btn { padding: 6px 12px; font-size: 12px; }
    .tab { font-size: 12px; padding: 8px 12px; }
  }
`;

// ════════════════════════════════════════════════════════════════════
// SCAN MODAL
// ════════════════════════════════════════════════════════════════════
function ScanModal({ open, onClose, onImport }) {
  const [walletAddr, setWalletAddr] = useState("");
  const [chain, setChain]           = useState("arbitrum");
  const [scanning, setScanning]     = useState(false);
  const [progress, setProgress]     = useState({ phase: "", scanned: 0, total: 0 });
  const [positions, setPositions]   = useState(null);
  const [selected, setSelected]     = useState({});
  const [error, setError]           = useState("");
  const [elapsed, setElapsed]       = useState(0);
  const abortRef                    = useRef(null);
  const timerRef                    = useRef(null);

  useEffect(() => {
    if (scanning) {
      setElapsed(0);
      timerRef.current = setInterval(() => setElapsed(e => e + 1), 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [scanning]);

  const reset = () => {
    setScanning(false); setPositions(null); setSelected({});
    setError(""); setElapsed(0); setProgress({ phase: "", scanned: 0, total: 0 });
  };

  const handleClose = () => { abortRef.current?.abort(); reset(); onClose(); };

  const handleScan = async () => {
    if (!walletAddr.trim() || !walletAddr.startsWith("0x")) {
      setError("Ingresa una dirección de wallet válida (0x...)"); return;
    }
    setError(""); setPositions(null); setSelected({});
    setScanning(true);

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const pos = await scanWalletOnChain(
        walletAddr, chain,
        (p) => setProgress(p),
        controller.signal
      );
      setPositions(pos);
      const sel = {};
      pos.forEach(p => { sel[p.tokenId] = true; });
      setSelected(sel);
    } catch (err) {
      if (err.name !== "AbortError") {
        setError(`Error al escanear: ${err.message}`);
      }
    } finally {
      setScanning(false);
    }
  };

  const handleStop = () => { abortRef.current?.abort(); setScanning(false); };

  const toggleSelect = (id) => setSelected(prev => ({ ...prev, [id]: !prev[id] }));
  const deselectAll  = () => {
    const sel = {};
    positions?.forEach(p => { sel[p.tokenId] = false; });
    setSelected(sel);
  };

  const selectedCount = Object.values(selected).filter(Boolean).length;

  const handleImport = () => {
    const toImport = positions.filter(p => selected[p.tokenId]);
    onImport(toImport);
    handleClose();
  };

  const formatTime = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
  const pct = progress.total > 0 ? Math.round((progress.scanned / progress.total) * 100) : 0;

  if (!open) return null;

  return (
    <div className="modal-overlay open" onClick={(e) => e.target.classList.contains("modal-overlay") && handleClose()}>
      <div className="modal">
        <div className="modal-header">
          <div>
            <div className="modal-title">Escanear Posiciones LP</div>
            <div className="modal-subtitle">
              Escanea tu wallet para encontrar posiciones LP activas de Uniswap V3 en la chain seleccionada.
            </div>
          </div>
          <button className="modal-close" onClick={handleClose}>✕</button>
        </div>

        <div className="modal-body">
          <div className="form-group">
            <label className="form-label">Dirección de wallet</label>
            <input
              className="form-input"
              placeholder="0x ..."
              value={walletAddr}
              onChange={e => { setWalletAddr(e.target.value); setError(""); setPositions(null); }}
              disabled={scanning}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Cadena</label>
            <select
              className="form-select"
              value={chain}
              onChange={e => { setChain(e.target.value); setPositions(null); }}
              disabled={scanning}
            >
              {CHAINS.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
            </select>
          </div>

          {!scanning ? (
            <button className="btn-scan btn-scan-idle" onClick={handleScan}>
              🔍 Escanear Posiciones
            </button>
          ) : (
            <>
              <button className="btn-scan btn-scan-loading" disabled>
                <span className="spinner" /> Escaneando on-chain...
              </button>
              <div className="scan-status">
                <div className="scan-status-row">
                  {progress.phase === "enumerating" ? "Enumerando NFTs..." : `Leyendo posición ${progress.scanned}/${progress.total}`}
                  {" "}<strong>{formatTime(elapsed)}</strong>
                </div>
                {progress.total > 0 && (
                  <div className="progress-bar-bg">
                    <div className="progress-bar-fill" style={{ width: `${pct}%` }} />
                  </div>
                )}
                <div className="scan-hint">
                  El escaneo puede tardar hasta 2 minutos.{" "}
                  <span onClick={handleStop}>¿Tarda mucho? Detener</span>
                </div>
              </div>
            </>
          )}

          {error && <div className="error-box">⚠ {error}</div>}

          {positions !== null && !scanning && (
            <>
              <div className="results-header">
                <span className="results-count">
                  {positions.length === 0
                    ? "0 posiciones encontradas"
                    : `${positions.length} posición${positions.length > 1 ? "es" : ""} encontrada${positions.length > 1 ? "s" : ""}`}
                </span>
                {positions.length > 0 && (
                  <button className="results-deselect" onClick={deselectAll}>Deseleccionar todas</button>
                )}
              </div>

              {positions.length === 0 ? (
                <div className="empty-state" style={{ padding: "20px", marginTop: 0 }}>
                  <div className="empty-title">No se encontraron posiciones LP activas</div>
                  <div className="empty-sub">Prueba con otra wallet o cadena</div>
                </div>
              ) : (
                positions.map(pos => {
                  const isSelected = !!selected[pos.tokenId];
                  return (
                    <div
                      key={pos.tokenId}
                      className={`position-item ${isSelected ? "selected" : ""}`}
                      onClick={() => toggleSelect(pos.tokenId)}
                    >
                      <div className={`position-checkbox ${isSelected ? "checked" : ""}`}>
                        {isSelected && "✓"}
                      </div>
                      <div className="position-info">
                        <div className="position-pair">
                          <span className="position-pair-name">{pos.token0Symbol}/{pos.token1Symbol}</span>
                          <span className="position-version">V3</span>
                          <span className="position-fee">{(pos.fee / 10000).toFixed(2)}%</span>
                          <span
                            className="position-status"
                            style={{ color: pos.status.color, background: pos.status.bg, border: `1px solid ${pos.status.border}` }}
                          >
                            {pos.status.label}
                          </span>
                        </div>
                        <div className="position-range">
                          Rango: {formatPrice(pos.priceLower)} – {formatPrice(pos.priceUpper)}
                        </div>
                        <div className="position-price">Precio aprox: {formatPrice(pos.currentPrice)}</div>
                        <div className="position-id">ID: {pos.tokenId}</div>
                      </div>
                    </div>
                  );
                })
              )}
            </>
          )}
        </div>

        <div className="modal-footer">
          <button className="btn btn-ghost" onClick={handleClose}>Cerrar</button>
          {positions !== null && positions.length > 0 && (
            <button className="btn btn-gold" disabled={selectedCount === 0} onClick={handleImport}>
              Añadir {selectedCount} pool{selectedCount !== 1 ? "s" : ""}
            </button>
          )}
          {scanning && (
            <button className="btn btn-danger" onClick={handleStop}>
              Detener e importar ({selectedCount})
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════
// WALLET TYPES
// ════════════════════════════════════════════════════════════════════
// ════════════════════════════════════════════════════════════════════
// HYPERLIQUID SERVICE
// API pública directa — sin backend intermediario
// Docs: https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api
// ════════════════════════════════════════════════════════════════════
const HL_API    = "https://api.hyperliquid.xyz/exchange";
const HL_INFO   = "https://api.hyperliquid.xyz/info";

// ── Keccak-256 / secp256k1 usando ethers.js desde CDN (cargado en index.html)
// Firmamos localmente con la private key — nunca sale del browser
// ── Helpers ───────────────────────────────────────────────────────
async function hlGetAccountState(address) {
  const res = await fetch(HL_INFO, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type: "clearinghouseState", user: address }),
  });
  return res.json();
}

async function hlGetOpenOrders(address) {
  const res = await fetch(HL_INFO, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type: "openOrders", user: address }),
  });
  return res.json();
}

async function hlGetPositions(address) {
  // Fetch both perp account and spot balances in parallel
  const [perpRes, spotRes] = await Promise.all([
    fetch(HL_INFO, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "clearinghouseState", user: address }),
    }),
    fetch(HL_INFO, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "spotClearinghouseState", user: address }),
    }),
  ]);
  const perp = await perpRes.json();
  const spot = await spotRes.json();

  // Perp equity (trading account)
  const perpEquity = parseFloat(perp?.marginSummary?.accountValue ?? "0");

  // Spot balances — sum all token values in USD
  const spotBalance = (spot?.balances ?? []).reduce((acc, b) => {
    return acc + parseFloat(b?.entryNtl ?? b?.hold ?? "0");
  }, 0);

  // Total = perp + spot
  const totalBalance = perpEquity + spotBalance;

  // Better spot balance: use total from spot if perp is empty
  const spotUsdc = (spot?.balances ?? []).find(b => b.coin === "USDC");
  const spotTotal = spotUsdc ? parseFloat(spotUsdc.total ?? "0") : 0;

  const balance = perpEquity > 0
    ? perpEquity
    : spotTotal > 0
      ? spotTotal
      : totalBalance;

  return {
    balance,
    perpEquity,
    spotTotal,
    positions: (perp?.assetPositions ?? []).map(p => ({
      coin:       p.position?.coin,
      size:       parseFloat(p.position?.szi ?? "0"),
      entryPrice: parseFloat(p.position?.entryPx ?? "0"),
      pnl:        parseFloat(p.position?.unrealizedPnl ?? "0"),
      leverage:   p.position?.leverage?.value ?? 1,
      side:       parseFloat(p.position?.szi ?? "0") > 0 ? "Long" : "Short",
    })),
    spotBalances: (spot?.balances ?? []).map(b => ({
      coin:  b.coin,
      total: parseFloat(b.total ?? "0"),
      hold:  parseFloat(b.hold ?? "0"),
    })),
    rawPerp: perp,
    rawSpot: spot,
  };
}

async function hlGetAllMids() {
  const res = await fetch(HL_INFO, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type: "allMids" }),
  });
  return res.json(); // { BTC: "104000", ETH: "2050", ... }
}

// ── Hyperliquid signing — copia exacta del HL TypeScript SDK ───────
// Fuente: github.com/hyperliquid-dex/hyperliquid-ts-sdk/blob/main/src/signing.ts
//
function hlActionHash(action, vaultAddress, nonce) {
  const msgPackBytes = msgpackEncode(action);                    // @msgpack/msgpack
  const additionalBytesLength = vaultAddress === null ? 9 : 29;
  const data = new Uint8Array(msgPackBytes.length + additionalBytesLength);
  data.set(msgPackBytes);
  const view = new DataView(data.buffer);
  view.setBigUint64(msgPackBytes.length, BigInt(nonce), false); // big-endian
  if (vaultAddress === null) {
    data[msgPackBytes.length + 8] = 0;
  } else {
    data[msgPackBytes.length + 8] = 1;
    const vaultBytes = new Uint8Array(
      vaultAddress.slice(2).match(/.{2}/g).map(h => parseInt(h, 16))
    );
    data.set(vaultBytes, msgPackBytes.length + 9);
  }
  return window.ethers.keccak256(data);
}

async function hlSignAndSend(action, privateKey, vaultAddress = null) {
  if (!window.ethers) throw new Error("ethers.js no cargado");

  const { ethers } = window;
  const wallet = new ethers.Wallet(
    privateKey.startsWith("0x") ? privateKey : "0x" + privateKey
  );
  const nonce        = Date.now();
  const connectionId = hlActionHash(action, vaultAddress, nonce);

  const domain = {
    name:              "HyperliquidSignTransaction",
    version:           "1",
    chainId:           1337,
    verifyingContract: "0x0000000000000000000000000000000000000000",
  };
  const types = {
    Agent: [
      { name: "source",       type: "string"  },
      { name: "connectionId", type: "bytes32" },
    ],
  };

  const signature = await wallet.signTypedData(
    domain, types, { source: "a", connectionId }
  );
  const sig = ethers.Signature.from(signature);

  const payload = {
    action,
    nonce,
    signature: { r: sig.r, s: sig.s, v: sig.v },
    ...(vaultAddress ? { vaultAddress } : {}),
  };

  const res  = await fetch(HL_API, {
    method:  "POST",
    headers: { "Content-Type": "application/json" },
    body:    JSON.stringify(payload),
  });
  const text = await res.text();
  try { return JSON.parse(text); }
  catch { throw new Error(`HL response: ${text.slice(0, 300)}`); }
}

// ── Place an order ─────────────────────────────────────────────────
async function hlPlaceOrder({ privateKey, coin, side, size, price = null, reduceOnly = false }) {
  // 1. Get asset index from meta
  const meta  = await hlGetMeta();
  const asset = meta?.universe?.findIndex(a => a.name === coin);
  if (asset === undefined || asset === -1)
    throw new Error(`Coin "${coin}" no encontrada en Hyperliquid`);

  const isBuy = side === "B";

  // 2. For market orders HL requires a slippage price
  //    Convention: buy at 5% above mid, sell at 5% below mid
  let orderPrice = price;
  if (!orderPrice) {
    const mids = await hlGetAllMids();
    const mid  = parseFloat(mids[coin] || "0");
    if (mid <= 0) throw new Error(`No se pudo obtener precio de ${coin}`);
    // Round to reasonable decimals
    const slippage = isBuy ? mid * 1.05 : mid * 0.95;
    // HL expects price as string with up to 5 significant figures
    orderPrice = parseFloat(slippage.toPrecision(5));
  }

  const action = {
    type:   "order",
    orders: [{
      a:  asset,
      b:  isBuy,
      p:  String(orderPrice),
      s:  String(size),
      r:  reduceOnly,
      t:  price
        ? { limit: { tif: "Gtc" } }
        : { limit: { tif: "Ioc" } },   // IOC = fills immediately or cancels (market-like)
    }],
    grouping: "na",
  };

  return hlSignAndSend(action, privateKey);
}

async function hlGetMeta() {
  const res = await fetch(HL_INFO, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type: "meta" }),
  });
  return res.json();
}

// ── Cancel an order ────────────────────────────────────────────────
async function hlCancelOrder({ privateKey, coin, orderId }) {
  const meta  = await hlGetMeta();
  const asset = meta?.universe?.findIndex(a => a.name === coin);
  const action = {
    type:    "cancel",
    cancels: [{ a: asset, o: orderId }],
  };
  return hlSignAndSend(action, privateKey);
}

// ── Close a position (market) ─────────────────────────────────────
async function hlClosePosition({ privateKey, coin, size }) {
  return hlPlaceOrder({
    privateKey,
    coin,
    side:       size > 0 ? "A" : "B",    // opposite side to close
    size:       Math.abs(size),
    reduceOnly: true,
  });
}

// ── Validate a private key by deriving the address ─────────────────
async function hlDeriveAddress(privateKey) {
  if (!window.ethers) return null;
  try {
    const wallet = new window.ethers.Wallet(
      privateKey.startsWith("0x") ? privateKey : "0x" + privateKey
    );
    return wallet.address;
  } catch { return null; }
}

const WALLET_TYPES = [
  { id: "proteccion", icon: "🛡", name: "Protección", sub: "Cobertura",         disabled: false },
  { id: "trading",    icon: "📊", name: "Trading",    sub: "Rango",         disabled: false },
  { id: "insider",    icon: "🤖", name: "Insider",    sub: "Mean-rev",      disabled: false },
  { id: "copy",       icon: "📋", name: "Copy",       sub: "No disponible", disabled: true  },
];

// ════════════════════════════════════════════════════════════════════
// WALLETS TAB
// ════════════════════════════════════════════════════════════════════
function WalletsTab() {
  const { user } = useAuth()
  const { wallets, loading: walletsLoading, addWallet, removeWallet } = useWalletsSync(user?.id)

  const [modalOpen, setModalOpen]       = useState(false);
  const [selectedType, setSelectedType] = useState("proteccion");
  const [walletName, setWalletName]     = useState("");
  const [address, setAddress]           = useState("");
  const [apiKey, setApiKey]             = useState("");
  const [agentWallet, setAgentWallet]   = useState("");
  const [saving, setSaving]             = useState(false);
  const [saveError, setSaveError]       = useState("");

  const [balances, setBalances] = useState({});
  const [positions, setPositions] = useState({});
  const [prices, setPrices]   = useState({});

  // Fetch live HL data for all wallets
  const refreshBalances = async () => {
    const mids = await hlGetAllMids().catch(() => ({}));
    setPrices(mids);
    for (const w of wallets) {
      try {
        const data = await hlGetPositions(w.address);
        setBalances(prev => ({ ...prev, [w.id]: data.balance }));
        // Store full data object so we can access spotTotal, perpEquity, spotBalances
        setPositions(prev => ({ ...prev, [w.id]: {
          positions:    data.positions,
          spotBalances: data.spotBalances,
          spotTotal:    data.spotTotal,
          perpEquity:   data.perpEquity,
        }}));
      } catch {}
    }
  };

  useEffect(() => {
    if (wallets.length > 0) refreshBalances();
    const interval = setInterval(refreshBalances, 15000);
    return () => clearInterval(interval);
  }, [wallets.length]);

  // Auto-derive agent wallet from private key (only if ethers.js is loaded)
  const handleApiKeyChange = async (val) => {
    setApiKey(val);
    setAgentWallet("");
    const clean = val.startsWith("0x") ? val.slice(2) : val;
    if (/^[0-9a-fA-F]{64}$/.test(clean) && window.ethers) {
      try {
        const w = new window.ethers.Wallet("0x" + clean);
        setAgentWallet(w.address);
      } catch {}
    }
  };

  const resetForm = () => {
    setWalletName(""); setAddress(""); setApiKey(""); setAgentWallet("");
    setSelectedType("proteccion"); setSaveError("");
  };

  const handleAdd = async () => {
    if (!walletName.trim()) return setSaveError("Nombre requerido");
    if (!address.match(/^0x[0-9a-fA-F]{40}$/)) return setSaveError("Dirección de cuenta principal inválida (debe ser 0x + 40 hex)");
    const cleanKey = apiKey.startsWith("0x") ? apiKey.slice(2) : apiKey;
    if (!/^[0-9a-fA-F]{64}$/.test(cleanKey)) return setSaveError("API Key debe ser 64 caracteres hex válidos");
    setSaving(true); setSaveError("");
    try {
      // Derive agent address
      let derivedAgent = agentWallet;
      if (!derivedAgent && window.ethers) {
        try {
          const w = new window.ethers.Wallet("0x" + cleanKey);
          derivedAgent = w.address;
        } catch {}
      }

      // Verify main account exists on HL
      const data = await hlGetPositions(address);

      // Save to Supabase (private key stays in localStorage via hook)
      await addWallet({
        label:        walletName,
        address,
        agentAddress: derivedAgent,
        purpose:      selectedType,
        privateKey:   "0x" + cleanKey,
      });

      setBalances(prev => ({ ...prev, [address]: data.balance }));
      setPositions(prev => ({ ...prev, [address]: {
        positions:    data.positions,
        spotBalances: data.spotBalances,
        spotTotal:    data.spotTotal,
        perpEquity:   data.perpEquity,
      }}));
      setModalOpen(false); resetForm();
    } catch (e) {
      setSaveError(e.message || "Error al guardar wallet");
    }
    setSaving(false);
  };

  const handleRemove = async (id) => {
    await removeWallet(id);
    setBalances(prev => { const n = { ...prev }; delete n[id]; return n; });
    setPositions(prev => { const n = { ...prev }; delete n[id]; return n; });
  };

  const purposeColor = { proteccion: "#00e5ff", trading: "#00ff88", insider: "#ffb347", copy: "#888" };
  const purposeLabel = { proteccion: "Protección", trading: "Trading", insider: "Insider", copy: "Copy" };

  return (
    <>
      <div className="info-box">
        Conecta tus wallets de Hyperliquid para monitorear balances y posiciones en tiempo real.
        <span style={{ color:"#ffb347" }}> ⚠ Las API Keys se guardan localmente en tu browser (localStorage). Usa solo en tu dispositivo personal.</span>
      </div>

      <div className="wallets-section">
        <div className="wallets-section-header">
          <span className="wallets-section-title">Mis Wallets ({wallets.length})</span>
          <button className="btn btn-gold" onClick={() => setModalOpen(true)}>+ Añadir</button>
        </div>

        {wallets.length === 0 ? (
          <div className="empty-state">
            <div className="empty-title">No tienes wallets configuradas.</div>
            <div className="empty-sub">Añade una wallet de Hyperliquid para monitorear balances y operar.</div>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 12 }}>
            {wallets.map(w => {
              const bal      = balances[w.id];
              const posData  = positions[w.id] || {};
              const pos      = posData.positions || [];
              const spotBals = posData.spotBalances || [];
              return (
                <div key={w.id} style={{
                  background: "#070d14", border: "1px solid #0e2435",
                  borderRadius: 4, padding: "14px 18px",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: pos.length ? 12 : 0 }}>
                    {/* Type badge */}
                    <span style={{
                      fontSize: 10, fontWeight: 700, letterSpacing: 1, padding: "2px 8px",
                      border: `1px solid ${purposeColor[w.purpose]}`,
                      color: purposeColor[w.purpose], background: "transparent",
                    }}>{purposeLabel[w.purpose]?.toUpperCase()}</span>

                    {/* Label + address */}
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, color: "#c8e6f0", fontSize: 14 }}>{w.label}</div>
                      <div style={{ fontSize: 11, color: "#2a5a72", fontFamily: "monospace" }}>
                        {w.address.slice(0,8)}...{w.address.slice(-6)}
                      </div>
                    </div>

                    {/* Balance */}
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: 11, color: "#2a5a72", textTransform: "uppercase", letterSpacing: 1 }}>Balance</div>
                      <div style={{ fontSize: 18, fontWeight: 700, color: "#00ff88" }}>
                        {bal !== undefined ? `$${bal.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : "—"}
                      </div>
                      {positions[w.id]?.spotTotal > 0 && positions[w.id]?.perpEquity > 0 && (
                        <div style={{ fontSize: 10, color: "#2a5a72" }}>
                          Spot: ${positions[w.id].spotTotal.toFixed(2)} · Perp: ${positions[w.id].perpEquity.toFixed(2)}
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <button onClick={() => handleRemove(w.id)} style={{
                      background: "transparent", border: "1px solid #5a1a28",
                      color: "#ff4f6e", padding: "4px 10px", fontSize: 12,
                      cursor: "pointer", fontFamily: "Outfit, sans-serif",
                    }}>🗑</button>
                  </div>

                  {/* Spot Balances */}
                  {spotBals.length > 0 && (
                    <div style={{ borderTop: "1px solid #0e2435", paddingTop: 8, marginTop: pos.length ? 8 : 0 }}>
                      <div style={{ fontSize: 10, color: "#2a5a72", letterSpacing: 1, marginBottom: 6 }}>SPOT BALANCES</div>
                      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                        {spotBals.filter(b => b.total > 0).map((b, i) => (
                          <span key={i} style={{ fontSize: 12 }}>
                            <span style={{ color: "#4a7a96" }}>{b.coin}</span>{" "}
                            <span style={{ color: "#00ff88", fontWeight: 600 }}>{b.total.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 6 })}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Open Positions */}
                  {pos.length > 0 && (
                    <div style={{ borderTop: "1px solid #0e2435", paddingTop: 10 }}>
                      <div style={{ fontSize: 10, color: "#2a5a72", letterSpacing: 1, marginBottom: 6 }}>POSICIONES ABIERTAS</div>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px,1fr))", gap: 8 }}>
                        {pos.map((p, i) => (
                          <div key={i} style={{
                            background: "#050c14", border: "1px solid #0e2435",
                            padding: "8px 12px", borderRadius: 2,
                          }}>
                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                              <span style={{ fontWeight: 700, color: "#c8e6f0" }}>{p.coin}</span>
                              <span style={{ fontSize: 11, color: p.side === "Long" ? "#00ff88" : "#ff4f6e",
                                border: `1px solid ${p.side === "Long" ? "#003a22" : "#5a1a28"}`,
                                padding: "1px 6px" }}>{p.side}</span>
                            </div>
                            <div style={{ fontSize: 11, color: "#4a7a96" }}>Size: {p.size}</div>
                            <div style={{ fontSize: 11, color: "#4a7a96" }}>Entry: ${p.entryPrice.toLocaleString()}</div>
                            <div style={{ fontSize: 12, fontWeight: 600, color: p.pnl >= 0 ? "#00ff88" : "#ff4f6e", marginTop: 4 }}>
                              PNL: {p.pnl >= 0 ? "+" : ""}${p.pnl.toFixed(2)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Current prices ticker */}
                  {Object.keys(prices).length > 0 && (
                    <div style={{ marginTop: 8, display: "flex", gap: 16, flexWrap: "wrap" }}>
                      {["ETH", "BTC", "SOL"].map(sym => prices[sym] && (
                        <span key={sym} style={{ fontSize: 11, color: "#2a5a72" }}>
                          <span style={{ color: "#4a7a96" }}>{sym}</span>{" "}
                          <span style={{ color: "#00e5ff" }}>${parseFloat(prices[sym]).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ── ADD WALLET MODAL ── */}
      <div className={`modal-overlay ${modalOpen ? "open" : ""}`}
        onClick={(e) => e.target.classList.contains("modal-overlay") && (setModalOpen(false), resetForm())}>
        <div className="wallet-modal">
          <div className="modal-header">
            <div><div className="modal-title">Añadir Wallet Hyperliquid</div></div>
            <button className="modal-close" onClick={() => { setModalOpen(false); resetForm(); }}>✕</button>
          </div>
          <div className="modal-body">
            <div className="form-group">
              <label className="form-label">Nombre / Etiqueta</label>
              <input className="form-input" placeholder="Ej: Wallet Principal HL"
                value={walletName} onChange={e => setWalletName(e.target.value)} />
            </div>

            <div className="form-group">
              <label className="form-label">Tipo de Wallet</label>
              <div className="wallet-types">
                {WALLET_TYPES.map(t => (
                  <div key={t.id}
                    className={`wallet-type ${selectedType === t.id ? "selected" : ""} ${t.disabled ? "disabled" : ""}`}
                    onClick={() => !t.disabled && setSelectedType(t.id)}>
                    <div className="wallet-type-icon">{t.icon}</div>
                    <div className="wallet-type-name">{t.name}</div>
                    <div className="wallet-type-sub">{t.sub}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual guide */}
            <div style={{ background:"#0a1520",border:"1px solid #1a3a5e",padding:"12px 14px",fontSize:12,lineHeight:1.8,color:"#4a7a96" }}>
              <div style={{ color:"#00e5ff",fontWeight:700,marginBottom:6,fontSize:11,letterSpacing:1,textTransform:"uppercase" }}>
                ⚡ Arquitectura de Hyperliquid — 2 addresses
              </div>
              <div style={{ display:"flex",flexDirection:"column",gap:4 }}>
                <div><span style={{ color:"#ffb347" }}>① Cuenta Principal</span> — donde están tus fondos USDC. La que ves en MetaMask/Rabby. <span style={{ color:"#ffb347" }}>← LA QUE DEBES PEGAR ABAJO</span></div>
                <div style={{ color:"#2a5a72",marginLeft:16 }}>↓ autoriza a →</div>
                <div><span style={{ color:"#7ab8d4" }}>② API Wallet (Agent)</span> — firma las órdenes. Se deriva de tu API Key. <span style={{ color:"#7ab8d4" }}>← Solo pon la private key abajo</span></div>
              </div>
              <div style={{ marginTop:8,padding:"6px 10px",background:"#050a0f",border:"1px solid #0e2435",color:"#2a5a72",fontSize:11 }}>
                En Hyperliquid → Portfolio → tu address arriba a la derecha → esa es tu Cuenta Principal ✓
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" style={{ color:"#ffb347" }}>
                ① Dirección Cuenta Principal <span style={{ color:"#ff4f6e" }}>*</span>
              </label>
              <input className="form-input" placeholder="0x476e... (tu cuenta con los fondos USDC)"
                value={address} onChange={e => setAddress(e.target.value)} />
              <div className="form-sub">
                Esta dirección tiene tus fondos. Se usa para consultar balance y posiciones.
                <br/>En HL: haz click en tu avatar arriba a la derecha → copia la dirección larga.
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" style={{ color:"#7ab8d4" }}>
                ② API Key Secret (Private Key del Agent Wallet) <span style={{ color:"#ff4f6e" }}>*</span>
              </label>
              <input className="form-input" type="password"
                placeholder="0x6e6b... (private key de tu API Wallet en HL)"
                value={apiKey} onChange={e => handleApiKeyChange(e.target.value)} />
              <div className="form-sub">
                En HL: <strong style={{ color:"#7ab8d4" }}>Trade → API → tu API Wallet → Show Secret</strong>.
                Esta key firma las órdenes pero NO puede retirar fondos.
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Agent Wallet (derivada automáticamente)</label>
              <input className="form-input" readOnly
                placeholder="Se deriva automáticamente de la API Key..."
                value={agentWallet}
                style={{ opacity: agentWallet ? 1 : 0.4, color: agentWallet ? "#00ff88" : undefined }} />
              <div className="form-sub" style={{ color: agentWallet ? "#00ff88" : "#2a5a72" }}>
                {agentWallet
                  ? `✓ Agent: ${agentWallet} — esta dirección debe estar autorizada en HL → API`
                  : "Pega tu API Key arriba para derivar el agent address automáticamente."}
              </div>
            </div>

            {saveError && (
              <div style={{ color: "#ff4f6e", fontSize: 12, padding: "8px 0", borderTop: "1px solid #5a1a28" }}>
                ⚠ {saveError}
              </div>
            )}
          </div>
          <div className="modal-footer">
            <button className="btn btn-ghost" onClick={() => { setModalOpen(false); resetForm(); }}>Cancelar</button>
            <button className="btn btn-gold" onClick={handleAdd} disabled={saving}>
              {saving ? "Verificando..." : "Añadir Wallet"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

// ════════════════════════════════════════════════════════════════════
// Cobertura TAB
// ════════════════════════════════════════════════════════════════════
// ════════════════════════════════════════════════════════════════════
// POOL CARD COMPONENT
// ════════════════════════════════════════════════════════════════════
// ════════════════════════════════════════════════════════════════════
// POOL CARD COMPONENT — powered by Revert Finance API
// ════════════════════════════════════════════════════════════════════
function calcPoolStats(pos) {
  const r = pos.revert; // Revert API data if available

  // ── Value & PNL ────────────────────────────────────────────────
  const valueUsd        = r ? parseFloat(r.underlying_value) : (pos.valueUsd ?? 0);
  const depositsValue   = r ? parseFloat(r.deposits_value)   : (pos.valueAtCreation ?? 0);
  const withdrawalsVal  = r ? parseFloat(r.withdrawals_value ?? "0") : 0;
  const netInvested     = depositsValue - withdrawalsVal;
  const pnlUsd          = r ? parseFloat(r.performance?.usd?.pnl ?? "0") : (valueUsd - netInvested);
  const pnlPct          = r ? parseFloat(r.performance?.usd?.roi ?? "0") : (netInvested > 0 ? (pnlUsd / netInvested) * 100 : 0);
  const aprUsd          = r ? parseFloat(r.performance?.usd?.apr ?? "0") : 0;
  const ilUsd           = r ? parseFloat(r.performance?.usd?.il  ?? "0") : 0;

  // ── PNL vs HODL ────────────────────────────────────────────────
  const pnlVsHodl       = r ? parseFloat(r.performance?.hodl?.pnl ?? "0") : 0;
  const aprVsHodl       = r ? parseFloat(r.performance?.hodl?.apr ?? "0") : 0;

  // ── PNL vs Token0/Token1 ───────────────────────────────────────
  const pnlToken0       = r ? parseFloat(r.performance?.token0?.pnl ?? "0") : 0;
  const pnlToken1       = r ? parseFloat(r.performance?.token1?.pnl ?? "0") : 0;

  // ── Fees ───────────────────────────────────────────────────────
  const feesValue       = r ? parseFloat(r.fees_value ?? "0")         : (pos.collectedFeesUsd ?? 0);
  const feesApr         = r ? parseFloat(r.performance?.usd?.fee_apr ?? "0") : 0;
  const uncollected0    = r ? parseFloat(r.uncollected_fees0 ?? "0")  : 0;
  const uncollected1    = r ? parseFloat(r.uncollected_fees1 ?? "0")  : 0;
  const collected0      = r ? parseFloat(r.collected_fees0   ?? "0")  : 0;
  const collected1      = r ? parseFloat(r.collected_fees1   ?? "0")  : 0;

  // ── Age ────────────────────────────────────────────────────────
  const ageDaysFloat    = r ? parseFloat(r.age ?? "0") : 0;
  const ageFromTs       = r ? null : (pos.createdAtTimestamp ? (Date.now() - pos.createdAtTimestamp) / 1000 : 0);
  const ageDays         = r ? Math.floor(ageDaysFloat) : Math.floor((ageFromTs ?? 0) / 86400);
  const ageHours        = r ? Math.floor((ageDaysFloat % 1) * 24) : Math.floor(((ageFromTs ?? 0) % 86400) / 3600);

  // ── Current amounts ────────────────────────────────────────────
  const amount0         = r ? parseFloat(r.current_amount0 ?? "0") : parseFloat(pos.amount0 ?? "0");
  const amount1         = r ? parseFloat(r.current_amount1 ?? "0") : parseFloat(pos.amount1 ?? "0");

  // ── Price & range ──────────────────────────────────────────────
  const currentPrice    = r ? parseFloat(r.pool_price ?? "0") : (pos.currentPrice ?? 0);
  const priceLower      = r ? parseFloat(r.price_lower ?? "0") : (pos.priceLower ?? 0);
  const priceUpper      = r ? parseFloat(r.price_upper ?? "0") : (pos.priceUpper ?? 0);
  const entryPrice      = pos.priceAtCreation ?? currentPrice;

  // ── Range bar ──────────────────────────────────────────────────
  const span            = priceUpper - priceLower;
  const barPct          = span > 0 ? Math.max(0, Math.min(100, (currentPrice - priceLower) / span * 100)) : 0;

  // ── 24h deltas ─────────────────────────────────────────────────
  const delta24hPnl     = r ? parseFloat(r.deltas_24h?.usd?.pnl ?? "0") : 0;
  const delta24hApr     = r ? parseFloat(r.deltas_24h?.usd?.apr ?? "0") : 0;

  // ── Deposits/withdrawals ───────────────────────────────────────
  const totalDep1       = r ? parseFloat(r.total_deposits1 ?? "0") : 0;
  const totalWit1       = r ? parseFloat(r.total_withdrawn1 ?? "0") : 0;

  return {
    valueUsd, depositsValue, netInvested, withdrawalsVal,
    pnlUsd, pnlPct, aprUsd, ilUsd,
    pnlVsHodl, aprVsHodl, pnlToken0, pnlToken1,
    feesValue, feesApr, uncollected0, uncollected1, collected0, collected1,
    ageDays, ageHours,
    amount0, amount1,
    currentPrice, priceLower, priceUpper, entryPrice, barPct,
    delta24hPnl, delta24hApr,
    totalDep1, totalWit1,
  };
}

// ════════════════════════════════════════════════════════════════════
// TRADING MODAL — Trading Avaro (breakout automático)
// ════════════════════════════════════════════════════════════════════
function TradingModal({ pos, s, onClose }) {
  const sym0 = pos.token0Symbol || "ETH";
  const coin = sym0.replace("W","") + "-PERP";

  const hlWallets = (() => {
    try { return JSON.parse(localStorage.getItem("hl_wallets") || "[]"); } catch { return []; }
  })();

  const [selectedWallet, setSelectedWallet] = useState(hlWallets[0]?.id || "");
  const [walletBalance, setWalletBalance]   = useState(null);
  const [direction, setDirection]           = useState("both");   // "both"|"long"|"short"
  const [buffer, setBuffer]                 = useState(20);
  const [breakoutBuffer, setBreakoutBuffer] = useState(0.1);
  const [leverage, setLeverage]             = useState(20);
  const [stopLoss, setStopLoss]             = useState("0.1");
  const [breakeven, setBreakeven]           = useState(1);
  const [trailingStop, setTrailingStop]     = useState(false);
  const [takeProfit, setTakeProfit]         = useState("");
  const [autoRearm, setAutoRearm]           = useState(true);
  const [activating, setActivating]         = useState(false);
  const [error, setError]                   = useState("");
  const [success, setSuccess]               = useState("");

  const poolValue  = s.valueUsd || 0;
  const capital    = poolValue * (1 + buffer / 100);
  const margin     = capital / leverage;
  const canActivate = walletBalance !== null && walletBalance >= margin;

  useEffect(() => {
    const w = hlWallets.find(w => w.id === selectedWallet);
    if (!w) return;
    hlGetPositions(w.address).then(d => setWalletBalance(d.balance)).catch(() => {});
  }, [selectedWallet]);

  const autoOptimize = () => {
    if (!walletBalance) return;
    for (const buf of [0, 20, 40, 60, 80, 100]) {
      const cap = poolValue * (1 + buf / 100);
      if (walletBalance >= cap / 50) { setBuffer(buf); setLeverage(50); return; }
    }
    setBuffer(0); setLeverage(50);
  };

  const handleActivate = async () => {
    setError(""); setSuccess("");
    const w = hlWallets.find(w => w.id === selectedWallet);
    if (!w) return setError("Selecciona una wallet");
    if (!w.privateKey) return setError("Vuelve a añadir la wallet");
    if (!canActivate) return setError(`Faltan $${(margin - walletBalance).toFixed(2)} en balance`);
    setActivating(true);
    try {
      // Save trading config to localStorage
      const configs = JSON.parse(localStorage.getItem("hl_trading") || "[]");
      configs.push({
        poolId: pos.tokenId, walletId: w.id, coin, direction,
        capital: capital.toFixed(2), leverage, buffer, breakoutBuffer,
        stopLoss: parseFloat(stopLoss), breakeven, trailingStop,
        takeProfit: takeProfit || null, autoRearm,
        activatedAt: Date.now(), status: "active",
      });
      localStorage.setItem("hl_trading", JSON.stringify(configs));
      setSuccess(`✓ Bot de trading activado · ${direction === "both" ? "LONG+SHORT" : direction.toUpperCase()} · ${coin}`);
    } catch(e) { setError(e.message); }
    setActivating(false);
  };

  const S = {
    overlay: { position:"fixed",inset:0,background:"rgba(5,10,15,0.78)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center",padding:16,backdropFilter:"blur(8px)" },
    modal:   { background:"#070d14",border:"1px solid #4a1a7a",width:"100%",maxWidth:480,maxHeight:"90vh",overflowY:"auto" },
    label:   { fontSize:11,color:"#4a7a96",letterSpacing:"0.8px",textTransform:"uppercase",marginBottom:6 },
    row:     { display:"flex",justifyContent:"space-between",alignItems:"center" },
    input:   { width:"100%",background:"#0a1520",border:"1px solid #2a1a4e",color:"#c8e6f0",padding:"9px 12px",fontSize:14,fontFamily:"Outfit,sans-serif",outline:"none" },
  };

  const bufferOpts = [
    {l:"Sin",v:0},{l:"+20%",v:20},{l:"+40%",v:40},{l:"+60%",v:60},{l:"+80%",v:80},{l:"+100%",v:100}
  ];
  const dirOpts = [
    {l:"LONG + SHORT",v:"both",sub:"Abre LONG arriba y SHORT abajo del rango"},
    {l:"Solo LONG",v:"long",sub:"Solo cuando rompe arriba"},
    {l:"Solo SHORT",v:"short",sub:"Solo cuando rompe abajo"},
  ];

  return (
    <div style={S.overlay} onClick={e => e.target===e.currentTarget && onClose()}>
      <div style={S.modal}>

        {/* Header */}
        <div style={{ padding:"20px 24px",borderBottom:"1px solid #2a1a4e",display:"flex",justifyContent:"space-between",alignItems:"flex-start" }}>
          <div>
            <div style={{ fontSize:16,fontWeight:700,color:"#c8a0ff",display:"flex",alignItems:"center",gap:8 }}>
              📈 Configurar Trading
            </div>
            <div style={{ fontSize:12,color:"#6a4a96",marginTop:3 }}>
              {sym0}/{pos.token1Symbol} · Rango {s.priceLower?.toFixed(2)} – {s.priceUpper?.toFixed(2)}
            </div>
          </div>
          <button onClick={onClose} style={{ background:"none",border:"none",color:"#4a7a96",fontSize:18,cursor:"pointer" }}>✕</button>
        </div>

        <div style={{ padding:"20px 24px",display:"flex",flexDirection:"column",gap:16 }}>

          {/* Wallet */}
          <div>
            <div style={S.label}>🔑 Wallet de Trading</div>
            {hlWallets.length === 0
              ? <div style={{ color:"#ff4f6e",fontSize:12 }}>No hay wallets. Ve a la pestaña Wallets.</div>
              : <>
                  <select style={{ ...S.input,width:"100%" }} value={selectedWallet} onChange={e => setSelectedWallet(e.target.value)}>
                    {hlWallets.map(w => <option key={w.id} value={w.id}>{w.label} ({w.address?.slice(0,8)}...)</option>)}
                  </select>
                  {walletBalance !== null && <div style={{ fontSize:12,color:"#00ff88",marginTop:4 }}>Balance: ${walletBalance.toFixed(2)}</div>}
                </>
            }
          </div>

          {/* Direction */}
          <div>
            <div style={S.label}>📊 Dirección del Breakout</div>
            <div style={{ display:"flex",gap:8 }}>
              {dirOpts.map(d => (
                <button key={d.v} onClick={() => setDirection(d.v)} style={{
                  flex:1,padding:"9px 6px",background:"transparent",cursor:"pointer",fontFamily:"Outfit,sans-serif",
                  fontSize:12,fontWeight:700,
                  border:`1px solid ${direction===d.v?"#a060ff":"#2a1a4e"}`,
                  color:direction===d.v?"#c8a0ff":"#4a7a96",
                  transition:"all 0.15s",
                }}>{d.l}</button>
              ))}
            </div>
            <div style={{ fontSize:11,color:"#4a5a72",marginTop:5 }}>
              {dirOpts.find(d=>d.v===direction)?.sub}
            </div>
          </div>

          {/* Capital + Leverage */}
          <div>
            <div style={{ ...S.row,marginBottom:8 }}>
              <div style={S.label}>⚡ Capital por Operación</div>
              <div style={{ fontSize:16,fontWeight:700,color:"#c8a0ff" }}>${capital.toFixed(2)}</div>
            </div>
            <div style={{ fontSize:11,color:"#4a7a96",marginBottom:4 }}>pool ${poolValue.toFixed(0)} + {buffer}%</div>

            {/* Buffer */}
            <div style={{ display:"flex",gap:6,flexWrap:"wrap",marginBottom:12 }}>
              {bufferOpts.map(opt => (
                <button key={opt.v} onClick={() => setBuffer(opt.v)} style={{
                  padding:"4px 10px",fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"Outfit,sans-serif",
                  background:"transparent",
                  border:`1px solid ${buffer===opt.v?"#a060ff":"#2a1a4e"}`,
                  color:buffer===opt.v?"#c8a0ff":"#4a7a96",
                }}>{opt.l}</button>
              ))}
            </div>

            {/* Breakout buffer slider */}
            <div style={{ ...S.row,marginBottom:6 }}>
              <span style={{ fontSize:11,color:"#4a7a96" }}>Buffer de Breakout</span>
              <span style={{ fontSize:12,fontWeight:700,color:"#c8a0ff" }}>{breakoutBuffer.toFixed(1)}%</span>
            </div>
            <input type="range" min={0.1} max={5} step={0.1} value={breakoutBuffer}
              onChange={e => setBreakoutBuffer(parseFloat(e.target.value))}
              style={{ width:"100%",accentColor:"#a060ff",marginBottom:4 }} />
            <div style={{ ...S.row,fontSize:10,color:"#2a1a4e" }}><span>0.1%</span><span>5%</span></div>
            <div style={{ fontSize:11,color:"#4a5a72",marginTop:4 }}>
              El precio debe moverse {breakoutBuffer.toFixed(1)}% fuera del rango antes de entrar
            </div>

            {/* Leverage */}
            <div style={{ ...S.row,marginTop:14,marginBottom:6 }}>
              <span style={{ fontSize:11,color:"#4a7a96" }}>Leverage (Isolated)</span>
              <span style={{ fontSize:12,fontWeight:700,color:"#c8a0ff" }}>{leverage}x</span>
            </div>
            <input type="range" min={1} max={50} value={leverage}
              onChange={e => setLeverage(Number(e.target.value))}
              style={{ width:"100%",accentColor:"#a060ff" }} />
            <div style={{ ...S.row,fontSize:10,color:"#2a1a4e" }}><span>1x</span><span>50x max</span></div>

            {/* Margin status */}
            {walletBalance !== null && (
              <div style={{
                background:canActivate?"#0a0a1a":"#1a0810",
                border:`1px solid ${canActivate?"#2a1a4e":"#5a1a28"}`,
                padding:"10px 12px",marginTop:10,fontSize:12,
                color:canActivate?"#c8a0ff":"#ff6b88",lineHeight:1.6,
              }}>
                <div style={{display:"flex",justifyContent:"space-between"}}><span>Margen requerido:</span><span style={{fontWeight:700}}>${margin.toFixed(2)}</span></div>
                <div style={{display:"flex",justifyContent:"space-between"}}><span>Balance wallet:</span><span>${walletBalance.toFixed(2)}</span></div>
                {canActivate
                  ? <div style={{color:"#c8a0ff",marginTop:4}}>✓ Balance suficiente</div>
                  : <div style={{display:"flex",gap:8,marginTop:8,flexWrap:"wrap"}}>
                      <button onClick={autoOptimize} style={{flex:1,padding:"5px 8px",background:"#0a1520",border:"1px solid #a060ff",color:"#c8a0ff",fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:"Outfit,sans-serif"}}>
                        ⚡ Auto-optimizar
                      </button>
                      <a href="https://app.hyperliquid.xyz/portfolio" target="_blank" rel="noreferrer"
                        style={{flex:1,padding:"5px 8px",background:"#0a1520",border:"1px solid #4a7aff",color:"#4a7aff",fontSize:11,fontWeight:700,textDecoration:"none",display:"flex",alignItems:"center",justifyContent:"center"}}>
                        💳 Depositar en HL
                      </a>
                    </div>
                }
              </div>
            )}
          </div>

          {/* Stop Loss */}
          <div>
            <div style={S.label}>🔴 Stop Loss Fijo (%) *</div>
            <input style={S.input} value={stopLoss}
              onChange={e => setStopLoss(e.target.value)} placeholder="0.1" />
            <div style={{ fontSize:11,color:"#4a7a96",marginTop:4 }}>Cierra la posición si pierde este % desde la entrada</div>
          </div>

          {/* Breakeven slider */}
          <div>
            <div style={{ ...S.row,marginBottom:6 }}>
              <div style={S.label}>📈 Breakeven (% ganancia para mover SL a entrada)</div>
              <span style={{ fontSize:12,color:"#c8a0ff",fontWeight:700 }}>{breakeven}%</span>
            </div>
            <input type="range" min={1} max={5} step={0.5} value={breakeven}
              onChange={e => setBreakeven(Number(e.target.value))}
              style={{ width:"100%",accentColor:"#a060ff" }} />
            <div style={{ ...S.row,fontSize:10,color:"#2a1a4e" }}><span>1%</span><span>5%</span></div>
          </div>

          {/* Trailing Stop */}
          <label style={{ display:"flex",alignItems:"center",gap:10,cursor:"pointer",fontSize:13,color:"#c8a0ff" }}>
            <input type="checkbox" checked={trailingStop} onChange={e => setTrailingStop(e.target.checked)}
              style={{ accentColor:"#a060ff",width:15,height:15 }} />
            <div>
              <div>Trailing Stop</div>
              <div style={{ fontSize:11,color:"#4a5a72",marginTop:2 }}>El SL sigue al precio cuando el trade está en ganancia</div>
            </div>
          </label>

          {/* Take Profit */}
          <div>
            <div style={S.label}>🎯 Take Profit (%) — opcional</div>
            <input style={S.input} value={takeProfit}
              onChange={e => setTakeProfit(e.target.value)} placeholder="-" />
            <div style={{ fontSize:11,color:"#4a7a96",marginTop:4 }}>Deja vacío para no usar TP</div>
          </div>

          {/* Auto-rearm */}
          <label style={{ display:"flex",alignItems:"flex-start",gap:10,cursor:"pointer",fontSize:13,color:"#c8a0ff",padding:"12px",background:"#0a0a1a",border:"1px solid #2a1a4e" }}>
            <input type="checkbox" checked={autoRearm} onChange={e => setAutoRearm(e.target.checked)}
              style={{ accentColor:"#a060ff",width:15,height:15,marginTop:2 }} />
            <div>
              <div style={{ fontWeight:600 }}>Auto-rearm</div>
              <div style={{ fontSize:11,color:"#4a5a72",marginTop:2,lineHeight:1.5 }}>
                Tras el SL, el bot vuelve a buscar breakouts automáticamente
              </div>
            </div>
          </label>

          {error   && <div style={{ background:"#1a0810",border:"1px solid #5a1a28",padding:"10px 12px",fontSize:12,color:"#ff6b88" }}>⚠ {error}</div>}
          {success && <div style={{ background:"#0a0a1a",border:"1px solid #4a1a7a",padding:"10px 12px",fontSize:12,color:"#c8a0ff" }}>{success}</div>}
        </div>

        {/* Footer */}
        <div style={{ padding:"14px 24px",borderTop:"1px solid #2a1a4e",display:"flex",gap:10 }}>
          <button onClick={onClose} style={{ flex:1,padding:"10px 0",background:"transparent",border:"1px solid #2a1a4e",color:"#4a7a96",fontSize:13,cursor:"pointer",fontFamily:"Outfit,sans-serif" }}>
            Cancelar
          </button>
          <button onClick={handleActivate}
            disabled={activating||!!success||hlWallets.length===0||!canActivate}
            style={{
              flex:2,padding:"10px 0",background:success?"#0a0a1a":"transparent",
              border:`1px solid ${success?"#4a1a7a":!canActivate?"#5a1a28":"#a060ff"}`,
              color:success?"#c8a0ff":!canActivate?"#ff4f6e":"#c8a0ff",
              fontSize:13,fontWeight:700,cursor:canActivate&&!success?"pointer":"not-allowed",
              fontFamily:"Outfit,sans-serif",
            }}>
            {success ? "✓ Trading Activo"
              : activating ? "Activando..."
              : !canActivate ? `⚠ Faltan $${(margin-(walletBalance||0)).toFixed(2)}`
              : "📈 Activar Trading"}
          </button>
        </div>
      </div>
    </div>
  );
}


function ProtectionModal({ pos, s, onClose }) {
  const sym0 = pos.token0Symbol || "ETH";
  const coin = sym0.replace("W","") + "-PERP"; // WETH → ETH-PERP

  // Load wallets from localStorage
  const hlWallets = (() => {
    try { return JSON.parse(localStorage.getItem("hl_wallets") || "[]"); } catch { return []; }
  })();

  const [selectedWallet, setSelectedWallet] = useState(hlWallets[0]?.id || "");
  const [walletBalance, setWalletBalance]   = useState(null);
  const [leverage, setLeverage]             = useState(50);
  const [buffer, setBuffer]                 = useState(100);   // % extra capital
  const [stopLoss, setStopLoss]             = useState("3.0");
  const [breakeven, setBreakeven]           = useState(1);
  const [tp1Pct, setTp1Pct]                = useState("1");
  const [tp1Close, setTp1Close]             = useState("40");
  const [tp2Pct, setTp2Pct]                = useState("2");
  const [tp2Close, setTp2Close]             = useState("60");
  const [noProtectReentry, setNoProtectReentry] = useState(false);
  const [activating, setActivating]         = useState(false);
  const [error, setError]                   = useState("");
  const [success, setSuccess]               = useState("");

  const isOor = !s.inRange && s.currentPrice < s.priceLower;

  // Capital calculations
  const poolValue    = s.valueUsd || 0;
  const bufferMult   = 1 + buffer / 100;
  const capital      = poolValue * bufferMult;
  const margin       = capital / leverage;
  const slPct        = parseFloat(stopLoss) || 0;

  // Auto-optimize: find best config for available balance
  const autoOptimize = () => {
    if (!walletBalance || walletBalance <= 0) return;
    // Try reducing buffer first, then leverage up
    for (const buf of [0, 20, 40, 60, 80, 100]) {
      const cap = poolValue * (1 + buf / 100);
      const needed = cap / 50; // max leverage
      if (walletBalance >= needed) {
        setBuffer(buf);
        setLeverage(50);
        return;
      }
    }
    // If nothing works, just max everything
    setBuffer(0);
    setLeverage(50);
  };

  // Auto-fix SL based on distance to range
  const autoFixSl = () => {
    const safeSl = Math.ceil(Math.abs(distToRange) * 1.2 * 10) / 10;
    setStopLoss(String(Math.max(safeSl, 1).toFixed(1)));
  };

  // Distance to lower bound
  const distToRange = s.priceLower > 0 && s.currentPrice > 0
    ? ((s.priceLower - s.currentPrice) / s.currentPrice * 100)
    : 0;
  const slTooTight  = slPct < Math.abs(distToRange) && isOor;
  const canActivate = walletBalance !== null && walletBalance >= margin;

  // Fetch wallet balance when wallet changes
  useEffect(() => {
    const w = hlWallets.find(w => w.id === selectedWallet);
    if (!w) return;
    hlGetPositions(w.address).then(d => setWalletBalance(d.balance)).catch(() => {});
  }, [selectedWallet]);

  const handleActivate = async () => {
    setError(""); setSuccess("");
    const w = hlWallets.find(w => w.id === selectedWallet);
    if (!w) return setError("Selecciona una wallet");
    if (!w.privateKey) return setError("No se encontró la API Key — vuelve a añadir la wallet");
    const cleanPk = w.privateKey.startsWith("0x") ? w.privateKey : "0x" + w.privateKey;
    if (walletBalance !== null && walletBalance < margin)
      return setError(`Balance insuficiente. Necesitas $${margin.toFixed(2)}, tienes $${walletBalance.toFixed(2)}`);

    setActivating(true);
    try {
      // Size = capital / currentPrice (ETH amount to short)
      const size = capital / s.currentPrice;
      const result = await hlPlaceOrder({
        privateKey: cleanPk,
        coin:       sym0.replace("W",""),   // ETH
        side:       "A",                    // Sell = SHORT
        size:       parseFloat(size.toFixed(4)),
        price:      null,                   // market order
        reduceOnly: false,
      });
      if (result?.status === "ok") {
        setSuccess(`✓ SHORT abierto: ${size.toFixed(4)} ${sym0} @ ~$${s.currentPrice.toFixed(2)}`);
        // Save protection config
        const protections = JSON.parse(localStorage.getItem("hl_protections") || "[]");
        protections.push({
          poolId: pos.tokenId, walletId: w.id, coin,
          size: size.toFixed(4), leverage, buffer, stopLoss: slPct,
          breakeven, tp1Pct, tp1Close, tp2Pct, tp2Close,
          noProtectReentry, openedAt: Date.now(),
          openPrice: s.currentPrice,
        });
        localStorage.setItem("hl_protections", JSON.stringify(protections));
      } else {
        setError(JSON.stringify(result?.response || result));
      }
    } catch (e) {
      setError(e.message || "Error al activar protección");
    }
    setActivating(false);
  };

  const bufferOptions = [
    { label: "Sin", value: 0 },
    { label: "+20%", value: 20 },
    { label: "+40%", value: 40 },
    { label: "+60%", value: 60 },
    { label: "+80%", value: 80 },
    { label: "+100%", value: 100 },
  ];

  const S = {
    overlay: { position:"fixed",inset:0,background:"rgba(0,0,0,0.75)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center",padding:16 },
    modal:   { background:"#070d14",border:"1px solid #1a3a5e",width:"100%",maxWidth:480,maxHeight:"90vh",overflowY:"auto",display:"flex",flexDirection:"column" },
    header:  { padding:"16px 20px",borderBottom:"1px solid #0e2435",display:"flex",justifyContent:"space-between",alignItems:"flex-start" },
    title:   { fontSize:16,fontWeight:700,color:"#c8e6f0",display:"flex",alignItems:"center",gap:8 },
    sub:     { fontSize:12,color:"#4a7a96",marginTop:4 },
    body:    { padding:"16px 20px",display:"flex",flexDirection:"column",gap:16 },
    label:   { fontSize:11,color:"#4a7a96",letterSpacing:"0.8px",textTransform:"uppercase",marginBottom:6,display:"flex",alignItems:"center",gap:6 },
    select:  { width:"100%",background:"#0a1520",border:"1px solid #1a3a5e",color:"#c8e6f0",padding:"8px 12px",fontSize:13,fontFamily:"Outfit,sans-serif",outline:"none" },
    input:   { width:"100%",background:"#0a1520",border:"1px solid #1a3a5e",color:"#c8e6f0",padding:"8px 12px",fontSize:14,fontFamily:"Outfit,sans-serif",outline:"none",boxSizing:"border-box" },
    row:     { display:"flex",justifyContent:"space-between",alignItems:"center" },
    val:     { fontSize:16,fontWeight:700,color:"#ffb347" },
    footer:  { padding:"14px 20px",borderTop:"1px solid #0e2435",display:"flex",gap:10 },
  };

  return (
    <div style={S.overlay} onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={S.modal}>

        {/* Header */}
        <div style={S.header}>
          <div>
            <div style={S.title}>🛡 Configurar Protección</div>
            <div style={S.sub}>
              {sym0}/{pos.token1Symbol} · Rango {s.priceLower?.toLocaleString("en-US",{minimumFractionDigits:2})} – {s.priceUpper?.toLocaleString("en-US",{minimumFractionDigits:2})}
            </div>
          </div>
          <button onClick={onClose} style={{ background:"none",border:"none",color:"#4a7a96",fontSize:18,cursor:"pointer",lineHeight:1 }}>✕</button>
        </div>

        <div style={S.body}>

          {/* OOR Warning */}
          {isOor && (
            <div style={{ background:"#1a0e00",border:"1px solid #5a3a00",padding:"12px 14px",fontSize:12,color:"#ffb347",lineHeight:1.6 }}>
              <div style={{ fontWeight:700,marginBottom:6 }}>⚠ Pool fuera de rango — lee esto antes de activar</div>
              <div>Tu posición es <strong>100% {sym0}</strong>. El SHORT se abrirá <strong>inmediatamente</strong> al precio actual (~{s.currentPrice?.toFixed(2)}).</div>
              <div style={{marginTop:6}}>El <strong>Stop Loss</strong> está pre-configurado a <strong>{stopLoss}%</strong> = precio del borde inferior de tu rango ({s.priceLower?.toFixed(2)}). Si {sym0} sube hasta ahí, el pool vuelve a rango y el SHORT se cierra.</div>
              <div style={{marginTop:6,color:"#ff9944"}}>Si pones un SL menor que {Math.abs(distToRange).toFixed(1)}%, cualquier rebote normal cerrará el SHORT con pérdida.</div>
            </div>
          )}

          {/* Wallet */}
          <div>
            <div style={S.label}>🔑 Wallet</div>
            {hlWallets.length === 0 ? (
              <div style={{ color:"#ff4f6e",fontSize:12 }}>No hay wallets configuradas. Ve a la pestaña Wallets.</div>
            ) : (
              <>
                <select style={S.select} value={selectedWallet} onChange={e => setSelectedWallet(e.target.value)}>
                  {hlWallets.map(w => (
                    <option key={w.id} value={w.id}>{w.label} ({w.address?.slice(0,8)}...)</option>
                  ))}
                </select>
                {walletBalance !== null && (
                  <div style={{ fontSize:12,color:"#00ff88",marginTop:4 }}>Balance: ${walletBalance.toFixed(2)}</div>
                )}
              </>
            )}
          </div>

          {/* Perp */}
          <div>
            <div style={S.label}>📊 Perp (SHORT)</div>
            <div style={{ background:"#0a1520",border:"1px solid #1a3a5e",padding:"8px 12px",fontSize:14,fontWeight:700,color:"#c8e6f0" }}>{coin}</div>
          </div>

          {/* Capital + Leverage */}
          <div>
            <div style={{ ...S.row, marginBottom:8 }}>
              <div style={S.label}>⚡ Capital por Operación</div>
              <div style={S.val}>${capital.toFixed(2)}</div>
            </div>
            <div style={{ ...S.row, marginBottom:6, fontSize:12, color:"#4a7a96" }}>
              <span>Leverage (Isolated)</span>
              <span style={{ color:"#ffb347",fontWeight:700 }}>{leverage}x</span>
            </div>
            <input type="range" min={1} max={50} value={leverage}
              onChange={e => setLeverage(Number(e.target.value))}
              style={{ width:"100%",accentColor:"#ffb347" }} />
            <div style={{ ...S.row,fontSize:10,color:"#2a5a72" }}><span>1x</span><span>50x max (HL)</span></div>

            {/* Margin status */}
            {walletBalance !== null && (
              <div style={{
                background: canActivate ? "#001a0e" : "#1a0810",
                border: `1px solid ${canActivate ? "#003a22" : "#5a1a28"}`,
                padding:"10px 12px", marginTop:10, fontSize:12,
                color: canActivate ? "#00ff88" : "#ff6b88", lineHeight:1.6,
              }}>
                <div style={{display:"flex",justifyContent:"space-between"}}>
                  <span>Margen requerido:</span>
                  <span style={{fontWeight:700}}>${margin.toFixed(2)}</span>
                </div>
                <div style={{display:"flex",justifyContent:"space-between"}}>
                  <span>Balance wallet:</span>
                  <span>${walletBalance.toFixed(2)}</span>
                </div>
                {canActivate ? (
                  <div style={{color:"#00ff88",marginTop:4}}>✓ Balance suficiente</div>
                ) : (
                  <>
                    <div style={{display:"flex",justifyContent:"space-between",color:"#ff4f6e"}}>
                      <span>Faltan:</span>
                      <span>${(margin - walletBalance).toFixed(2)}</span>
                    </div>
                    <div style={{marginTop:8,display:"flex",gap:8,flexWrap:"wrap"}}>
                      <button onClick={autoOptimize} style={{
                        flex:1,padding:"5px 10px",background:"#0a1520",border:"1px solid #ffb347",
                        color:"#ffb347",fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:"Outfit,sans-serif",
                      }}>⚡ Auto-optimizar config</button>
                      <a href="https://app.hyperliquid.xyz/portfolio" target="_blank" rel="noreferrer" style={{
                        flex:1,padding:"5px 10px",background:"#0a1520",border:"1px solid #4a7aff",
                        color:"#4a7aff",fontSize:11,fontWeight:700,textDecoration:"none",
                        display:"flex",alignItems:"center",justifyContent:"center",
                      }}>💳 Depositar en HL</a>
                    </div>
                    <div style={{fontSize:10,color:"#2a5a72",marginTop:4}}>
                      Necesitas depositar ${(margin - walletBalance).toFixed(2)} más en Hyperliquid, o usa Auto-optimizar.
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Buffer */}
          <div>
            <div style={S.label}>🛡 Buffer de Capital</div>
            <div style={{ display:"flex",gap:6,flexWrap:"wrap" }}>
              {bufferOptions.map(opt => (
                <button key={opt.value} onClick={() => setBuffer(opt.value)} style={{
                  padding:"5px 12px",fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"Outfit,sans-serif",
                  background: buffer === opt.value ? "transparent" : "transparent",
                  border: `1px solid ${buffer === opt.value ? "#ffb347" : "#1a3a5e"}`,
                  color: buffer === opt.value ? "#ffb347" : "#4a7a96",
                }}>{opt.label}</button>
              ))}
            </div>
            <div style={{ fontSize:11,color:"#ffb347",marginTop:6 }}>
              Posición efectiva: ${capital.toFixed(0)} (pool ${poolValue.toFixed(0)} + {buffer}%)
            </div>
          </div>

          {/* Stop Loss */}
          <div>
            <div style={{...S.label,justifyContent:"space-between"}}>
              <span>🔴 Stop Loss Fijo (%)</span>
              {slTooTight && (
                <button onClick={autoFixSl} style={{
                  fontSize:10,padding:"2px 8px",background:"transparent",
                  border:"1px solid #ffb347",color:"#ffb347",cursor:"pointer",fontFamily:"Outfit,sans-serif",
                }}>⚡ Auto-corregir</button>
              )}
            </div>
            <input style={{ ...S.input, border:`1px solid ${slTooTight?"#ff4f6e":"#1a3a5e"}` }}
              value={stopLoss} onChange={e => setStopLoss(e.target.value)} placeholder="3.0" />
            <div style={{ fontSize:11,color:"#4a7a96",marginTop:4 }}>
              Cierra el short si el precio sube este % desde la entrada
              {distToRange !== 0 && <span style={{color:"#4a7aff"}}> · Distancia al rango: {Math.abs(distToRange).toFixed(1)}%</span>}
            </div>
            {slTooTight && (
              <div style={{ background:"#1a0810",border:"1px solid #5a1a28",padding:"10px 12px",marginTop:8,fontSize:12,color:"#ff6b88",lineHeight:1.5 }}>
                SL de {stopLoss}% es menor que la distancia al rango ({Math.abs(distToRange).toFixed(2)}%). Usa <strong>Auto-corregir</strong> para ajustarlo automáticamente a {(Math.abs(distToRange)*1.2).toFixed(1)}%.
              </div>
            )}
          </div>

          {/* Breakeven */}
          <div>
            <div style={{ ...S.row,marginBottom:6 }}>
              <div style={S.label}>📈 Breakeven (% ganancia para mover SL)</div>
              <span style={{ fontSize:12,color:"#00ff88",fontWeight:700 }}>{breakeven}%</span>
            </div>
            <input type="range" min={1} max={5} step={0.5} value={breakeven}
              onChange={e => setBreakeven(Number(e.target.value))}
              style={{ width:"100%",accentColor:"#00ff88" }} />
            <div style={{ ...S.row,fontSize:10,color:"#2a5a72" }}><span>1%</span><span>5%</span></div>
          </div>

          {/* Take Profits */}
          <div>
            <div style={S.label}>🎯 Take Profits (opcional)</div>
            <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:8 }}>
              {[
                { label:"TP1 — % ganancia", val:tp1Pct, set:setTp1Pct },
                { label:"TP1 — % cierre",   val:tp1Close, set:setTp1Close },
                { label:"TP2 — % ganancia", val:tp2Pct, set:setTp2Pct },
                { label:"TP2 — % cierre",   val:tp2Close, set:setTp2Close },
              ].map((f,i) => (
                <div key={i}>
                  <div style={{ fontSize:10,color:"#4a7a96",marginBottom:3 }}>{f.label}</div>
                  <input style={S.input} value={f.val} onChange={e => f.set(e.target.value)} />
                </div>
              ))}
            </div>
            <div style={{ fontSize:11,color:"#00ff88",marginTop:6 }}>
              TPs {tp1Pct}%/{tp1Close}% · {tp2Pct}%/{tp2Close}%
            </div>
          </div>

          {/* Checkbox */}
          <label style={{ display:"flex",alignItems:"flex-start",gap:10,cursor:"pointer",fontSize:13,color:"#c8e6f0" }}>
            <input type="checkbox" checked={noProtectReentry} onChange={e => setNoProtectReentry(e.target.checked)}
              style={{ marginTop:2,accentColor:"#00e5ff",width:15,height:15 }} />
            <div>
              <div>No proteger cuando reentra al rango desde arriba</div>
              <div style={{ fontSize:11,color:"#4a7a96",marginTop:2 }}>Solo proteger por abajo.</div>
            </div>
          </label>

          {/* Feedback */}
          {error   && <div style={{ color:"#ff4f6e",fontSize:12,padding:"8px 12px",border:"1px solid #5a1a28",background:"#1a0810" }}>⚠ {error}</div>}
          {success && <div style={{ color:"#00ff88",fontSize:12,padding:"8px 12px",border:"1px solid #003a22",background:"#001a0e" }}>{success}</div>}
        </div>

        {/* Footer */}
        <div style={S.footer}>
          <button onClick={onClose} style={{ flex:1,padding:"10px 0",background:"transparent",border:"1px solid #1a3a5e",color:"#4a7a96",fontSize:13,cursor:"pointer",fontFamily:"Outfit,sans-serif" }}>
            Cancelar
          </button>
          <button onClick={handleActivate}
            disabled={activating || !!success || hlWallets.length === 0 || !canActivate || slTooTight}
            style={{
              flex:2, padding:"10px 0",
              background: success ? "#001a0e" : "transparent",
              border: `1px solid ${success ? "#003a22" : !canActivate ? "#5a1a28" : slTooTight ? "#5a3a00" : "#ffb347"}`,
              color: success ? "#00ff88" : !canActivate ? "#ff4f6e" : slTooTight ? "#ffb347" : "#ffb347",
              fontSize:13, fontWeight:700, cursor: (canActivate && !slTooTight && !success) ? "pointer" : "not-allowed",
              fontFamily:"Outfit,sans-serif",
              opacity: (activating || hlWallets.length===0) ? 0.5 : 1,
            }}>
            {success ? "✓ Protección Activa"
              : activating ? "Activando..."
              : !canActivate ? `⚠ Faltan $${(margin - (walletBalance||0)).toFixed(2)} — Deposita o Auto-optimiza`
              : slTooTight ? `⚠ Corrige el SL primero (mín. ${(Math.abs(distToRange)*1.2).toFixed(1)}%)`
              : "Activar Protección"}
          </button>
        </div>
      </div>
    </div>
  );
}

function PoolCard({ pos, onRemove, mode = "Cobertura" }) {
  const [expanded, setExpanded]             = useState(false);
  const [showProtection, setShowProtection] = useState(false);
  const [showTrading, setShowTrading]       = useState(false);
  const s = calcPoolStats(pos);
  const r = pos.revert;

  const fmtUsd  = (v, decimals = 2) => `${v >= 0 ? "+" : ""}$${Math.abs(v).toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}`;
  const fmtPct  = (v, decimals = 2) => `${v >= 0 ? "+" : ""}${parseFloat(v).toFixed(decimals)}%`;
  const fmtP    = (v) => v?.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) ?? "0.00";
  const fmtAmt  = (v, d = 4) => parseFloat(v || 0).toFixed(d);
  const sym0    = pos.token0Symbol || "T0";
  const sym1    = pos.token1Symbol || "T1";
  const poolUrl = `https://app.uniswap.org/positions/v3/${pos.chainName?.toLowerCase()}/${pos.tokenId}`;
  const revertUrl = `https://revert.finance/#/uniswap-position/arbitrum/${pos.tokenId}`;

  // Status from revert or local
  const inRange   = r ? r.in_range : pos.status?.label === "En Rango";
  const statusObj = inRange
    ? { label: "En Rango",        color: "#00ff88", bg: "#001a0e", border: "#003a22" }
    : s.currentPrice < s.priceLower
      ? { label: "Fuera (Abajo)", color: "#ff4f6e", bg: "#1a0810", border: "#5a1a28" }
      : { label: "Fuera (Arriba)",color: "#ffb347", bg: "#1a0e00", border: "#5a3a00" };

  // Check saved protection
  const savedProtection = (() => {
    try {
      const all = JSON.parse(localStorage.getItem("hl_protections") || "[]");
      return all.find(p => p.poolId === pos.tokenId) || null;
    } catch { return null; }
  })();

  const savedTrading = (() => {
    try {
      const all = JSON.parse(localStorage.getItem("hl_trading") || "[]");
      return all.find(p => p.poolId === pos.tokenId && p.status === "active") || null;
    } catch { return null; }
  })();

  return (
    <>
      {showProtection && (
        <ProtectionModal
          pos={pos} s={{ ...s, inRange }}
          onClose={() => setShowProtection(false)}
        />
      )}
      {showTrading && (
        <TradingModal
          pos={pos} s={{ ...s, inRange }}
          onClose={() => setShowTrading(false)}
        />
      )}
      <div className="pc-wrap">
      {/* ── COLLAPSED ROW ── */}
      <div className="pc-row" onClick={() => setExpanded(e => !e)}>
        <div className="pc-left">
          <span className="pc-pair">{sym0}/{sym1}</span>
          <span className="pc-status" style={{ color: statusObj.color, background: statusObj.bg, border: `1px solid ${statusObj.border}` }}>
            {statusObj.label}
          </span>
          <span className="pc-chain">{pos.chainName}</span>
          {r && <span className="pc-revert-badge">R</span>}
        </div>
        <div className="pc-stats">
          <div className="pc-stat">
            <div className="pc-stat-label">Valor LP</div>
            <div className="pc-stat-val">${fmtP(s.valueUsd)}</div>
          </div>
          <div className="pc-stat">
            <div className="pc-stat-label">Entry</div>
            <div className="pc-stat-val">{fmtP(s.entryPrice)}</div>
          </div>
          <div className="pc-stat">
            <div className="pc-stat-label">PNL</div>
            <div className={`pc-stat-val ${s.pnlUsd >= 0 ? "green" : "red"}`}>{fmtUsd(s.pnlUsd)}</div>
          </div>
          <div className="pc-stat">
            <div className="pc-stat-label">APR</div>
            <div className={`pc-stat-val ${s.aprUsd >= 0 ? "green" : "red"}`}>{s.aprUsd.toFixed(1)}%</div>
          </div>
          <div className="pc-stat">
            <div className="pc-stat-label">Fee APR</div>
            <div className="pc-stat-val green">{s.feesApr.toFixed(1)}%</div>
          </div>
          <div className="pc-stat">
            <div className="pc-stat-label">Fees</div>
            <div className="pc-stat-val green">${fmtP(s.feesValue)}</div>
          </div>
        </div>
        <div className={`pc-chevron ${expanded ? "open" : ""}`}>›</div>
      </div>

      {/* ── EXPANDED PANEL ── */}
      {expanded && (
        <div className="pc-panel">

          {/* Price + range bar */}
          <div className="pc-price-section">
            <div className="pc-current-price">{fmtP(s.currentPrice)}</div>

            {(() => {
              const pad   = 0.20;
              const span  = Math.max(s.priceUpper - s.priceLower, 1);
              const lo    = s.priceLower - span * pad;
              const hi    = s.priceUpper + span * pad;
              const total = hi - lo;
              const toP   = (v) => Math.max(1, Math.min(99, (v - lo) / total * 100));

              const loP  = toP(s.priceLower);
              const hiP  = toP(s.priceUpper);
              const curP = toP(s.currentPrice);
              const inRange = s.currentPrice >= s.priceLower && s.currentPrice <= s.priceUpper;
              const isOor = !inRange;

              return (
                <div style={{ position: "relative", marginBottom: 8 }}>

                  {/* ── ROW 1: price tag above dot ── */}
                  <div style={{ position: "relative", height: 32, marginBottom: 4 }}>
                    <div style={{
                      position: "absolute",
                      left: `${curP}%`,
                      transform: "translateX(-50%)",
                      bottom: 0,
                      background: "#070d14",
                      border: `1px solid ${isOor ? "#ff4f6e" : "#00e5ff"}`,
                      padding: "2px 8px",
                      fontSize: 12,
                      fontWeight: 700,
                      color: isOor ? "#ff4f6e" : "#00e5ff",
                      whiteSpace: "nowrap",
                      boxShadow: `0 0 10px ${isOor ? "rgba(255,79,110,0.4)" : "rgba(0,229,255,0.4)"}`,
                      zIndex: 10,
                    }}>
                      {fmtP(s.currentPrice)}
                      {/* arrow */}
                      <span style={{
                        position: "absolute", top: "100%", left: "50%",
                        transform: "translateX(-50%)",
                        borderLeft: "5px solid transparent",
                        borderRight: "5px solid transparent",
                        borderTop: `6px solid ${isOor ? "#ff4f6e" : "#00e5ff"}`,
                        display: "block", width: 0,
                      }} />
                    </div>
                  </div>

                  {/* ── ROW 2: the bar ── */}
                  <div style={{ position: "relative", height: 18 }}>
                    {/* Shell */}
                    <div style={{
                      position: "absolute", inset: 0,
                      borderRadius: 9,
                      background: "#020810",
                      border: "1px solid rgba(0,229,255,0.12)",
                      boxShadow: "inset 0 2px 6px rgba(0,0,0,0.9)",
                      overflow: "hidden",
                    }}>
                      {/* Red zone */}
                      <div style={{ position:"absolute", top:0, bottom:0, left:0, width:`${loP}%`, background:"linear-gradient(90deg,rgba(120,10,25,0.8),rgba(255,79,110,0.5))" }} />
                      {/* Green metallic zone */}
                      <div style={{
                        position:"absolute", top:0, bottom:0, left:`${loP}%`, width:`${hiP-loP}%`,
                        background:"linear-gradient(180deg,rgba(0,255,100,0.1) 0%,rgba(0,210,85,0.95) 18%,rgba(0,255,130,1) 45%,rgba(200,255,210,1) 50%,rgba(0,255,130,1) 55%,rgba(0,180,65,0.95) 82%,rgba(0,60,25,0.3) 100%)",
                        boxShadow:"inset 0 1px 0 rgba(255,255,255,0.25)",
                        overflow:"hidden",
                      }}>
                        {/* Shine sweep */}
                        <div style={{
                          position:"absolute", top:"-50%", left:"-60%", width:"35%", height:"200%",
                          background:"linear-gradient(105deg,transparent 30%,rgba(255,255,255,0.22) 50%,transparent 70%)",
                          animation:"rb-shine 3.5s ease-in-out infinite",
                        }} />
                      </div>
                      {/* Amber zone */}
                      <div style={{ position:"absolute", top:0, bottom:0, right:0, width:`${100-hiP}%`, background:"linear-gradient(90deg,rgba(255,150,30,0.3),rgba(140,60,0,0.65))" }} />
                    </div>

                    {/* Boundary lines — outside shell */}
                    {[loP, hiP].map((p, i) => (
                      <div key={i} style={{
                        position:"absolute", top:-3, bottom:-3, left:`${p}%`,
                        width:2, transform:"translateX(-50%)",
                        background:"rgba(255,255,255,0.2)", zIndex:2,
                      }} />
                    ))}

                    {/* Dot — outside shell */}
                    <div style={{
                      position:"absolute", top:"50%", left:`${curP}%`,
                      transform:"translate(-50%,-50%)", zIndex:5,
                      width:22, height:22, borderRadius:"50%",
                      background: isOor
                        ? "radial-gradient(circle at 32% 30%,#fff 0%,#ff4f6e 35%,#7a0020 80%)"
                        : "radial-gradient(circle at 32% 30%,#fff 0%,#00e5ff 35%,#006a99 80%)",
                      border:"2px solid rgba(255,255,255,0.35)",
                      animation: isOor ? "rb-glow-out 2s ease-in-out infinite" : "rb-glow-in 2s ease-in-out infinite",
                    }} />
                  </div>

                  {/* ── ROW 3: MIN MAX fixed at edges ── */}
                  <div style={{ position:"relative", height:36, marginTop:6 }}>

                    {/* MIN — always fixed at left edge */}
                    <div style={{ position:"absolute", left:0, top:0, lineHeight:1.3 }}>
                      <div style={{ fontSize:9, letterSpacing:"1.5px", textTransform:"uppercase", fontWeight:700, color:"#ff4f6e" }}>▼ MIN</div>
                      <div style={{ fontSize:13, fontWeight:700, color:"#ff6b88" }}>{fmtP(s.priceLower)}</div>
                    </div>

                    {/* MAX — always fixed at right edge */}
                    <div style={{ position:"absolute", right:0, top:0, textAlign:"right", lineHeight:1.3 }}>
                      <div style={{ fontSize:9, letterSpacing:"1.5px", textTransform:"uppercase", fontWeight:700, color:"#00ff88" }}>▲ MAX</div>
                      <div style={{ fontSize:13, fontWeight:700, color:"#00ff88" }}>{fmtP(s.priceUpper)}</div>
                    </div>
                  </div>

                </div>
              );
            })()}

            {/* Token amounts */}
            <div className="pc-amounts">
              <span>{fmtAmt(s.amount0)} {sym0}</span>
              <span>{fmtAmt(s.amount1)} {sym1}</span>
            </div>
          </div>

          {/* ── ACTION BANNER — Cobertura o Trading según mode ── */}
          {!inRange && mode === "Cobertura" && (
            <div style={{ marginBottom: 16 }}>
              {savedProtection ? (
                <div style={{ background:"#001a0e",border:"1px solid #003a22",padding:"10px 14px",fontSize:12,color:"#00ff88",display:"flex",justifyContent:"space-between",alignItems:"center" }}>
                  <span>🛡 Protección activa · SHORT {savedProtection.size} {sym0} @ ${savedProtection.openPrice?.toFixed(2)}</span>
                  <span style={{ color:"#4a7a96",fontSize:11 }}>SL {savedProtection.stopLoss}%</span>
                </div>
              ) : (
                <>
                  <div style={{ background:"#1a0e00",border:"1px solid #5a3a00",padding:"10px 14px",fontSize:12,color:"#ffb347",marginBottom:8 }}>
                    ⚠ Tu posición es 100% {sym0} — máxima exposición al precio. Recomendado configurar Cobertura SHORT.
                  </div>
                  <button onClick={() => setShowProtection(true)} style={{
                    width:"100%",padding:"12px 0",background:"transparent",border:"1px solid #ffb347",color:"#ffb347",
                    fontSize:14,fontWeight:700,cursor:"pointer",fontFamily:"Outfit,sans-serif",letterSpacing:"0.5px",
                    display:"flex",alignItems:"center",justifyContent:"center",gap:8,
                  }}>
                    🛡 Configurar Protección ({inRange ? "En Rango" : `100% expuesto a ${sym0}`})
                  </button>
                </>
              )}
            </div>
          )}

          {mode === "trading" && (
            <div style={{ marginBottom: 16 }}>
              {savedTrading ? (
                <div style={{ background:"#0a0a1a",border:"1px solid #4a1a7a",padding:"10px 14px",fontSize:12,color:"#c8a0ff",display:"flex",justifyContent:"space-between",alignItems:"center" }}>
                  <span>📈 Trading activo · {savedTrading.direction?.toUpperCase()} · {savedTrading.coin}</span>
                  <span style={{ color:"#6a4a96",fontSize:11 }}>SL {savedTrading.stopLoss}%</span>
                </div>
              ) : (
                <>
                  <div style={{ background:"#0d0a1a",border:"1px solid #3a1a6a",padding:"10px 14px",fontSize:12,color:"#9a70cc",marginBottom:8 }}>
                    📈 {inRange ? "Pool en rango — el bot entrará cuando rompa el límite." : `100% ${sym0} — oportunidad SHORT (momentum a la baja)`}
                  </div>
                  <button onClick={() => setShowTrading(true)} style={{
                    width:"100%",padding:"12px 0",background:"linear-gradient(135deg,#1a0a3a,#2a0a5a)",
                    border:"1px solid #7a40cc",color:"#c8a0ff",
                    fontSize:14,fontWeight:700,cursor:"pointer",fontFamily:"Outfit,sans-serif",letterSpacing:"0.5px",
                    display:"flex",alignItems:"center",justifyContent:"center",gap:8,
                  }}>
                    📈 Configurar Trading
                  </button>
                </>
              )}
            </div>
          )}

          {/* Resultado Total */}
          <div className="pc-section-title">Resultado Total</div>
          <div className="pc-grid4">
            <div className="pc-metric">
              <div className="pc-metric-label">PNL Total (USD)</div>
              <div className={`pc-metric-val ${s.pnlUsd >= 0 ? "green" : "red"}`}>
                {fmtUsd(s.pnlUsd)} ({fmtPct(s.pnlPct)})
              </div>
            </div>
            <div className="pc-metric">
              <div className="pc-metric-label">Invertido (neto)</div>
              <div className="pc-metric-val">${fmtP(s.netInvested)}</div>
            </div>
            <div className="pc-metric">
              <div className="pc-metric-label">Tiempo de Vida</div>
              <div className="pc-metric-val">{s.ageDays}d {s.ageHours}h</div>
            </div>
            <div className="pc-metric">
              <div className="pc-metric-label">APR Total</div>
              <div className={`pc-metric-val ${s.aprUsd >= 0 ? "green" : "red"}`}>{s.aprUsd.toFixed(1)}%</div>
            </div>
          </div>

          {/* Performance vs benchmarks */}
          <div className="pc-section-title">Performance vs Benchmark</div>
          <div className="pc-grid4">
            <div className="pc-metric">
              <div className="pc-metric-label">PNL vs HODL</div>
              <div className={`pc-metric-val ${s.pnlVsHodl >= 0 ? "green" : "red"}`}>{fmtUsd(s.pnlVsHodl)}</div>
              <div className="pc-metric-sub">APR: {s.aprVsHodl.toFixed(1)}%</div>
            </div>
            <div className="pc-metric">
              <div className="pc-metric-label">PNL vs {sym0}</div>
              <div className={`pc-metric-val ${s.pnlToken0 >= 0 ? "green" : "red"}`}>{fmtAmt(s.pnlToken0)} {sym0}</div>
            </div>
            <div className="pc-metric">
              <div className="pc-metric-label">PNL vs {sym1}</div>
              <div className={`pc-metric-val ${s.pnlToken1 >= 0 ? "green" : "red"}`}>{fmtUsd(s.pnlToken1)}</div>
            </div>
            <div className="pc-metric">
              <div className="pc-metric-label">Imperm. Loss</div>
              <div className={`pc-metric-val ${s.ilUsd >= 0 ? "green" : "red"}`}>{fmtUsd(s.ilUsd)}</div>
            </div>
          </div>

          {/* Capital */}
          <div className="pc-section-title">Capital</div>
          <div className="pc-grid4">
            <div className="pc-metric">
              <div className="pc-metric-label">PNL Capital</div>
              <div className={`pc-metric-val ${s.pnlUsd >= 0 ? "green" : "red"}`}>{fmtUsd(s.pnlUsd)} ({fmtPct(s.pnlPct)})</div>
            </div>
            <div className="pc-metric">
              <div className="pc-metric-label">Depositado</div>
              <div className="pc-metric-val">${fmtP(s.depositsValue)}</div>
              <div className="pc-metric-sub">{fmtAmt(s.totalDep1, 2)} {sym1}</div>
            </div>
            <div className="pc-metric">
              <div className="pc-metric-label">APR Capital</div>
              <div className={`pc-metric-val ${s.aprUsd >= 0 ? "green" : "red"}`}>{s.aprUsd.toFixed(1)}%</div>
            </div>
            <div className="pc-metric">
              <div className="pc-metric-label">Retirado</div>
              <div className="pc-metric-val">${fmtP(s.withdrawalsVal)}</div>
              <div className="pc-metric-sub">{fmtAmt(s.totalWit1, 2)} {sym1}</div>
            </div>
          </div>

          {/* Fees Ganadas */}
          <div className="pc-section-title">Fees Ganadas</div>
          <div className="pc-grid4">
            <div className="pc-metric">
              <div className="pc-metric-label">Total Fees (USD)</div>
              <div className="pc-metric-val green">${fmtP(s.feesValue)}</div>
              <div className="pc-metric-sub">uncollected: ${fmtP(s.uncollected0 + s.uncollected1)}</div>
            </div>
            <div className="pc-metric">
              <div className="pc-metric-label">Fees {sym0}</div>
              <div className="pc-metric-val green">{fmtAmt(s.collected0)} {sym0}</div>
              <div className="pc-metric-sub">unc: {fmtAmt(s.uncollected0)}</div>
            </div>
            <div className="pc-metric">
              <div className="pc-metric-label">Fees {sym1}</div>
              <div className="pc-metric-val green">{fmtAmt(s.collected1, 2)} {sym1}</div>
              <div className="pc-metric-sub">unc: {fmtAmt(s.uncollected1, 2)}</div>
            </div>
            <div className="pc-metric">
              <div className="pc-metric-label">APR Fees</div>
              <div className="pc-metric-val green">{s.feesApr.toFixed(1)}%</div>
            </div>
          </div>

          {/* Proyección Fees */}
          <div className="pc-section-title">Proyección Fees</div>
          <div className="pc-grid4">
            {["Diario", "Semanal", "Mensual", "Anual"].map((label, i) => {
              const mult = [1/365, 7/365, 30/365, 1][i];
              const proj = s.netInvested * (s.feesApr / 100) * mult;
              const pct  = s.feesApr * mult;
              return (
                <div key={label} className="pc-metric">
                  <div className="pc-metric-label">{label}</div>
                  <div className="pc-metric-val green">${fmtP(proj)} ({pct.toFixed(2)}%)</div>
                </div>
              );
            })}
          </div>

          {/* 24h Delta */}
          {r && (
            <>
              <div className="pc-section-title">Cambios 24h</div>
              <div className="pc-grid4">
                <div className="pc-metric">
                  <div className="pc-metric-label">PNL 24h</div>
                  <div className={`pc-metric-val ${s.delta24hPnl >= 0 ? "green" : "red"}`}>{fmtUsd(s.delta24hPnl)}</div>
                </div>
                <div className="pc-metric">
                  <div className="pc-metric-label">APR 24h</div>
                  <div className={`pc-metric-val ${s.delta24hApr >= 0 ? "green" : "red"}`}>{fmtPct(s.delta24hApr, 1)}</div>
                </div>
                <div className="pc-metric" />
                <div className="pc-metric" />
              </div>
            </>
          )}

          {/* Info */}
          <div className="pc-section-title">Info</div>
          <div className="pc-info-row">
            <span>Edad: {s.ageDays}d {s.ageHours}h</span>
            <span>NFT: #{pos.tokenId}</span>
            <span>Chain: {pos.chainName}</span>
            <span>DEX: uniswap_v3</span>
            <span>Fee: {((pos.fee || 500) / 10000).toFixed(2)}%</span>
            <span>Pool: <span className="pc-addr">{pos.poolAddress ? pos.poolAddress.slice(0,8)+"..."+pos.poolAddress.slice(-4) : "—"}</span></span>
            {r && <span style={{color:"#00ff88",fontSize:11}}>✓ Datos Revert</span>}
          </div>

          {/* Footer actions */}
          <div className="pc-actions">
            <a href={poolUrl} target="_blank" rel="noreferrer" className="pc-btn-link">🔗 Uniswap</a>
            <a href={revertUrl} target="_blank" rel="noreferrer" className="pc-btn-link">📊 Revert</a>
            <button className="pc-btn-close" onClick={() => setExpanded(false)}>Cerrar</button>
            <button className="pc-btn-remove" onClick={() => onRemove(pos.tokenId)}>🗑 Eliminar pool</button>
          </div>
        </div>
      )}
      </div>
    </>
  );
}

// ── Revert Finance API — datos completos de posición ───────────────
const REVERT_API = "https://api.revert.finance/v1/positions/account";

async function fetchRevertPositions(walletAddress) {
  try {
    const url = `${REVERT_API}/${walletAddress.toLowerCase()}?limit=100&active=true&with-v4=true`;
    const res  = await fetch(url);
    if (!res.ok) return {};
    const data = await res.json();
    // Index by nft_id for fast lookup
    const map = {};
    for (const pos of (data.data || [])) {
      map[String(pos.nft_id)] = pos;
    }
    return map;
  } catch { return {}; }
}

// ── Extraer precios desde datos de Revert (sin llamada extra) ─────
// Revert ya incluye en cada posición: tokens[address].price (USD)
// Esta función construye el mapa de precios a partir del revertMap
function buildPriceMapFromRevert(revertMap) {
  const map = {};
  for (const pos of Object.values(revertMap)) {
    const tokens = pos.tokens || {};
    for (const t of Object.values(tokens)) {
      const sym = (t.symbol || "").toUpperCase().replace("WETH", "ETH");
      const price = parseFloat(t.price ?? "0");
      if (sym && price > 0) map[sym] = price;
    }
  }
  return map;
}

// Fallback: CoinGecko API pública sin auth si no hay datos Revert
async function fetchPricesFallback() {
  try {
    const res  = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=ethereum,usd-coin,tether&vs_currencies=usd"
    );
    const data = await res.json();
    return {
      ETH:  data?.ethereum?.usd  ?? 0,
      USDC: data?.["usd-coin"]?.usd ?? 1,
      USDT: data?.tether?.usd    ?? 1,
    };
  } catch { return {}; }
}


function CoberturaTab() {
  const { user } = useAuth()
  const { pools, setPools, loading: poolsLoading, addPool, removePool } = usePoolsSync(user?.id)

  const [scanOpen, setScanOpen]       = useState(false);
  const [lastRefresh, setLastRefresh] = useState(null);
  const [revertLoading, setRevertLoading] = useState(false);
  const poolsRef = useRef([]);

  const [activity, setActivity] = useState(() => {
    try { return JSON.parse(localStorage.getItem("liquidity_engine_activity") || "[]"); }
    catch { return []; }
  });

  useEffect(() => {
    poolsRef.current = pools;
  }, [pools]);

  useEffect(() => {
    try { localStorage.setItem("liquidity_engine_activity", JSON.stringify(activity)); } catch {}
  }, [activity]);

  // ── Master refresh: Revert + live prices every 10s ────────────────
  const refreshAll = async () => {
    setRevertLoading(true);
    const current = poolsRef.current;

    // 1. Unique wallet addresses
    const wallets = [...new Set(current.map(p => p.og_owner || p.walletAddress).filter(Boolean))];

    // 2. Revert data for all wallets
    const revertMaps = await Promise.all(wallets.map(w => fetchRevertPositions(w)));
    const revertAll  = Object.assign({}, ...revertMaps);

    // 3. Build price map from Revert data (no external auth needed)
    const map = Object.keys(revertAll).length > 0
      ? buildPriceMapFromRevert(revertAll)
      : await fetchPricesFallback();   // only if Revert returned nothing

    // 4. Enrich pools
    setPools(prev => prev.map(pos => {
      const r         = revertAll[String(pos.tokenId)] ?? pos.revert ?? null;
      const sym0      = (pos.token0Symbol || "").toUpperCase().replace("WETH","ETH");
      const sym1      = (pos.token1Symbol || "").toUpperCase();
      const isStable1 = sym1.includes("USD") || ["USDC","USDT","DAI"].includes(sym1);
      const livePrice = r ? parseFloat(r.pool_price ?? pos.currentPrice) : (isStable1 ? (map[sym0] ?? pos.currentPrice) : pos.currentPrice);
      const inRange   = r ? r.in_range : (livePrice >= pos.priceLower && livePrice <= pos.priceUpper);
      let newStatus;
      if (inRange)                         newStatus = { label: "En Rango",        color: "#00ff88", bg: "#001a0e", border: "#003a22" };
      else if (livePrice < pos.priceLower) newStatus = { label: "Fuera (Abajo)",  color: "#ff4f6e", bg: "#1a0810", border: "#5a1a28" };
      else                                 newStatus = { label: "Fuera (Arriba)", color: "#ffb347", bg: "#1a0e00", border: "#5a3a00" };
      const amt0     = r ? parseFloat(r.current_amount0 ?? pos.amount0 ?? "0") : parseFloat(pos.amount0 ?? "0");
      const amt1     = r ? parseFloat(r.current_amount1 ?? pos.amount1 ?? "0") : parseFloat(pos.amount1 ?? "0");
      const valueUsd = r ? parseFloat(r.underlying_value) : (amt0 * (map[sym0] ?? livePrice ?? 0) + amt1 * (isStable1 ? 1 : (map[sym1] ?? 0)));
      return { ...pos, currentPrice: livePrice, status: newStatus, valueUsd, amount0: String(amt0), amount1: String(amt1), revert: r, og_owner: pos.og_owner ?? pos.walletAddress };
    }));

    setLastRefresh(new Date());
    setRevertLoading(false);
  };

  useEffect(() => {
    if (poolsRef.current.length > 0) refreshAll();
    const interval = setInterval(refreshAll, 10000);
    return () => clearInterval(interval);
  }, []); // eslint-disable-line

  // ── Import handler ─────────────────────────────────────────────────
  const handleImport = async (imported) => {
    const now = Date.now();
    const enriched = imported.map(pos => {
      const sym1      = (pos.token1Symbol || "").toUpperCase();
      const isStable1 = sym1.includes("USD") || ["USDC","USDT","DAI"].includes(sym1);
      const amt0      = parseFloat(pos.amount0 || "0");
      const amt1      = parseFloat(pos.amount1 || "0");
      const valueUsd  = isStable1
        ? amt0 * (pos.currentPrice ?? 0) + amt1
        : 0;

      return {
        ...pos,
        valueUsd,
        valueAtCreation:    valueUsd > 0 ? valueUsd : 0,
        priceAtCreation:    pos.currentPrice ?? 0,
        createdAtTimestamp: pos.createdAtTimestamp ?? now,
        importedAt:         now,
        walletAddress:      pos.walletAddress ?? "",
        og_owner:           pos.walletAddress ?? "",
        revert:             null,
      };
    });

    // Save each new pool to Supabase
    const existing = new Set(pools.map(p => p.tokenId));
    const toAdd    = enriched.filter(p => !existing.has(p.tokenId));

    for (const pool of toAdd) {
      try {
        await addPool(pool);
      } catch (e) {
        if (!e.message?.includes('ya está importado')) {
          console.warn('Error saving pool:', e.message);
        }
      }
    }

    setActivity(prev => [
      ...toAdd.map(p => ({
        id:    p.tokenId,
        pair:  `${p.token0Symbol}/${p.token1Symbol}`,
        chain: p.chainName,
        time:  new Date().toLocaleString("es-CO", { day:"2-digit", month:"short", hour:"2-digit", minute:"2-digit" }),
      })),
      ...prev,
    ]);
  };

  const handleRemove = async (tokenId) => {
    await removePool(tokenId);
    setActivity(prev => [
      { id: tokenId, pair: "Pool eliminada", chain: "", time: new Date().toLocaleString("es-CO", { day:"2-digit", month:"short", hour:"2-digit", minute:"2-digit" }) },
      ...prev,
    ]);
  };

  // ── Derived stats — prefer Revert data ───────────────────────────
  const inRange    = pools.filter(p => (p.revert ? p.revert.in_range : p.status?.label === "En Rango")).length;
  const totalValue = pools.reduce((acc, p) => {
    const v = p.revert ? parseFloat(p.revert.underlying_value ?? "0") : (p.valueUsd || 0);
    return acc + v;
  }, 0);
  const totalPnl = pools.reduce((acc, p) => {
    if (p.revert) return acc + parseFloat(p.revert.performance?.usd?.pnl ?? "0");
    const v = p.valueUsd || 0;
    const inv = p.valueAtCreation || 0;
    return acc + (inv > 0 ? v - inv : 0);
  }, 0);

  const fmtUsdStat = (v) => `${v >= 0 ? "+" : "-"}$${Math.abs(v).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  return (
    <>
      <ScanModal open={scanOpen} onClose={() => setScanOpen(false)} onImport={handleImport} />

      <div className="stats-grid">
        {[
          { label: "Pools LP",         value: pools.length.toString() },
          { label: "Valor LP",         value: `$${totalValue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` },
          { label: "Pos. Abiertas",    value: inRange.toString() },
          { label: "PNL No Realizado", value: fmtUsdStat(totalPnl), danger: totalPnl < 0, success: totalPnl >= 0 },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <div className="stat-label">{s.label}</div>
            <div className={`stat-value ${s.danger ? "danger" : s.success ? "success" : ""}`}>{s.value}</div>
          </div>
        ))}
      </div>

      <div className="section-header">
        <div className="section-title">Pools LP Monitoreados</div>
        {pools.length > 0 && <span className="count-badge">{pools.length}</span>}
        <div className="section-actions">
          {lastRefresh && (
            <span style={{ fontSize: 11, color: "#2a5a72", alignSelf: "center" }}>
              ↻ {lastRefresh.toLocaleTimeString("es-CO", { hour:"2-digit", minute:"2-digit", second:"2-digit" })}
            </span>
          )}
          <button className="action-btn" onClick={refreshAll}>
            {revertLoading ? "⟳ Actualizando..." : "↻ Actualizar"}
          </button>
          <button className="action-btn highlighted" onClick={() => setScanOpen(true)}>🔍 Escanear Wallet</button>
          <button className="action-btn"># Token ID</button>
        </div>
      </div>

      {pools.length === 0 ? (
        <div className="empty-state">
          <div className="empty-title">No tienes pools LP monitoreados.</div>
          <div className="empty-sub">Escanea tu wallet LP para detectar posiciones de Uniswap V3 automáticamente.</div>
        </div>
      ) : (
        pools.map(pos => (
          <PoolCard
            key={pos.tokenId}
            pos={pos}
            onRemove={handleRemove}
            mode="Cobertura"
          />
        ))
      )}

      <div className="section-header" style={{ marginTop: "24px" }}>
        <div className="section-title">Historial de Actividad</div>
        {activity.length > 0 && <span className="count-badge">{activity.length}</span>}
      </div>

      {activity.length === 0 ? (
        <div className="empty-state">
          <div className="empty-title">Sin actividad reciente.</div>
          <div className="empty-sub">Las pools importadas aparecerán aquí.</div>
        </div>
      ) : (
        activity.map((item, i) => (
          <div key={i} className="activity-card">
            <div className="activity-icon">◈</div>
            <div>
              <div className="activity-title">Pool importada</div>
              <div className="activity-sub">{item.pair} · {item.chain}</div>
            </div>
            <div className="activity-time">{item.time}</div>
          </div>
        ))
      )}
    </>
  );
}

// ════════════════════════════════════════════════════════════════════
// COMING SOON
// ════════════════════════════════════════════════════════════════════
// ════════════════════════════════════════════════════════════════════
// HYPERLIQUID API TEST MODAL
// Prueba órdenes reales ANTES de conectar a pools
// ════════════════════════════════════════════════════════════════════
function HLTestModal({ onClose }) {
  const hlWallets = (() => {
    try { return JSON.parse(localStorage.getItem("hl_wallets") || "[]"); } catch { return []; }
  })();

  const [selectedWallet, setSelectedWallet] = useState(hlWallets[0]?.id || "");
  const [coin, setCoin]         = useState("ETH");
  const [side, setSide]         = useState("B");      // B=Buy/Long, A=Sell/Short
  const [orderType, setOrderType] = useState("market");
  const [size, setSize]         = useState("0.001");  // ETH amount
  const [price, setPrice]       = useState("");       // only for limit
  const [leverage, setLeverage] = useState(2);
  const [logs, setLogs]         = useState([]);
  const [loading, setLoading]   = useState(false);
  const [mids, setMids]         = useState({});

  const log = (msg, type = "info") => {
    const colors = { info:"#7ab8d4", success:"#00ff88", error:"#ff4f6e", warn:"#ffb347", data:"#c8a0ff" };
    setLogs(prev => [...prev, { msg, color: colors[type] || "#7ab8d4", ts: new Date().toLocaleTimeString("es-CO") }]);
  };

  // Load live prices on open
  useEffect(() => {
    log("Cargando precios live de Hyperliquid...", "info");
    hlGetAllMids()
      .then(m => {
        setMids(m);
        log(`✓ Precios cargados — ETH: $${parseFloat(m.ETH||0).toFixed(2)} | BTC: $${parseFloat(m.BTC||0).toFixed(2)}`, "success");
      })
      .catch(() => log("✗ Error cargando precios", "error"));
  }, []);

  const currentPrice = parseFloat(mids[coin] || 0);
  const estimatedCost = currentPrice * parseFloat(size || 0);

  const runTest = async (testFn, label) => {
    setLoading(true);
    log(`▶ ${label}...`, "info");
    try {
      const result = await testFn();
      log(`✓ Resultado: ${JSON.stringify(result).slice(0, 200)}`, "success");
    } catch(e) {
      log(`✗ Error: ${e.message}`, "error");
    }
    setLoading(false);
  };

  // ── 1. Check account state ──────────────────────────────────────
  const testAccount = async () => {
    const w = hlWallets.find(w => w.id === selectedWallet);
    if (!w) { log("✗ Selecciona una wallet", "error"); return; }

    // Use main account address for balance (not agent address)
    const mainAddr  = w.address;
    const agentAddr = w.agentAddress || "(no derivada)";

    log(`📊 Cuenta Principal: ${mainAddr}`, "info");
    log(`🔑 Agent Wallet: ${agentAddr}`, "info");

    setLoading(true);
    log(`▶ Consultando balance de cuenta principal...`, "info");
    try {
      const data = await hlGetPositions(mainAddr);
      log(`  Balance perp USDC: $${data.perpEquity?.toFixed(2) ?? "0.00"}`, "data");
      log(`  Balance spot USDC: $${data.spotTotal?.toFixed(2) ?? "0.00"}`, "data");
      log(`  Balance total: $${data.balance?.toFixed(2) ?? "0.00"}`, "data");
      log(`  Posiciones abiertas: ${data.positions?.length || 0}`, "data");
      data.positions?.forEach(p =>
        log(`  · ${p.side} ${p.coin} size:${p.size} entry:$${p.entryPrice} pnl:$${parseFloat(p.pnl||0).toFixed(2)}`, "data")
      );
      if (data.spotBalances?.length) {
        log(`  Spot balances:`, "data");
        data.spotBalances.forEach(b => log(`    · ${b.coin}: ${b.total}`, "data"));
      }
      log(`✓ Consulta exitosa`, "success");
    } catch(e) {
      log(`✗ Error: ${e.message}`, "error");
    }
    setLoading(false);
  };

  // ── 2. Check open orders ────────────────────────────────────────
  const testOpenOrders = async () => {
    const w = hlWallets.find(w => w.id === selectedWallet);
    if (!w) { log("✗ Selecciona una wallet", "error"); return; }
    setLoading(true);
    log(`▶ Consultando órdenes de ${w.address}...`, "info");
    try {
      const orders = await hlGetOpenOrders(w.address);
      log(`  Órdenes abiertas: ${orders?.length || 0}`, "data");
      orders?.slice(0,10).forEach(o =>
        log(`  · ${o.side} ${o.coin} sz:${o.sz} @ $${o.limitPx} oid:${o.oid}`, "data")
      );
      log(`✓ Consulta exitosa`, "success");
    } catch(e) { log(`✗ Error: ${e.message}`, "error"); }
    setLoading(false);
  };

  // ── 3. Place order ──────────────────────────────────────────────
  const testPlaceOrder = async () => {
    const w = hlWallets.find(w => w.id === selectedWallet);
    if (!w) { log("✗ Selecciona una wallet", "error"); return; }
    if (!w.privateKey) { log("✗ Wallet sin private key — vuelve a añadirla en la pestaña Wallets", "error"); return; }
    if (!window.ethers) { log("✗ ethers.js no está cargado — revisa index.html", "error"); return; }
    if (parseFloat(size) <= 0) { log("✗ Size debe ser mayor a 0", "error"); return; }

    const sideLabel = side === "B" ? "BUY (LONG)" : "SELL (SHORT)";
    log(`⚠ Abriendo orden REAL: ${sideLabel} ${size} ${coin}-PERP @ ${orderType === "market" ? "MARKET" : "$" + price}`, "warn");
    log(`  Valor estimado: $${estimatedCost.toFixed(2)} · Leverage: ${leverage}x`, "warn");
    log(`  Wallet: ${w.address}`, "info");
    log(`  ethers.js: v${window.ethers?.version || "cargado"}`, "info");
    log(`  msgpack: ✓ inline (sin CDN externo)`, "success");

    // Verify derived agent address matches what HL has authorized
    if (window.ethers) {
      try {
        const derived = new window.ethers.Wallet(w.privateKey).address;
        const stored  = w.agentAddress;
        const match   = stored && derived.toLowerCase() === stored.toLowerCase();
        log(`  Agent derivado: ${derived}`, match ? "success" : "warn");
        log(`  Agent guardado: ${stored || "(no guardado)"}`, match ? "success" : "warn");
        if (!match && stored) {
          log(`  ⚠ MISMATCH — el agent derivado no coincide con el guardado`, "error");
          log(`  Asegúrate de que la private key corresponde a tu API Wallet en HL`, "error");
        } else if (match) {
          log(`  ✓ Agent address verificado correctamente`, "success");
        }
      } catch(e) {
        log(`  ⚠ No se pudo verificar agent: ${e.message}`, "warn");
      }
    }

    setLoading(true);
    log(`▶ Obteniendo meta y precio...`, "info");
    try {
      const result = await hlPlaceOrder({
        privateKey: w.privateKey,
        coin,
        side,
        size: parseFloat(size),
        price: orderType === "limit" ? parseFloat(price) : null,
        reduceOnly: false,
      });

      log(`  Respuesta completa: ${JSON.stringify(result)}`, "data");

      if (result?.status === "ok") {
        log(`✓ ¡ORDEN ENVIADA EXITOSAMENTE!`, "success");
        const filled = result?.response?.data?.statuses?.[0];
        if (filled?.filled) {
          log(`  Filled: ${filled.filled.totalSz} @ $${filled.filled.avgPx}`, "success");
        } else if (filled?.resting) {
          log(`  Orden en libro: oid ${filled.resting.oid}`, "success");
        }
      } else if (result?.status === "err") {
        log(`✗ Error de HL: ${result.response}`, "error");
      } else {
        log(`⚠ Respuesta inesperada: ${JSON.stringify(result)}`, "warn");
      }
    } catch(e) {
      log(`✗ Error: ${e.message}`, "error");
      if (e.message.includes("HL response:")) {
        log(`  Tip: Esto puede ser un error de firma o de permisos de la API Key`, "warn");
        log(`  Verifica que la API Key tiene permisos de trading en Hyperliquid`, "warn");
      }
    }
    setLoading(false);
  };

  // ── 4. Cancel all orders ────────────────────────────────────────
  const testCancelAll = async () => {
    const w = hlWallets.find(w => w.id === selectedWallet);
    if (!w?.privateKey) { log("✗ Wallet sin private key", "error"); return; }
    if (!window.ethers) { log("✗ ethers.js no cargado", "error"); return; }
    await runTest(async () => {
      const orders = await hlGetOpenOrders(w.address);
      if (!orders?.length) { log("  No hay órdenes abiertas que cancelar", "warn"); return { cancelled: 0 }; }
      const meta  = await hlGetMeta();
      let cancelled = 0;
      for (const o of orders) {
        const asset = meta?.universe?.findIndex(a => a.name === o.coin);
        if (asset >= 0) {
          await hlSignAndSend({ type:"cancel", cancels:[{ a:asset, o:o.oid }] }, w.privateKey);
          log(`  ✓ Cancelada: ${o.side} ${o.coin} @ $${o.limitPx}`, "success");
          cancelled++;
        }
      }
      return { cancelled };
    }, `Cancelando todas las órdenes (${coin})`);
  };

  const COINS = ["ETH","BTC","SOL","ARB","AVAX","MATIC","LINK"];

  return (
    <div style={{ position:"fixed",inset:0,background:"rgba(5,10,15,0.88)",zIndex:500,display:"flex",alignItems:"center",justifyContent:"center",padding:16,backdropFilter:"blur(10px)" }}
      onClick={e => e.target===e.currentTarget && onClose()}>
      <div style={{ background:"#070d14",border:"1px solid #00e5ff",width:"100%",maxWidth:720,maxHeight:"92vh",display:"flex",flexDirection:"column" }}>

        {/* Header */}
        <div style={{ padding:"18px 24px",borderBottom:"1px solid #0e2435",display:"flex",justifyContent:"space-between",alignItems:"center" }}>
          <div>
            <div style={{ fontSize:16,fontWeight:700,color:"#00e5ff",display:"flex",alignItems:"center",gap:10 }}>
              <span style={{ background:"#ffb347",color:"#050a0f",fontSize:10,fontWeight:800,padding:"2px 8px",letterSpacing:1 }}>BETA TEST</span>
              Hyperliquid API — Test de Órdenes
            </div>
            <div style={{ fontSize:12,color:"#4a7a96",marginTop:3 }}>
              Prueba órdenes reales antes de conectar a pools · Usa tamaños mínimos
            </div>
          </div>
          <button onClick={onClose} style={{ background:"none",border:"none",color:"#2a5a72",fontSize:20,cursor:"pointer" }}>✕</button>
        </div>

        <div style={{ display:"flex",flex:1,overflow:"hidden" }}>

          {/* LEFT — Controls */}
          <div style={{ width:300,flexShrink:0,padding:"18px 20px",borderRight:"1px solid #0e2435",display:"flex",flexDirection:"column",gap:14,overflowY:"auto" }}>

            {/* Wallet */}
            <div>
              <div style={{ fontSize:10,color:"#4a7a96",letterSpacing:1,textTransform:"uppercase",marginBottom:6 }}>Wallet</div>
              {hlWallets.length === 0
                ? <div style={{ fontSize:12,color:"#ff4f6e" }}>No hay wallets — ve a la pestaña Wallets</div>
                : <select value={selectedWallet} onChange={e => setSelectedWallet(e.target.value)}
                    style={{ width:"100%",background:"#0a1520",border:"1px solid #1a3a5e",color:"#c8e6f0",padding:"8px 10px",fontFamily:"Outfit,sans-serif",fontSize:13,outline:"none" }}>
                    {hlWallets.map(w => <option key={w.id} value={w.id}>{w.label} ({w.address?.slice(0,8)}...)</option>)}
                  </select>
              }
            </div>

            {/* Coin */}
            <div>
              <div style={{ fontSize:10,color:"#4a7a96",letterSpacing:1,textTransform:"uppercase",marginBottom:6 }}>
                Activo · Precio live: <span style={{ color:"#00e5ff" }}>${currentPrice.toFixed(2)}</span>
              </div>
              <div style={{ display:"flex",flexWrap:"wrap",gap:6 }}>
                {COINS.map(c => (
                  <button key={c} onClick={() => setCoin(c)} style={{
                    padding:"4px 10px",background:"transparent",cursor:"pointer",fontFamily:"Outfit,sans-serif",fontSize:12,fontWeight:600,
                    border:`1px solid ${coin===c?"#00e5ff":"#1a3a5e"}`,color:coin===c?"#00e5ff":"#4a7a96",
                  }}>{c}</button>
                ))}
              </div>
            </div>

            {/* Side */}
            <div>
              <div style={{ fontSize:10,color:"#4a7a96",letterSpacing:1,textTransform:"uppercase",marginBottom:6 }}>Dirección</div>
              <div style={{ display:"flex",gap:8 }}>
                {[["B","🟢 BUY / LONG"],["A","🔴 SELL / SHORT"]].map(([v,l]) => (
                  <button key={v} onClick={() => setSide(v)} style={{
                    flex:1,padding:"8px 0",background:"transparent",cursor:"pointer",fontFamily:"Outfit,sans-serif",fontSize:12,fontWeight:700,
                    border:`1px solid ${side===v?(v==="B"?"#00ff88":"#ff4f6e"):"#1a3a5e"}`,
                    color:side===v?(v==="B"?"#00ff88":"#ff4f6e"):"#4a7a96",
                  }}>{l}</button>
                ))}
              </div>
            </div>

            {/* Order type */}
            <div>
              <div style={{ fontSize:10,color:"#4a7a96",letterSpacing:1,textTransform:"uppercase",marginBottom:6 }}>Tipo de Orden</div>
              <div style={{ display:"flex",gap:8 }}>
                {[["market","Market"],["limit","Limit"]].map(([v,l]) => (
                  <button key={v} onClick={() => setOrderType(v)} style={{
                    flex:1,padding:"7px 0",background:"transparent",cursor:"pointer",fontFamily:"Outfit,sans-serif",fontSize:12,fontWeight:600,
                    border:`1px solid ${orderType===v?"#00e5ff":"#1a3a5e"}`,color:orderType===v?"#00e5ff":"#4a7a96",
                  }}>{l}</button>
                ))}
              </div>
            </div>

            {/* Size */}
            <div>
              <div style={{ fontSize:10,color:"#4a7a96",letterSpacing:1,textTransform:"uppercase",marginBottom:6 }}>
                Size ({coin}) · ~${estimatedCost.toFixed(2)} USD
              </div>
              <input value={size} onChange={e => setSize(e.target.value)} type="number" step="0.001" min="0.001"
                style={{ width:"100%",background:"#0a1520",border:"1px solid #1a3a5e",color:"#c8e6f0",padding:"9px 12px",fontFamily:"Outfit,sans-serif",fontSize:14,outline:"none" }}
                placeholder="0.001" />
              <div style={{ display:"flex",gap:6,marginTop:6 }}>
                {[0.001,0.005,0.01,0.05].map(v => (
                  <button key={v} onClick={() => setSize(String(v))} style={{
                    flex:1,padding:"3px 0",fontSize:11,background:"transparent",cursor:"pointer",fontFamily:"Outfit,sans-serif",
                    border:"1px solid #1a3a5e",color:"#4a7a96",
                  }}>{v}</button>
                ))}
              </div>
            </div>

            {/* Price (limit only) */}
            {orderType === "limit" && (
              <div>
                <div style={{ fontSize:10,color:"#4a7a96",letterSpacing:1,textTransform:"uppercase",marginBottom:6 }}>Precio Límite</div>
                <input value={price} onChange={e => setPrice(e.target.value)} type="number"
                  style={{ width:"100%",background:"#0a1520",border:"1px solid #1a3a5e",color:"#c8e6f0",padding:"9px 12px",fontFamily:"Outfit,sans-serif",fontSize:14,outline:"none" }}
                  placeholder={currentPrice.toFixed(2)} />
              </div>
            )}

            {/* Leverage */}
            <div>
              <div style={{ display:"flex",justifyContent:"space-between",marginBottom:6 }}>
                <div style={{ fontSize:10,color:"#4a7a96",letterSpacing:1,textTransform:"uppercase" }}>Leverage</div>
                <span style={{ fontSize:12,color:"#00e5ff",fontWeight:700 }}>{leverage}x</span>
              </div>
              <input type="range" min={1} max={50} value={leverage} onChange={e => setLeverage(Number(e.target.value))}
                style={{ width:"100%",accentColor:"#00e5ff" }} />
              <div style={{ display:"flex",justifyContent:"space-between",fontSize:10,color:"#2a5a72" }}><span>1x</span><span>50x</span></div>
            </div>

            {/* Divider */}
            <div style={{ borderTop:"1px solid #0e2435",paddingTop:14,display:"flex",flexDirection:"column",gap:8 }}>
              <div style={{ fontSize:10,color:"#2a5a72",letterSpacing:1,textTransform:"uppercase",marginBottom:2 }}>Acciones de Prueba</div>

              <button onClick={testAccount} disabled={loading} style={{ width:"100%",padding:"9px 0",background:"transparent",border:"1px solid #1a3a5e",color:"#7ab8d4",fontFamily:"Outfit,sans-serif",fontSize:12,cursor:"pointer" }}>
                📊 Ver Cuenta y Balance
              </button>
              <button onClick={testOpenOrders} disabled={loading} style={{ width:"100%",padding:"9px 0",background:"transparent",border:"1px solid #1a3a5e",color:"#7ab8d4",fontFamily:"Outfit,sans-serif",fontSize:12,cursor:"pointer" }}>
                📋 Ver Órdenes Abiertas
              </button>
              <button onClick={testPlaceOrder} disabled={loading} style={{
                width:"100%",padding:"11px 0",background:"transparent",fontFamily:"Outfit,sans-serif",fontSize:13,fontWeight:700,cursor:"pointer",
                border:`1px solid ${side==="B"?"#00ff88":"#ff4f6e"}`,color:side==="B"?"#00ff88":"#ff4f6e",
              }}>
                {loading ? "⟳ Enviando..." : side === "B" ? `🟢 Abrir BUY ${size} ${coin}` : `🔴 Abrir SELL ${size} ${coin}`}
              </button>
              <button onClick={testCancelAll} disabled={loading} style={{ width:"100%",padding:"9px 0",background:"transparent",border:"1px solid #5a3a00",color:"#ffb347",fontFamily:"Outfit,sans-serif",fontSize:12,cursor:"pointer" }}>
                ✕ Cancelar Todas las Órdenes
              </button>
            </div>
          </div>

          {/* RIGHT — Log console */}
          <div style={{ flex:1,padding:"14px 16px",overflowY:"auto",background:"#050a0f",display:"flex",flexDirection:"column",gap:1 }}>
            <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10 }}>
              <div style={{ fontSize:10,color:"#2a5a72",letterSpacing:1,textTransform:"uppercase" }}>Console Output</div>
              <button onClick={() => setLogs([])} style={{ background:"none",border:"none",color:"#2a5a72",cursor:"pointer",fontSize:11,fontFamily:"Outfit,sans-serif" }}>Limpiar</button>
            </div>
            {logs.length === 0
              ? <div style={{ fontSize:12,color:"#1a3a5e",fontStyle:"italic" }}>Los resultados de las pruebas aparecerán aquí...</div>
              : logs.map((l, i) => (
                  <div key={i} style={{ fontSize:12,color:l.color,lineHeight:1.7,fontFamily:"monospace",borderBottom:"1px solid #070d14",paddingBottom:1 }}>
                    <span style={{ color:"#1a3a5e",marginRight:8 }}>{l.ts}</span>{l.msg}
                  </div>
                ))
            }
          </div>
        </div>

        {/* Warning footer */}
        <div style={{ padding:"10px 24px",borderTop:"1px solid #0e2435",background:"#0a0800",display:"flex",alignItems:"center",gap:10 }}>
          <span style={{ fontSize:18 }}>⚠</span>
          <span style={{ fontSize:11,color:"#5a4a00",lineHeight:1.5 }}>
            <strong style={{ color:"#ffb347" }}>ÓRDENES REALES:</strong> Este panel envía órdenes al mercado real de Hyperliquid.
            Usa tamaños mínimos (0.001 ETH ≈ $2) para probar. Asegúrate de tener fondos suficientes.
          </span>
        </div>
      </div>
    </div>
  );
}


function TradingTab() {
  const [pools] = useState(() => {
    try {
      const saved = localStorage.getItem("liquidity_engine_pools");
      if (!saved) return [];
      return JSON.parse(saved).map(p => ({
        ...p,
        valueUsd:        p.valueUsd        ?? 0,
        status:          p.status          ?? { label:"Fuera (Abajo)",color:"#ff4f6e",bg:"#1a0810",border:"#5a1a28" },
        amount0:         p.amount0         ?? "0",
        amount1:         p.amount1         ?? "0",
      }));
    } catch { return []; }
  });

  // Counts
  const activeBots = (() => {
    try {
      return JSON.parse(localStorage.getItem("hl_trading") || "[]")
        .filter(t => t.status === "active").length;
    } catch { return 0; }
  })();

  return (
    <>
      <div className="stats-grid">
        {[
          { label: "Pools Monitoreados", value: pools.length.toString() },
          { label: "Bots Activos",        value: activeBots.toString(), success: activeBots > 0 },
          { label: "Estrategia",          value: "Breakout" },
          { label: "Exchange",            value: "Hyperliquid" },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <div className="stat-label">{s.label}</div>
            <div className={`stat-value ${s.success ? "success" : ""}`}>{s.value}</div>
          </div>
        ))}
      </div>

      <div className="section-header">
        <div className="section-title">Trading de Rango</div>
        {pools.length > 0 && <span className="count-badge">{pools.length}</span>}
        <div className="section-actions" style={{ fontSize:12,color:"#4a7a96" }}>
          Los pools se sincronizan desde Cobertura
        </div>
      </div>

      {pools.length === 0 ? (
        <div className="empty-state">
          <div className="empty-title">No tienes pools configurados.</div>
          <div className="empty-sub">Ve a la pestaña Cobertura → Escanea tu wallet → Los pools aparecerán aquí.</div>
        </div>
      ) : (
        pools.map(pos => (
          <PoolCard
            key={pos.tokenId}
            pos={pos}
            onRemove={() => {}}   // no eliminar desde trading tab
            mode="trading"
          />
        ))
      )}
    </>
  );
}

function ComingSoonTab({ name }) {
  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", height:"60%", gap:12, color:"#2a5a72" }}>
      <div style={{ fontSize:36 }}>⚡</div>
      <div style={{ fontSize:18, color:"#4a7a96", fontWeight:600 }}>{name}</div>
      <div style={{ fontSize:14 }}>Esta sección estará disponible próximamente.</div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════
// PROGRAMA CRYPTO EDUCATION
// ════════════════════════════════════════════════════════════════════
const CURSO = [
  {
    id: 1,
    titulo: "Módulo 1 — Mentalidad del Especulador",
    color: "#00e5ff",
    lecciones: [
      {
        id: "1-1",
        titulo: "¿Qué es especular y en qué se diferencia de invertir?",
        duracion: "18 min",
        descripcion: "Definimos con precisión qué significa especular: tomar posiciones calculadas sobre movimientos de precio en el corto y mediano plazo. Vemos la diferencia fundamental con la inversión pasiva y por qué el especulador debe tener un edge claro antes de operar.",
        puntosClave: [
          "El especulador trabaja con probabilidades, no con certezas",
          "La diferencia entre especular e invertir está en el horizonte temporal y el análisis",
          "Sin ventaja (edge) definida, no hay especulación — hay juego",
        ],
        ejercicio: "Escribe en tu diario de trading qué ventaja concreta posees hoy. Si no puedes describirla en 2 oraciones, aún no tienes un edge.",
      },
      {
        id: "1-2",
        titulo: "El perfil psicológico del especulador exitoso",
        duracion: "22 min",
        descripcion: "El mercado no te paga por tener razón — te paga por gestionar bien el riesgo. Estudiamos las características mentales que separan a los especuladores consistentes de los que quiebran su cuenta en los primeros 6 meses.",
        puntosClave: [
          "Disciplina sobre las reglas propias, incluso cuando el mercado tienta a romperlas",
          "Desapego emocional del resultado de cada operación individual",
          "Pensar en series de operaciones, no en cada trade como si fuera el último",
        ],
        ejercicio: "Identifica tu mayor sesgo emocional al operar (miedo, soberbia, FOMO). Diseña una regla de proceso que lo contrarreste.",
      },
      {
        id: "1-3",
        titulo: "Los errores más comunes y cómo blindarse contra ellos",
        duracion: "20 min",
        descripcion: "Catalogamos los errores que destruyen cuentas de forma recurrente: el sobretrading, mover el stop, promediar perdedoras y operar sin plan. Cada uno tiene una causa raíz y una solución de proceso.",
        puntosClave: [
          "El sobretrading es el mayor asesino silencioso de capital",
          "Mover el stop de pérdida equivale a operar sin plan",
          "Promediar en perdedoras es aceptable solo si estaba en el plan original",
        ],
        ejercicio: "Revisa tus últimas 20 operaciones. Clasifica cada pérdida: ¿fue error de análisis, error de gestión o error psicológico?",
      },
    ],
  },
  {
    id: 2,
    titulo: "Módulo 2 — Lectura Profesional del Mercado",
    color: "#00ff88",
    lecciones: [
      {
        id: "2-1",
        titulo: "Estructura del mercado: tendencia, rango y transición",
        duracion: "26 min",
        descripcion: "El precio no se mueve de forma aleatoria — sigue estructuras. Aprendemos a identificar si el mercado está en tendencia, en rango o en fase de transición, y qué estrategia aplica a cada contexto. Operar la estrategia correcta en el contexto equivocado es la causa principal de pérdidas.",
        puntosClave: [
          "En tendencia: busca retrocesos para unirte al movimiento dominante",
          "En rango: vende resistencia, compra soporte — con stops ajustados",
          "En transición: reduce el tamaño o espera confirmación antes de entrar",
        ],
        ejercicio: "Analiza el gráfico diario de BTC, ETH y SOL. Clasifica cada uno: ¿tendencia, rango o transición? Justifica con estructura de máximos y mínimos.",
      },
      {
        id: "2-2",
        titulo: "Zonas de oferta y demanda de alta probabilidad",
        duracion: "24 min",
        descripcion: "Las zonas de oferta y demanda son las huellas que dejan los grandes operadores. Aprendemos a identificarlas en el gráfico, a validar su relevancia y a construir operaciones alrededor de ellas con una lógica de riesgo/beneficio asimétrica.",
        puntosClave: [
          "Una zona de demanda válida es la base de un movimiento alcista fuerte previo",
          "Cuantas menos veces ha sido tocada la zona, más potente es",
          "Siempre entra en la zona con stop por debajo/encima de ella — nunca antes",
        ],
        ejercicio: "Marca en el gráfico de 4H de BTC las 3 zonas de demanda más relevantes. Establece un precio de entrada, stop y objetivo para cada una.",
      },
      {
        id: "2-3",
        titulo: "El volumen como confirmador de intención del precio",
        duracion: "19 min",
        descripcion: "El volumen es la huella real del dinero institucional. Un movimiento de precio sin volumen es sospechoso. Volumen alto en zonas clave confirma la intención. Aprendemos a leer el delta de volumen y las velas de absorción.",
        puntosClave: [
          "Volumen creciente en tendencia = tendencia sana y continúa",
          "Volumen decreciente en rango = acumulación o distribución silenciosa",
          "Velas de alta volatilidad y volumen bajo = mercado manipulado — cuidado",
        ],
        ejercicio: "Compara 5 breakouts recientes en tus activos favoritos. ¿Cuántos tuvieron volumen por encima del promedio de 20 sesiones? ¿Qué pasó después?",
      },
    ],
  },
  {
    id: 3,
    titulo: "Módulo 3 — Estrategias de Entrada y Salida",
    color: "#c9a227",
    lecciones: [
      {
        id: "3-1",
        titulo: "Señales de entrada de alta probabilidad",
        duracion: "28 min",
        descripcion: "No todas las setups valen lo mismo. Definimos una taxonomía de señales según su probabilidad y su ratio riesgo/beneficio esperado. Solo operamos cuando confluyen al menos tres factores: estructura, zona y señal de precio.",
        puntosClave: [
          "La confluencia de factores multiplica la probabilidad de éxito",
          "Una señal sin contexto de estructura es ruido — no la operes",
          "Paciencia: esperar el setup correcto es tan importante como ejecutarlo bien",
        ],
        ejercicio: "Define tu setup de entrada ideal en 5 condiciones concretas. Ponlo por escrito. Solo operarás cuando las 5 se cumplan simultáneamente.",
      },
      {
        id: "3-2",
        titulo: "Gestión del stop loss y take profit como proceso",
        duracion: "21 min",
        descripcion: "El stop no es opcional — es la definición de cuándo estás equivocado. Aprendemos a colocarlo en lugares lógicos (detrás de estructura) y a gestionar el take profit de forma dinámica según el comportamiento del precio.",
        puntosClave: [
          "El stop va donde el análisis queda invalidado — no donde duela menos",
          "Mueve el stop a breakeven solo cuando el precio ya alcanzó el 1:1",
          "Nunca muevas el stop en contra de tu posición — es la regla cardinal",
        ],
        ejercicio: "Retrocede en tu historial: ¿cuántas veces moviste el stop alejándolo? Calcula el impacto en tu P&L acumulado.",
      },
      {
        id: "3-3",
        titulo: "Tipos de órdenes y cuándo usar cada una",
        duracion: "16 min",
        descripcion: "Market, limit, stop-limit, trailing stop — cada orden tiene un propósito. Usarlas mal destruye el edge que cuesta tanto construir. Vemos en qué contexto usa cada una un especulador profesional.",
        puntosClave: [
          "Las órdenes limit preservan el precio de entrada — úsalas en zonas claras",
          "Las órdenes market en breakouts reales — cuando la velocidad importa más que el precio",
          "El trailing stop es tu mejor aliado en tendencias extendidas",
        ],
        ejercicio: "En tu próxima operación, documenta antes de entrar: ¿qué tipo de orden usaré en entrada, stop y salida? ¿Por qué?",
      },
    ],
  },
  {
    id: 4,
    titulo: "Módulo 4 — Gestión del Riesgo y el Capital",
    color: "#ff4f6e",
    lecciones: [
      {
        id: "4-1",
        titulo: "Las reglas de oro del money management",
        duracion: "23 min",
        descripcion: "El money management no es un tema aburrido — es lo que determina si sobrevives el tiempo suficiente para que tu edge funcione. Vemos las reglas fundamentales que todo especulador debe cumplir sin excepción.",
        puntosClave: [
          "Nunca arriesgues más del 1-2% de tu capital en una sola operación",
          "Define el máximo de pérdida diaria y semanal antes de abrir el gráfico",
          "Después de 3 pérdidas consecutivas, para. El mercado no va a ningún lado.",
        ],
        ejercicio: "Calcula tu riesgo máximo por operación en euros/dólares con tu capital actual. Escríbelo. Nunca lo cambies en caliente.",
      },
      {
        id: "4-2",
        titulo: "El ratio riesgo/beneficio como filtro de operaciones",
        duracion: "18 min",
        descripcion: "Un sistema con 40% de aciertos puede ser muy rentable si el ratio R/B es 1:3. La matemática de la especulación no funciona como la intuición. Entendemos cómo el ratio R/B determina la rentabilidad a largo plazo.",
        puntosClave: [
          "Mínimo 1:2 de R/B para que el sistema sea viable con una tasa de aciertos normal",
          "No entres en operaciones con R/B menor a 1:1.5 — el esfuerzo no vale la recompensa",
          "La consistencia supera a la búsqueda del trade perfecto",
        ],
        ejercicio: "Calcula el ratio R/B promedio de tus últimas 30 operaciones. ¿Estás por encima de 1:2? Si no, ¿qué debes cambiar?",
      },
      {
        id: "4-3",
        titulo: "Dimensionamiento de posiciones: la fórmula exacta",
        duracion: "20 min",
        descripcion: "El tamaño de la posición no es algo que se decide a ojo. Existe una fórmula precisa que integra tu capital, tu riesgo porcentual, la distancia al stop y el precio del activo. La aplicamos con ejemplos reales en crypto.",
        puntosClave: [
          "Tamaño = (Capital × % Riesgo) ÷ Distancia al Stop en precio",
          "Nunca aumentes el tamaño para recuperar pérdidas previas",
          "En crypto volátil, reduce el tamaño estándar un 30% adicional",
        ],
        ejercicio: "Con tu capital actual y tu distancia de stop promedio en BTC, calcula el tamaño correcto de tu próxima posición usando la fórmula.",
      },
    ],
  },
  {
    id: 5,
    titulo: "Módulo 5 — Especulación Práctica en Criptomonedas",
    color: "#a855f7",
    lecciones: [
      {
        id: "5-1",
        titulo: "El mercado cripto: particularidades y ventajas del especulador",
        duracion: "25 min",
        descripcion: "El mercado cripto tiene características únicas: opera 24/7, es más volátil, tiene menor liquidez en altcoins y está más influenciado por narrativas y sentimiento. Estas diferencias crean oportunidades específicas para el especulador preparado.",
        puntosClave: [
          "La volatilidad alta es una ventaja — si gestionas bien el riesgo",
          "Bitcoin marca el ritmo: cuando BTC cae, las altcoins caen más. Cuando sube, las altcoins pueden superar a BTC",
          "El sentimiento de mercado (Fear & Greed) es un input, no una señal directa",
        ],
        ejercicio: "Observa el mercado durante una semana completa. Documenta cómo se comportan ETH, SOL y las altcoins principales en relación a BTC en cada movimiento relevante.",
      },
      {
        id: "5-2",
        titulo: "Pools de liquidez como herramienta del especulador avanzado",
        duracion: "30 min",
        descripcion: "Los pools de liquidez en Uniswap V3 y protocolos similares no son solo para proveer liquidez pasiva — el especulador puede usarlos activamente para generar yield sobre posiciones direccionales. Integramos este conocimiento con las herramientas del Liquidity Engine.",
        puntosClave: [
          "Los pools concentrados en V3 permiten expresar una visión de precio con un rango específico",
          "El impermanent loss es gestionable si el rango se establece con análisis técnico",
          "Combinar fees de pool + especulación direccional puede mejorar el ratio R/B total",
        ],
        ejercicio: "Usando el Liquidity Engine de esta plataforma, abre un pool simulado en el rango que tu análisis técnico indique como zona de valor. Monitorea por 7 días.",
      },
      {
        id: "5-3",
        titulo: "Tu plan de trading personalizado: el documento que te hace profesional",
        duracion: "27 min",
        descripcion: "El plan de trading es el contrato que firmas contigo mismo. Define tu estrategia, tus reglas de entrada y salida, tu gestión del riesgo, tus horarios de operación y tu proceso de revisión. Sin este documento, estás improvisando.",
        puntosClave: [
          "El plan de trading elimina las decisiones emocionales en tiempo real",
          "Debe ser lo suficientemente específico para que otra persona pueda seguirlo",
          "Revísalo y actualízalo cada mes con base en los resultados reales",
        ],
        ejercicio: "Redacta hoy la primera versión de tu plan de trading. Mínimo: activos, timeframe, setup de entrada, reglas de stop, reglas de take profit y límites de riesgo diario.",
      },
    ],
  },
];

function ProgramaTab() {
  const [moduloActivo, setModuloActivo] = useState(0);
  const [leccionActiva, setLeccionActiva] = useState(0);
  const [completadas, setCompletadas] = useState(() => {
    try { return JSON.parse(localStorage.getItem("crypto_edu_completadas") || "[]"); }
    catch { return []; }
  });
  const [notasAbiertas, setNotasAbiertas] = useState(false);
  const [nota, setNota] = useState("");

  const totalLecciones = CURSO.reduce((a, m) => a + m.lecciones.length, 0);
  const progreso = Math.round((completadas.length / totalLecciones) * 100);

  const modulo = CURSO[moduloActivo];
  const leccion = modulo?.lecciones[leccionActiva];

  const toggleCompletada = (id) => {
    const next = completadas.includes(id)
      ? completadas.filter(x => x !== id)
      : [...completadas, id];
    setCompletadas(next);
    localStorage.setItem("crypto_edu_completadas", JSON.stringify(next));
  };

  const irSiguiente = () => {
    if (leccionActiva < modulo.lecciones.length - 1) {
      if (!completadas.includes(leccion.id)) toggleCompletada(leccion.id);
      setLeccionActiva(l => l + 1);
    } else if (moduloActivo < CURSO.length - 1) {
      if (!completadas.includes(leccion.id)) toggleCompletada(leccion.id);
      setModuloActivo(m => m + 1);
      setLeccionActiva(0);
    }
  };

  const S = {
    wrap: { display:"flex", gap:0, height:"100%", minHeight:0 },
    sidebar: {
      width:280, minWidth:240, maxWidth:300, borderRight:"1px solid #0e2435",
      overflowY:"auto", paddingBottom:16, flexShrink:0,
    },
    instrHero: {
      padding:"20px 18px 16px", borderBottom:"1px solid #0e2435",
      background:"linear-gradient(135deg,#070d14 0%,#0a1a24 100%)",
    },
    avatar: {
      width:44, height:44, background:"#00e5ff", display:"flex",
      alignItems:"center", justifyContent:"center",
      fontWeight:900, fontSize:16, color:"#050a0f", marginBottom:10,
    },
    instrNombre: { fontSize:15, fontWeight:700, color:"#e0f4ff", marginBottom:2 },
    instrTitulo: { fontSize:11, color:"#2a5a72", letterSpacing:1.5, textTransform:"uppercase" },
    progressWrap: { padding:"12px 18px", borderBottom:"1px solid #0e2435" },
    progressLabel: { display:"flex", justifyContent:"space-between", fontSize:11, color:"#2a5a72", marginBottom:6, letterSpacing:1 },
    progressBar: { height:3, background:"#0e2435", position:"relative" },
    progressFill: { height:"100%", background:"#00e5ff", transition:"width 0.4s ease" },
    moduloHeader: {
      padding:"10px 18px 6px", fontSize:11, letterSpacing:1.5,
      textTransform:"uppercase", fontWeight:700, display:"flex", alignItems:"center", gap:8,
    },
    dot: (c) => ({ width:8, height:8, minWidth:8, borderRadius:"50%", background:c }),
    leccionItem: (activa, done) => ({
      padding:"9px 18px 9px 26px", cursor:"pointer", fontSize:13,
      color: activa ? "#e0f4ff" : done ? "#4a7a96" : "#3a6a86",
      background: activa ? "#0a1a24" : "transparent",
      borderLeft: activa ? "2px solid #00e5ff" : "2px solid transparent",
      display:"flex", alignItems:"center", gap:8, transition:"all 0.15s",
    }),
    checkCircle: (done) => ({
      width:16, height:16, minWidth:16, borderRadius:"50%",
      border: done ? "none" : "1px solid #1a3a5e",
      background: done ? "#00ff88" : "transparent",
      display:"flex", alignItems:"center", justifyContent:"center",
      fontSize:9, color:"#050a0f", fontWeight:900, flexShrink:0,
    }),
    main: { flex:1, overflowY:"auto", padding:"24px 28px", minWidth:0 },
    modBadge: (c) => ({
      display:"inline-block", padding:"2px 10px", fontSize:11,
      border:`1px solid ${c}`, color:c, letterSpacing:1.5,
      textTransform:"uppercase", marginBottom:14,
    }),
    lecTitulo: { fontSize:22, fontWeight:700, color:"#e0f4ff", marginBottom:8, lineHeight:1.3 },
    metaRow: { display:"flex", alignItems:"center", gap:16, marginBottom:20, flexWrap:"wrap" },
    metaChip: { fontSize:12, color:"#4a7a96", display:"flex", alignItems:"center", gap:5 },
    videoBox: {
      background:"#070d14", border:"1px solid #0e2435",
      aspectRatio:"16/9", display:"flex", flexDirection:"column",
      alignItems:"center", justifyContent:"center", gap:10,
      marginBottom:22, cursor:"pointer", position:"relative", overflow:"hidden",
    },
    videoIcon: {
      width:56, height:56, background:"rgba(0,229,255,0.1)",
      border:"2px solid #00e5ff", borderRadius:"50%",
      display:"flex", alignItems:"center", justifyContent:"center",
      fontSize:20, color:"#00e5ff",
    },
    videoLabel: { fontSize:13, color:"#2a5a72", letterSpacing:1 },
    sectionTitle: {
      fontSize:11, letterSpacing:2, color:"#2a5a72", textTransform:"uppercase",
      marginBottom:12, marginTop:22, paddingBottom:8, borderBottom:"1px solid #0e2435",
    },
    desc: { fontSize:14, color:"#7ab8d4", lineHeight:1.8, marginBottom:20 },
    puntoItem: {
      display:"flex", alignItems:"flex-start", gap:10, marginBottom:10,
      padding:"10px 14px", background:"#070d14", border:"1px solid #0e2435",
    },
    puntoBullet: { color:"#00e5ff", fontSize:14, marginTop:1, flexShrink:0 },
    puntoText: { fontSize:13, color:"#c8d8e8", lineHeight:1.6 },
    ejercicioBox: {
      background:"#070d14", border:"1px solid #c9a227",
      padding:"16px 18px", marginTop:8, marginBottom:24,
    },
    ejercicioLabel: { fontSize:11, letterSpacing:2, color:"#c9a227", textTransform:"uppercase", marginBottom:8 },
    ejercicioText: { fontSize:13, color:"#a08020", lineHeight:1.7 },
    actionsRow: { display:"flex", gap:10, flexWrap:"wrap", alignItems:"center", paddingTop:8 },
    btnComplete: (done) => ({
      padding:"9px 20px", fontSize:13, cursor:"pointer",
      fontFamily:"Outfit,sans-serif", fontWeight:700,
      background: done ? "transparent" : "#00ff88",
      border: done ? "1px solid #00ff88" : "1px solid #00ff88",
      color: done ? "#00ff88" : "#050a0f",
      letterSpacing:"0.5px", transition:"all 0.15s",
    }),
    btnNext: {
      padding:"9px 20px", fontSize:13, cursor:"pointer",
      fontFamily:"Outfit,sans-serif", fontWeight:700,
      background:"#00e5ff", border:"1px solid #00e5ff",
      color:"#050a0f", letterSpacing:"0.5px",
    },
    btnNota: {
      padding:"9px 16px", fontSize:13, cursor:"pointer",
      fontFamily:"Outfit,sans-serif",
      background:"transparent", border:"1px solid #1a3a5e",
      color:"#4a7a96", letterSpacing:"0.5px",
    },
    notasPanel: {
      position:"fixed", bottom:0, right:0, width:340, height:260,
      background:"#070d14", border:"1px solid #1a3a5e",
      borderBottom:"none", borderRight:"none", zIndex:50, display:"flex",
      flexDirection:"column",
    },
    notasHeader: {
      padding:"10px 14px", borderBottom:"1px solid #0e2435",
      display:"flex", justifyContent:"space-between", alignItems:"center",
      fontSize:12, color:"#4a7a96", letterSpacing:1, textTransform:"uppercase",
    },
    notasTextarea: {
      flex:1, background:"transparent", border:"none", outline:"none",
      color:"#c8d8e8", fontSize:13, padding:"12px 14px", resize:"none",
      fontFamily:"Outfit,sans-serif", lineHeight:1.7,
    },
  };

  return (
    <div style={S.wrap}>
      {/* ── Sidebar del curso ── */}
      <div style={S.sidebar}>
        {/* Instructor */}
        <div style={S.instrHero}>
          <div style={S.avatar}>OB</div>
          <div style={S.instrNombre}>Oscar Bolaños</div>
          <div style={S.instrTitulo}>Instructor · The Crypto House</div>
          <div style={{ marginTop:10, fontSize:12, color:"#2a5a72", lineHeight:1.6 }}>
            Especulación en mercados cripto con enfoque en gestión del riesgo y pools de liquidez.
          </div>
        </div>

        {/* Progreso */}
        <div style={S.progressWrap}>
          <div style={S.progressLabel}>
            <span>PROGRESO DEL CURSO</span>
            <span style={{ color:"#00e5ff" }}>{progreso}%</span>
          </div>
          <div style={S.progressBar}>
            <div style={{ ...S.progressFill, width:`${progreso}%` }} />
          </div>
          <div style={{ fontSize:11, color:"#2a5a72", marginTop:6 }}>
            {completadas.length} / {totalLecciones} lecciones completadas
          </div>
        </div>

        {/* Módulos y lecciones */}
        {CURSO.map((mod, mi) => (
          <div key={mod.id}>
            <div style={S.moduloHeader}>
              <div style={S.dot(mod.color)} />
              <span style={{ color: moduloActivo === mi ? mod.color : "#2a4a5e", fontSize:11 }}>
                {mod.titulo}
              </span>
            </div>
            {mod.lecciones.map((lec, li) => {
              const activa = moduloActivo === mi && leccionActiva === li;
              const done   = completadas.includes(lec.id);
              return (
                <div key={lec.id} style={S.leccionItem(activa, done)}
                  onClick={() => { setModuloActivo(mi); setLeccionActiva(li); }}>
                  <div style={S.checkCircle(done)}>{done ? "✓" : ""}</div>
                  <span style={{ lineHeight:1.4 }}>{lec.titulo}</span>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* ── Contenido de la lección ── */}
      <div style={S.main}>
        {leccion && (
          <>
            <div style={S.modBadge(modulo.color)}>{modulo.titulo}</div>
            <div style={S.lecTitulo}>{leccion.titulo}</div>

            <div style={S.metaRow}>
              <div style={S.metaChip}>
                <span style={{ color:"#00e5ff" }}>▷</span>
                <span>{leccion.duracion}</span>
              </div>
              <div style={S.metaChip}>
                <span>Lección {leccionActiva + 1} de {modulo.lecciones.length}</span>
              </div>
              {completadas.includes(leccion.id) && (
                <div style={{ fontSize:12, color:"#00ff88", display:"flex", alignItems:"center", gap:4 }}>
                  <span>✓</span> Completada
                </div>
              )}
            </div>

            {/* Video placeholder */}
            <div style={S.videoBox}>
              <div style={{
                position:"absolute", inset:0,
                background:"linear-gradient(135deg,#050a0f 0%,#0a1520 100%)",
              }} />
              <div style={{ position:"relative", zIndex:1, textAlign:"center" }}>
                <div style={S.videoIcon}>▷</div>
                <div style={{ ...S.videoLabel, marginTop:12 }}>VIDEO DE LA LECCIÓN</div>
                <div style={{ fontSize:11, color:"#1a3a5e", marginTop:4 }}>
                  Sube tu video aquí · YouTube / Vimeo embed
                </div>
              </div>
            </div>

            {/* Descripción */}
            <div style={S.sectionTitle}>Descripción</div>
            <p style={S.desc}>{leccion.descripcion}</p>

            {/* Puntos clave */}
            <div style={S.sectionTitle}>Puntos Clave</div>
            {leccion.puntosClave.map((p, i) => (
              <div key={i} style={S.puntoItem}>
                <span style={S.puntoBullet}>▸</span>
                <span style={S.puntoText}>{p}</span>
              </div>
            ))}

            {/* Ejercicio */}
            <div style={S.sectionTitle}>Ejercicio Práctico</div>
            <div style={S.ejercicioBox}>
              <div style={S.ejercicioLabel}>Tu tarea</div>
              <div style={S.ejercicioText}>{leccion.ejercicio}</div>
            </div>

            {/* Acciones */}
            <div style={S.actionsRow}>
              <button style={S.btnComplete(completadas.includes(leccion.id))}
                onClick={() => toggleCompletada(leccion.id)}>
                {completadas.includes(leccion.id) ? "✓ Completada" : "Marcar como completada"}
              </button>
              {(leccionActiva < modulo.lecciones.length - 1 || moduloActivo < CURSO.length - 1) && (
                <button style={S.btnNext} onClick={irSiguiente}>
                  Siguiente lección →
                </button>
              )}
              <button style={S.btnNota} onClick={() => setNotasAbiertas(n => !n)}>
                ✎ Mis notas
              </button>
            </div>
          </>
        )}
      </div>

      {/* ── Panel de notas flotante ── */}
      {notasAbiertas && (
        <div style={S.notasPanel}>
          <div style={S.notasHeader}>
            <span>Notas — {leccion?.titulo?.slice(0, 30)}…</span>
            <span style={{ cursor:"pointer" }} onClick={() => setNotasAbiertas(false)}>✕</span>
          </div>
          <textarea
            style={S.notasTextarea}
            placeholder="Escribe tus notas aquí..."
            value={nota}
            onChange={e => setNota(e.target.value)}
          />
        </div>
      )}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════
// APP
// ════════════════════════════════════════════════════════════════════
const TABS = ["Wallets","Cobertura","Trading Automatizado","Insider (Trading)","Programa CryptoEducation"];
const TABS_WITH_BADGE = ["Insider (Trading)"];
const NAV_ITEMS = ["Dashboard","Programa","Preguntas"];

// ════════════════════════════════════════════════════════════════════
// CONTACT MODAL
// ════════════════════════════════════════════════════════════════════
function ContactModal({ onClose }) {
  const [form, setForm]       = useState({ name:"", email:"", msg:"" });
  const [sending, setSending] = useState(false);
  const [sent, setSent]       = useState(false);

  const handleWA = () => {
    const text = encodeURIComponent(`Hola! Soy ${form.name || "un usuario"} de Liquidity Engine. ${form.msg}`);
    window.open(`https://wa.me/573215646716?text=${text}`, "_blank");
  };

  const handleEmail = (e) => {
    e.preventDefault();
    if (!form.name || !form.msg) return;
    setSending(true);
    const subject = encodeURIComponent(`Liquidity Engine — Mensaje de ${form.name}`);
    const body    = encodeURIComponent(`Nombre: ${form.name}\nEmail: ${form.email}\n\n${form.msg}`);
    window.location.href = `mailto:profeoscarbol@gmail.com?subject=${subject}&body=${body}`;
    setTimeout(() => { setSending(false); setSent(true); }, 800);
  };

  const S = {
    overlay: { position:"fixed",inset:0,background:"rgba(5,10,15,0.80)",zIndex:200,display:"flex",alignItems:"center",justifyContent:"center",padding:16,backdropFilter:"blur(8px)" },
    box: { background:"#070d14",border:"1px solid #1a3a5e",width:"100%",maxWidth:480,animation:"fadeSlide 0.2s ease" },
  };

  return (
    <div style={S.overlay} onClick={e => e.target===e.currentTarget && onClose()}>
      <style>{`@keyframes fadeSlide{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}`}</style>
      <div style={S.box}>

        {/* Header */}
        <div style={{ padding:"24px 28px 0", display:"flex", justifyContent:"space-between", alignItems:"flex-start", borderBottom:"1px solid #0e2435", paddingBottom:20 }}>
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:4 }}>
              <div style={{ width:32,height:32,background:"#00e5ff",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,fontSize:13,color:"#050a0f" }}>CH</div>
              <div>
                <div style={{ fontSize:11,fontWeight:700,color:"#7ab8d4",letterSpacing:2,textTransform:"uppercase" }}>The Crypto House</div>
                <div style={{ fontSize:10,color:"#2a5a72",letterSpacing:1,textTransform:"uppercase" }}>Liquidity Engine · Soporte</div>
              </div>
            </div>
            <div style={{ fontSize:20,fontWeight:700,color:"#c8e6f0",marginTop:12 }}>Contáctanos</div>
            <div style={{ fontSize:13,color:"#4a7a96",marginTop:2 }}>Respuesta en menos de 24 horas</div>
          </div>
          <button onClick={onClose} style={{ background:"none",border:"none",color:"#2a5a72",fontSize:20,cursor:"pointer",lineHeight:1,padding:0 }}>✕</button>
        </div>

        {/* Direct contact cards */}
        <div style={{ padding:"20px 28px 0", display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
          <a href="https://wa.me/573215646716" target="_blank" rel="noreferrer"
            style={{ background:"#0a1520",border:"1px solid #1a3a5e",padding:"14px 16px",textDecoration:"none",display:"flex",flexDirection:"column",gap:6,transition:"border-color 0.15s" }}
            onMouseEnter={e=>e.currentTarget.style.borderColor="#00ff88"}
            onMouseLeave={e=>e.currentTarget.style.borderColor="#1a3a5e"}>
            <div style={{ fontSize:22 }}>💬</div>
            <div style={{ fontSize:13,fontWeight:700,color:"#00ff88" }}>WhatsApp</div>
            <div style={{ fontSize:11,color:"#2a5a72" }}>+57 321 564 6716</div>
            <div style={{ fontSize:10,color:"#1a4a2e",marginTop:2 }}>Respuesta inmediata</div>
          </a>
          <a href="mailto:profeoscarbol@gmail.com"
            style={{ background:"#0a1520",border:"1px solid #1a3a5e",padding:"14px 16px",textDecoration:"none",display:"flex",flexDirection:"column",gap:6,transition:"border-color 0.15s" }}
            onMouseEnter={e=>e.currentTarget.style.borderColor="#00e5ff"}
            onMouseLeave={e=>e.currentTarget.style.borderColor="#1a3a5e"}>
            <div style={{ fontSize:22 }}>✉</div>
            <div style={{ fontSize:13,fontWeight:700,color:"#00e5ff" }}>Email</div>
            <div style={{ fontSize:11,color:"#2a5a72" }}>profeoscarbol@gmail.com</div>
            <div style={{ fontSize:10,color:"#1a3a5e",marginTop:2 }}>Respuesta en 24h</div>
          </a>
        </div>

        {/* Form */}
        <div style={{ padding:"20px 28px 28px" }}>
          <div style={{ fontSize:11,color:"#2a5a72",letterSpacing:1,textTransform:"uppercase",marginBottom:14 }}>O envíanos un mensaje</div>

          {sent ? (
            <div style={{ background:"#001a0e",border:"1px solid #003a22",padding:16,textAlign:"center",color:"#00ff88",fontSize:14 }}>
              ✓ Mensaje preparado — se abrió tu cliente de correo
            </div>
          ) : (
            <form onSubmit={handleEmail} style={{ display:"flex",flexDirection:"column",gap:12 }}>
              <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:10 }}>
                <div>
                  <div style={{ fontSize:10,color:"#4a7a96",letterSpacing:1,textTransform:"uppercase",marginBottom:5 }}>Nombre *</div>
                  <input style={{ width:"100%",padding:"9px 12px",background:"#0a1520",border:"1px solid #1a3a5e",color:"#c8e6f0",fontFamily:"Outfit,sans-serif",fontSize:13,outline:"none" }}
                    placeholder="Tu nombre" value={form.name}
                    onChange={e=>setForm(p=>({...p,name:e.target.value}))} />
                </div>
                <div>
                  <div style={{ fontSize:10,color:"#4a7a96",letterSpacing:1,textTransform:"uppercase",marginBottom:5 }}>Email</div>
                  <input style={{ width:"100%",padding:"9px 12px",background:"#0a1520",border:"1px solid #1a3a5e",color:"#c8e6f0",fontFamily:"Outfit,sans-serif",fontSize:13,outline:"none" }}
                    type="email" placeholder="tu@email.com" value={form.email}
                    onChange={e=>setForm(p=>({...p,email:e.target.value}))} />
                </div>
              </div>
              <div>
                <div style={{ fontSize:10,color:"#4a7a96",letterSpacing:1,textTransform:"uppercase",marginBottom:5 }}>Mensaje *</div>
                <textarea style={{ width:"100%",padding:"9px 12px",background:"#0a1520",border:"1px solid #1a3a5e",color:"#c8e6f0",fontFamily:"Outfit,sans-serif",fontSize:13,outline:"none",resize:"vertical",minHeight:80 }}
                  placeholder="¿En qué podemos ayudarte?" value={form.msg}
                  onChange={e=>setForm(p=>({...p,msg:e.target.value}))} />
              </div>
              <div style={{ display:"flex",gap:10 }}>
                <button type="button" onClick={handleWA}
                  disabled={!form.name||!form.msg}
                  style={{ flex:1,padding:"11px 0",background:"transparent",border:"1px solid #00ff88",color:"#00ff88",fontFamily:"Outfit,sans-serif",fontSize:13,fontWeight:700,cursor:"pointer",opacity:(!form.name||!form.msg)?0.4:1 }}>
                  💬 Enviar por WhatsApp
                </button>
                <button type="submit"
                  disabled={!form.name||!form.msg||sending}
                  style={{ flex:1,padding:"11px 0",background:"transparent",border:"1px solid #00e5ff",color:"#00e5ff",fontFamily:"Outfit,sans-serif",fontSize:13,fontWeight:700,cursor:"pointer",opacity:(!form.name||!form.msg)?0.4:1 }}>
                  {sending ? "Abriendo..." : "✉ Enviar por Email"}
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}

export default function App() {
  const { user, profile, signOut } = useAuth();
  const [activeTab, setActiveTab]     = useState("Cobertura");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [hlTestOpen, setHlTestOpen]   = useState(false);
  const closeSidebar = () => setSidebarOpen(false);

  // Dynamic user info from Google/Supabase
  const userName   = profile?.full_name || user?.user_metadata?.full_name || user?.email?.split("@")[0] || "Usuario";
  const userEmail  = user?.email || "";
  const userPlan   = profile?.plan_id === "pro" ? "Pro" : profile?.plan_id === "premium" ? "Premium" : "Gratuito";
  const avatarUrl  = profile?.avatar_url || user?.user_metadata?.avatar_url || null;
  const initials   = userName.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);

  const renderTab = () => {
    switch (activeTab) {
      case "Wallets":                    return <WalletsTab />;
      case "Cobertura":                  return <CoberturaTab />;
      case "Trading Automatizado":       return <TradingTab />;
      case "Programa CryptoEducation":   return <ProgramaTab />;
      default:                           return <ComingSoonTab name={activeTab} />;
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="app">
        <div className={`overlay ${sidebarOpen ? "open" : ""}`} onClick={closeSidebar} />
        {contactOpen && <ContactModal onClose={() => setContactOpen(false)} />}
        {hlTestOpen  && <HLTestModal  onClose={() => setHlTestOpen(false)}  />}

        <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
          <div className="logo">
            <div className="logo-box">CH</div>
            <div className="logo-text">The Crypto<br />House</div>
          </div>
          <div className="nav-section">
            {NAV_ITEMS.map(l => <div key={l} className="nav-item" onClick={closeSidebar}>{l}</div>)}
          </div>
          <div className="nav-section">
            <div className="nav-label">Herramientas</div>
            <div className="nav-item active" onClick={closeSidebar}>
              Liquidity Engine <span className="badge">BETA</span>
            </div>
          </div>
          <div className="nav-section">
            <div className="nav-label">Contacto</div>
            <div className="nav-item" style={{cursor:"pointer"}} onClick={() => { setContactOpen(true); closeSidebar(); }}>
              💬 WhatsApp / Email
            </div>
          </div>
          <div className="sidebar-spacer" />

          {/* User info + logout */}
          <div className="user-info" style={{ flexDirection:"column", alignItems:"stretch", gap:0, padding:"12px 14px" }}>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
              {avatarUrl ? (
                <img src={avatarUrl} alt={userName}
                  style={{ width:36, height:36, borderRadius:"50%", objectFit:"cover", flexShrink:0 }} />
              ) : (
                <div className="user-avatar">{initials}</div>
              )}
              <div style={{ minWidth:0, flex:1 }}>
                <div className="user-name" title={userName}>{userName}</div>
                <div className="user-plan">{userPlan}</div>
              </div>
            </div>
            <button onClick={signOut} style={{
              width:"100%", padding:"7px 0",
              background:"transparent", border:"1px solid #1a3a5e",
              color:"#4a7a96", fontSize:12, cursor:"pointer",
              fontFamily:"Outfit, sans-serif", letterSpacing:"0.5px",
              display:"flex", alignItems:"center", justifyContent:"center", gap:6,
              transition:"all 0.15s",
            }}
            onMouseEnter={e => { e.target.style.borderColor="#ff4f6e"; e.target.style.color="#ff4f6e"; }}
            onMouseLeave={e => { e.target.style.borderColor="#1a3a5e"; e.target.style.color="#4a7a96"; }}
            >
              ⎋ Cerrar sesión
            </button>
          </div>
        </div>

        <div className="main">
          <div className="topbar">
            <div className="topbar-row">
              <button className="hamburger" onClick={() => setSidebarOpen(true)}>☰</button>
              <span className="page-title">Liquidity Engine</span>
              <span className="beta-tag">BETA</span>
              <button onClick={() => setHlTestOpen(true)} style={{
                marginLeft:"auto", padding:"5px 12px",
                background:"transparent", border:"1px solid #ffb347",
                color:"#ffb347", fontFamily:"Outfit,sans-serif",
                fontSize:11, fontWeight:700, cursor:"pointer",
                letterSpacing:"0.5px",
              }}>
                ⚡ TEST HL API
              </button>
            </div>
            <div className="page-sub">
              <span className="dot-active" />
              <span>Monitoreo Pools de Liquidez, protección de rango y trading automatizado</span>
            </div>
            <div className="tabs">
              {TABS.map(tab => (
                <button key={tab} className={`tab ${activeTab === tab ? "active" : ""}`} onClick={() => setActiveTab(tab)}>
                  {tab}
                  {TABS_WITH_BADGE.includes(tab) && <span className="tab-badge">ONLINE+</span>}
                </button>
              ))}
            </div>
          </div>
          <div className="content" style={activeTab === "Programa CryptoEducation" ? { padding:0 } : {}}>{renderTab()}</div>
        </div>
      </div>
    </>
  );
}