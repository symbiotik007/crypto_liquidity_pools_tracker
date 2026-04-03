import { useState, useEffect, useRef } from "react";

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
  .pc-wrap { background: #070d14; border: 1px solid #0e2435; margin-bottom: 8px; overflow: hidden; }
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
  .pc-price-section { margin-bottom: 20px; }
  .pc-current-price { font-size: 28px; font-weight: 700; color: #00e5ff; margin-bottom: 8px; }
  .pc-range-labels { display: flex; justify-content: space-between; font-size: 12px; color: #4a7a96; margin-bottom: 6px; }
  .pc-range-bar-bg { position: relative; height: 6px; background: #0a1a2e; border-radius: 3px; margin: 0 0 8px; }
  .pc-range-bar-cursor { position: absolute; top: -5px; transform: translateX(-50%); }
  .pc-range-bar-cursor::before { content: ''; display: block; width: 16px; height: 16px; border-radius: 50%; background: #00e5ff; border: 2px solid #050a0f; box-shadow: 0 0 8px rgba(0,229,255,0.4); }
  .pc-range-bar-price { position: absolute; top: -22px; left: 50%; transform: translateX(-50%); font-size: 11px; color: #ff4f6e; white-space: nowrap; font-weight: 600; }
  .pc-range-bar-entry { position: absolute; top: -3px; transform: translateX(-50%); width: 2px; height: 12px; background: #4a7aff; opacity: 0.8; }

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
const WALLET_TYPES = [
  { id: "proteccion", icon: "🛡", name: "Protección", sub: "Hedge",         disabled: false },
  { id: "trading",    icon: "📊", name: "Trading",    sub: "Rango",         disabled: false },
  { id: "insider",    icon: "🤖", name: "Insider",    sub: "Mean-rev",      disabled: false },
  { id: "copy",       icon: "📋", name: "Copy",       sub: "No disponible", disabled: true  },
];

// ════════════════════════════════════════════════════════════════════
// WALLETS TAB
// ════════════════════════════════════════════════════════════════════
function WalletsTab() {
  const [modalOpen, setModalOpen]       = useState(false);
  const [selectedType, setSelectedType] = useState("proteccion");
  const [walletName, setWalletName]     = useState("");
  const [address, setAddress]           = useState("");
  const [apiKey, setApiKey]             = useState("");

  return (
    <>
      <div className="info-box">
        Añade las wallets que consideres necesarias para tu trading.
        Cada wallet tiene un tipo fijo (protección, trading o insider) y solo aparece en la estrategia correspondiente.
      </div>
      <div className="wallets-section">
        <div className="wallets-section-header">
          <span className="wallets-section-title">Mis Wallets</span>
          <button className="btn btn-gold" onClick={() => setModalOpen(true)}>+ Añadir</button>
        </div>
        <div className="empty-state">
          <div className="empty-title">No tienes wallets configuradas.</div>
          <div className="empty-sub">Añade una wallet de Hyperliquid para usar los bots de DeFi Suite.</div>
        </div>
      </div>

      <div className={`modal-overlay ${modalOpen ? "open" : ""}`}
        onClick={(e) => e.target.classList.contains("modal-overlay") && setModalOpen(false)}>
        <div className="wallet-modal">
          <div className="modal-header">
            <div><div className="modal-title">Añadir Wallet Hyperliquid</div></div>
            <button className="modal-close" onClick={() => setModalOpen(false)}>✕</button>
          </div>
          <div className="modal-body">
            <div className="form-group">
              <label className="form-label">Nombre / Etiqueta <span className="form-hint">?</span></label>
              <input className="form-input" placeholder="Ej: Mi wallet principal" value={walletName} onChange={e => setWalletName(e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Tipo de Wallet <span className="form-hint">?</span></label>
              <div className="wallet-types">
                {WALLET_TYPES.map(t => (
                  <div key={t.id} className={`wallet-type ${selectedType === t.id ? "selected" : ""} ${t.disabled ? "disabled" : ""}`}
                    onClick={() => !t.disabled && setSelectedType(t.id)}>
                    <div className="wallet-type-icon">{t.icon}</div>
                    <div className="wallet-type-name">{t.name}</div>
                    <div className="wallet-type-sub">{t.sub}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Dirección Pública <span className="form-hint">?</span></label>
              <input className="form-input" placeholder="0x..." value={address} onChange={e => setAddress(e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">API Key Secret <span className="form-hint">?</span></label>
              <input className="form-input" type="password" placeholder="64 hex" value={apiKey} onChange={e => setApiKey(e.target.value)} />
              <div className="form-sub">Obténlo en <a href="https://app.hyperliquid.xyz" target="_blank" rel="noreferrer">app.hyperliquid.xyz</a> → API → Show Secret.</div>
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-ghost" onClick={() => setModalOpen(false)}>Cancelar</button>
            <button className="btn btn-gold">Añadir Wallet</button>
          </div>
        </div>
      </div>
    </>
  );
}

// ════════════════════════════════════════════════════════════════════
// HEDGE TAB
// ════════════════════════════════════════════════════════════════════
// ════════════════════════════════════════════════════════════════════
// POOL CARD COMPONENT
// ════════════════════════════════════════════════════════════════════
function calcPoolStats(pos) {
  const valueUsd        = pos.valueUsd        ?? 0;
  const valueAtCreation = pos.valueAtCreation  ?? valueUsd;
  const pnl             = valueUsd - valueAtCreation;
  const pnlPct          = valueAtCreation > 0 ? (pnl / valueAtCreation) * 100 : 0;
  const entryPrice      = pos.priceAtCreation  ?? pos.currentPrice;
  const collectedFees   = pos.collectedFeesUsd ?? 0;
  const uncollectedFees = pos.uncollectedFeesUsd ?? 0;
  const totalFees       = collectedFees + uncollectedFees;

  // Age
  const createdMs = pos.createdAtTimestamp ?? Date.now();
  const ageSecs   = (Date.now() - createdMs) / 1000;
  const ageDays   = Math.floor(ageSecs / 86400);
  const ageHours  = Math.floor((ageSecs % 86400) / 3600);

  // APR
  const ageYears  = ageSecs / (365 * 86400);
  const apr       = ageYears > 0 ? (pnl / (valueAtCreation || 1)) / ageYears * 100 : 0;
  const aprFees   = ageYears > 0 && valueAtCreation > 0 ? (totalFees / valueAtCreation) / ageYears * 100 : 0;

  // Range bar: % position of currentPrice within [priceLower, priceUpper]
  const span      = pos.priceUpper - pos.priceLower;
  const rawPct    = span > 0 ? (pos.currentPrice - pos.priceLower) / span * 100 : 0;
  const barPct    = Math.max(0, Math.min(100, rawPct));

  return { valueUsd, valueAtCreation, pnl, pnlPct, entryPrice,
           totalFees, uncollectedFees, ageDays, ageHours, apr, aprFees, barPct };
}

function PoolCard({ pos, onRemove }) {
  const [expanded, setExpanded] = useState(false);
  const s = calcPoolStats(pos);
  const fmtUsd = (v) => `${v >= 0 ? "+" : ""}$${Math.abs(v).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  const fmtPct = (v) => `${v >= 0 ? "+" : ""}${v.toFixed(2)}%`;
  const fmtPriceNum = (v) => v?.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) ?? "0.00";
  const poolUrl = `https://app.uniswap.org/positions/v3/${pos.chainName?.toLowerCase()}/${pos.tokenId}`;

  return (
    <div className="pc-wrap">
      {/* ── COLLAPSED ROW ── */}
      <div className="pc-row" onClick={() => setExpanded(e => !e)}>
        <div className="pc-left">
          <span className="pc-pair">{pos.token0Symbol}/{pos.token1Symbol}</span>
          <span className="pc-status" style={{ color: pos.status.color, background: pos.status.bg, border: `1px solid ${pos.status.border}` }}>
            {pos.status.label}
          </span>
          <span className="pc-chain">{pos.chainName}</span>
        </div>
        <div className="pc-stats">
          <div className="pc-stat">
            <div className="pc-stat-label">Valor LP</div>
            <div className="pc-stat-val">${fmtPriceNum(s.valueUsd)}</div>
          </div>
          <div className="pc-stat">
            <div className="pc-stat-label">Entry</div>
            <div className="pc-stat-val">{fmtPriceNum(s.entryPrice)}</div>
          </div>
          <div className="pc-stat">
            <div className="pc-stat-label">PNL</div>
            <div className={`pc-stat-val ${s.pnl >= 0 ? "green" : "red"}`}>{fmtUsd(s.pnl)}</div>
          </div>
          <div className="pc-stat">
            <div className="pc-stat-label">APR</div>
            <div className={`pc-stat-val ${s.apr >= 0 ? "green" : "red"}`}>{s.apr.toFixed(1)}%</div>
          </div>
          <div className="pc-stat">
            <div className="pc-stat-label">Fee APR</div>
            <div className="pc-stat-val green">{s.aprFees.toFixed(1)}%</div>
          </div>
          <div className="pc-stat">
            <div className="pc-stat-label">Fees</div>
            <div className="pc-stat-val green">${fmtPriceNum(s.totalFees)}</div>
          </div>
        </div>
        <div className={`pc-chevron ${expanded ? "open" : ""}`}>›</div>
      </div>

      {/* ── EXPANDED PANEL ── */}
      {expanded && (
        <div className="pc-panel">
          {/* Price + range bar */}
          <div className="pc-price-section">
            <div className="pc-current-price">{fmtPriceNum(pos.currentPrice)}</div>
            <div className="pc-range-labels">
              <span className="pc-range-min">MIN {fmtPriceNum(pos.priceLower)}</span>
              <span className="pc-range-max">MAX {fmtPriceNum(pos.priceUpper)}</span>
            </div>
            <div className="pc-range-bar-bg">
              <div className="pc-range-bar-entry" style={{ left: `${Math.max(0, Math.min(100, (s.entryPrice - pos.priceLower) / (pos.priceUpper - pos.priceLower) * 100))}%` }} title={`Entry: ${fmtPriceNum(s.entryPrice)}`} />
              <div className="pc-range-bar-cursor" style={{ left: `${s.barPct}%` }}>
                <div className="pc-range-bar-price">{fmtPriceNum(pos.currentPrice)}</div>
              </div>
            </div>
          </div>

          {/* Resultado Total */}
          <div className="pc-section-title">Resultado Total</div>
          <div className="pc-grid4">
            <div className="pc-metric">
              <div className="pc-metric-label">PNL Total</div>
              <div className={`pc-metric-val ${s.pnl >= 0 ? "green" : "red"}`}>
                {fmtUsd(s.pnl)} ({fmtPct(s.pnlPct)})
              </div>
            </div>
            <div className="pc-metric">
              <div className="pc-metric-label">Invertido</div>
              <div className="pc-metric-val">${fmtPriceNum(s.valueAtCreation)}</div>
            </div>
            <div className="pc-metric">
              <div className="pc-metric-label">Tiempo de Vida</div>
              <div className="pc-metric-val">{s.ageDays}d {s.ageHours}h</div>
            </div>
            <div className="pc-metric">
              <div className="pc-metric-label">APR Total</div>
              <div className={`pc-metric-val ${s.apr >= 0 ? "green" : "red"}`}>{s.apr.toFixed(1)}%</div>
            </div>
          </div>

          {/* Capital */}
          <div className="pc-section-title">Capital</div>
          <div className="pc-grid4">
            <div className="pc-metric">
              <div className="pc-metric-label">PNL Capital</div>
              <div className={`pc-metric-val ${s.pnl >= 0 ? "green" : "red"}`}>
                {fmtUsd(s.pnl)} ({fmtPct(s.pnlPct)})
              </div>
            </div>
            <div className="pc-metric" />
            <div className="pc-metric">
              <div className="pc-metric-label">APR Capital</div>
              <div className={`pc-metric-val ${s.apr >= 0 ? "green" : "red"}`}>{s.apr.toFixed(1)}%</div>
            </div>
            <div className="pc-metric" />
          </div>

          {/* Fees */}
          <div className="pc-section-title">Fees Ganadas</div>
          <div className="pc-grid4">
            <div className="pc-metric">
              <div className="pc-metric-label">Total Fees</div>
              <div className="pc-metric-val green">${fmtPriceNum(s.totalFees)}</div>
              <div className="pc-metric-sub">uncollected: ${fmtPriceNum(s.uncollectedFees)}</div>
            </div>
            <div className="pc-metric">
              <div className="pc-metric-label">% sobre Capital</div>
              <div className="pc-metric-val green">
                {s.valueAtCreation > 0 ? ((s.totalFees / s.valueAtCreation) * 100).toFixed(2) : "0.00"}%
              </div>
            </div>
            <div className="pc-metric">
              <div className="pc-metric-label">APR Fees</div>
              <div className="pc-metric-val green">{s.aprFees.toFixed(1)}%</div>
            </div>
            <div className="pc-metric" />
          </div>

          {/* Proyección Fees */}
          <div className="pc-section-title">Proyección Fees</div>
          <div className="pc-grid4">
            {["Diario", "Semanal", "Mensual", "Anual"].map((label, i) => {
              const mult = [1/365, 7/365, 30/365, 1][i];
              const proj = s.valueAtCreation * (s.aprFees / 100) * mult;
              const pct  = s.aprFees * mult;
              return (
                <div key={label} className="pc-metric">
                  <div className="pc-metric-label">{label}</div>
                  <div className="pc-metric-val green">${fmtPriceNum(proj)} ({pct.toFixed(2)}%)</div>
                </div>
              );
            })}
          </div>

          {/* Info */}
          <div className="pc-section-title">Info</div>
          <div className="pc-info-row">
            <span>Edad: {s.ageDays}d {s.ageHours}h</span>
            <span>NFT: #{pos.tokenId}</span>
            <span>Chain: {pos.chainName}</span>
            <span>DEX: uniswap_v3</span>
            <span>Pool: <span className="pc-addr">{pos.poolAddress ? pos.poolAddress.slice(0,8)+"..."+pos.poolAddress.slice(-4) : "—"}</span></span>
          </div>

          {/* Footer actions */}
          <div className="pc-actions">
            <a href={poolUrl} target="_blank" rel="noreferrer" className="pc-btn-link">🔗 Ver en Uniswap</a>
            <button className="pc-btn-close" onClick={() => setExpanded(false)}>Cerrar</button>
            <button className="pc-btn-remove" onClick={() => onRemove(pos.tokenId)}>🗑 Eliminar pool</button>
          </div>
        </div>
      )}
    </div>
  );
}

function HedgeTab() {
  const [scanOpen, setScanOpen] = useState(false);
  const [pools, setPools]       = useState([]);
  const [activity, setActivity] = useState([]);

  const handleImport = (imported) => {
    setPools(prev => {
      const existing = new Set(prev.map(p => p.tokenId));
      return [...prev, ...imported.filter(p => !existing.has(p.tokenId))];
    });
    setActivity(prev => [
      ...imported.map(p => ({
        id:    p.tokenId,
        pair:  `${p.token0Symbol}/${p.token1Symbol}`,
        chain: p.chainName,
        time:  new Date().toLocaleString("es-CO", { day:"2-digit", month:"short", hour:"2-digit", minute:"2-digit" }),
      })),
      ...prev,
    ]);
  };

  const inRange = pools.filter(p => p.status.label === "En Rango").length;

  return (
    <>
      <ScanModal open={scanOpen} onClose={() => setScanOpen(false)} onImport={handleImport} />

      <div className="stats-grid">
        {[
          { label: "Pools LP",          value: pools.length.toString() },
          { label: "Valor LP",          value: "$0.00" },
          { label: "Pos. Abiertas",     value: inRange.toString() },
          { label: "PNL No Realizado",  value: "+$0.00", success: true },
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
        pools.map(pos => <PoolCard key={pos.tokenId} pos={pos} onRemove={(id) => setPools(p => p.filter(x => x.tokenId !== id))} />)
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
// APP
// ════════════════════════════════════════════════════════════════════
const TABS = ["Wallets","Hedge (Haragán)","Trading (Avaro)","Insider (Catador)","Copy Trading (Espía)","Backtesting 2024–25"];
const TABS_WITH_BADGE = ["Insider (Catador)","Copy Trading (Espía)"];
const NAV_ITEMS = ["Dashboard","Programa","Preguntas"];

export default function App() {
  const [activeTab, setActiveTab]     = useState("Hedge (Haragán)");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const closeSidebar = () => setSidebarOpen(false);

  const renderTab = () => {
    switch (activeTab) {
      case "Wallets":           return <WalletsTab />;
      case "Hedge (Haragán)":   return <HedgeTab />;
      default:                  return <ComingSoonTab name={activeTab} />;
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="app">
        <div className={`overlay ${sidebarOpen ? "open" : ""}`} onClick={closeSidebar} />

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
            <div className="nav-item" onClick={closeSidebar}>WhatsApp</div>
            <div className="nav-item" onClick={closeSidebar}>Email</div>
          </div>
          <div className="sidebar-spacer" />
          <div className="user-info">
            <div className="user-avatar">OB</div>
            <div style={{ minWidth:0 }}>
              <div className="user-name">Oscar Bolanos</div>
              <div className="user-plan">Gratuito</div>
            </div>
          </div>
        </div>

        <div className="main">
          <div className="topbar">
            <div className="topbar-row">
              <button className="hamburger" onClick={() => setSidebarOpen(true)}>☰</button>
              <span className="page-title">Liquidity Engine</span>
              <span className="beta-tag">BETA</span>
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
          <div className="content">{renderTab()}</div>
        </div>
      </div>
    </>
  );
}