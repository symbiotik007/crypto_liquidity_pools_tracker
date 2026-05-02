import { useState, useEffect, useCallback } from "react";
import { usePoolsSync, useCoberturas } from "./lib/useSupabaseSync";
import { useAuth } from "./lib/AuthContext";

// ── HL helpers (re-declared aquí para no importar de App.jsx) ─────────────────
const _PROXY  = import.meta.env.VITE_REVERT_PROXY_URL ?? ''
const HL_INFO = _PROXY ? `${_PROXY}/hl-info/info`     : 'https://api.hyperliquid.xyz/info'
const HL_API  = _PROXY ? `${_PROXY}/hl-info/exchange` : 'https://api.hyperliquid.xyz/exchange'

async function fetchHlPositions(address) {
  try {
    const res = await fetch(HL_INFO, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "clearinghouseState", user: address }),
    });
    const perp = await res.json();
    return {
      balance:   parseFloat(perp?.marginSummary?.accountValue ?? "0"),
      positions: (perp?.assetPositions ?? []).map(p => ({
        coin:       p.position?.coin,
        size:       parseFloat(p.position?.szi ?? "0"),
        entryPrice: parseFloat(p.position?.entryPx ?? "0"),
        pnl:        parseFloat(p.position?.unrealizedPnl ?? "0"),
        leverage:   parseFloat(p.position?.leverage?.value ?? "1"),
        margin:     parseFloat(p.position?.marginUsed ?? "0"),
        liqPrice:   parseFloat(p.position?.liquidationPx ?? "0"),
      })),
    };
  } catch { return { balance: 0, positions: [] }; }
}

async function fetchHlMids() {
  try {
    const res = await fetch(HL_INFO, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "allMids" }),
    });
    return await res.json();
  } catch { return {}; }
}

// ── Formatters ────────────────────────────────────────────────────────────────
const fmtUsd   = (v) => `${v >= 0 ? "+" : ""}$${Math.abs(v).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const fmtP     = (v) => Number(v).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const fmtPct   = (v) => `${v >= 0 ? "+" : ""}${Number(v).toFixed(2)}%`;
const fmtAge   = (ts) => {
  const ms  = Date.now() - ts;
  const h   = Math.floor(ms / 3600000);
  const m   = Math.floor((ms % 3600000) / 60000);
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
};

// ── CSS ───────────────────────────────────────────────────────────────────────
const CSS = `
  .ht-wrap { display:flex; flex-direction:column; gap:12px; }
  .ht-stats { display:grid; grid-template-columns:repeat(4,1fr); gap:10px; margin-bottom:4px; }
  .ht-stat  { background:#070d14; border:1px solid #0e2435; padding:14px 16px; }
  .ht-stat-lbl { font-size:10px; letter-spacing:2px; color:#2a5a72; text-transform:uppercase; margin-bottom:6px; }
  .ht-stat-val { font-size:20px; font-weight:800; color:#c8e6f0; }
  .ht-stat-val.green { color:#00ff88; }
  .ht-stat-val.red   { color:#ff4f6e; }
  .ht-stat-val.cyan  { color:#00e5ff; }
  @media(max-width:768px){
    .ht-stats { grid-template-columns:repeat(2,1fr); }
    .ht-stat-val { font-size:18px; }
    .ht-body { grid-template-columns:1fr 1fr; }
    .ht-metric:nth-child(3n) { border-right:1px solid #0e2435; }
    .ht-metric:nth-child(2n) { border-right:none; }
  }
  @media(max-width:480px){
    .ht-stats { grid-template-columns:repeat(2,1fr); gap:8px; }
    .ht-stat { padding:10px 12px; }
    .ht-stat-val { font-size:16px; }
    .ht-body { grid-template-columns:1fr; }
    .ht-metric { border-right:none !important; }
    .ht-pnl-row { gap:10px; }
    .ht-pnl-big { font-size:18px; }
    .ht-card-header { padding:10px 12px; gap:6px; }
    .ht-pair { font-size:13px; }
  }

  .ht-section-title {
    font-size:10px; letter-spacing:2px; color:#2a5a72; text-transform:uppercase;
    padding:10px 0 6px; border-top:1px solid #0e2435; margin-top:4px;
    display:flex; align-items:center; gap:8px;
  }
  .ht-section-title .ht-count {
    background:#0e2435; border:1px solid #1a3a5e; color:#4a7a96;
    font-size:10px; padding:1px 7px; border-radius:10px;
  }

  .ht-card { background:#070d14; border:1px solid #0e2435; margin-bottom:8px; transition:border-color 0.2s; }
  .ht-card.active-below  { border-color:#5a1a28; box-shadow:0 0 16px rgba(255,79,110,0.08); }
  .ht-card.active-above  { border-color:#5a3a00; box-shadow:0 0 16px rgba(255,179,71,0.08); }
  .ht-card.closed        { opacity:0.6; }

  .ht-card-header {
    display:flex; align-items:center; gap:10px; padding:12px 16px;
    border-bottom:1px solid #0e2435; flex-wrap:wrap;
  }
  .ht-pair  { font-size:15px; font-weight:700; color:#c8d8e8; }
  .ht-badge {
    font-size:10px; padding:2px 8px; letter-spacing:0.5px;
    text-transform:uppercase; white-space:nowrap; font-weight:700;
  }
  .ht-short-badge {
    background:#0d0a1a; border:1px solid #7a40cc;
    color:#c8a0ff; font-size:10px; padding:2px 8px;
    letter-spacing:0.5px; font-weight:700;
  }
  .ht-chain { font-size:11px; padding:2px 7px; background:#0a1a24; border:1px solid #1a3a4e; color:#4a7a96; }
  .ht-age   { font-size:11px; color:#2a5a72; margin-left:auto; }

  .ht-body { display:grid; grid-template-columns:1fr 1fr 1fr; gap:0; }
  @media(max-width:768px) { .ht-body { grid-template-columns:1fr 1fr; } }

  .ht-metric { padding:12px 16px; border-right:1px solid #0e2435; border-bottom:1px solid #0e2435; }
  .ht-metric:nth-child(3n) { border-right:none; }
  .ht-metric-lbl { font-size:9px; letter-spacing:1.5px; color:#2a5a72; text-transform:uppercase; margin-bottom:5px; }
  .ht-metric-val { font-size:14px; font-weight:700; color:#7ab8d4; }
  .ht-metric-val.green { color:#00ff88; }
  .ht-metric-val.red   { color:#ff4f6e; }
  .ht-metric-val.cyan  { color:#00e5ff; }
  .ht-metric-sub { font-size:10px; color:#2a4a5e; margin-top:2px; }

  .ht-pnl-row {
    padding:14px 16px; border-top:1px solid #0e2435;
    display:flex; align-items:center; gap:16px; flex-wrap:wrap;
  }
  .ht-pnl-big { font-size:22px; font-weight:800; }
  .ht-pnl-big.green { color:#00ff88; }
  .ht-pnl-big.red   { color:#ff4f6e; }
  .ht-pnl-label { font-size:10px; letter-spacing:1.5px; text-transform:uppercase; color:#2a5a72; margin-top:2px; }

  .ht-actions {
    padding:10px 16px; border-top:1px solid #0e2435;
    display:flex; gap:8px; flex-wrap:wrap; align-items:center;
  }
  .ht-btn-link { font-size:11px; color:#7ab8d4; text-decoration:none; padding:5px 10px; border:1px solid #1a3a4e; background:transparent; transition:all 0.15s; }
  .ht-btn-link:hover { border-color:#00e5ff; color:#00e5ff; }
  .ht-btn-close-pos {
    font-size:11px; color:#ff4f6e; background:transparent; border:1px solid #5a1a28;
    padding:5px 12px; cursor:pointer; font-family:'Outfit',sans-serif; transition:all 0.15s;
  }
  .ht-btn-close-pos:hover { background:#1a0810; }
  .ht-btn-close-pos:disabled { opacity:0.4; cursor:not-allowed; }
  .ht-last-refresh { font-size:11px; color:#2a5a72; margin-left:auto; }

  .ht-empty {
    background:#070d14; border:1px solid #0e2435;
    padding:40px 24px; text-align:center;
  }
  .ht-empty-icon  { font-size:36px; margin-bottom:12px; }
  .ht-empty-title { font-size:15px; font-weight:700; color:#4a7a96; margin-bottom:6px; }
  .ht-empty-sub   { font-size:13px; color:#2a5a72; line-height:1.7; }

  .ht-hist-row {
    display:flex; align-items:center; gap:10px; padding:10px 16px;
    border-bottom:1px solid #070d14; font-size:12px; flex-wrap:wrap;
  }
  .ht-hist-row:last-child { border-bottom:none; }
  .ht-hist-tag { font-size:9px; padding:2px 7px; font-weight:700; letter-spacing:0.5px; }

  .ht-no-match {
    background:#0d0810; border:1px solid #3a1a4a;
    padding:8px 12px; font-size:11px; color:#9a70aa; margin-top:4px;
  }
`;

// ── Componente principal ──────────────────────────────────────────────────────
export default function HedgeTrackerTab() {
  const { user }  = useAuth();
  const { pools } = usePoolsSync(user?.id);
  const { activas, historial, abrir: abrirCobertura, cerrar: cerrarCobertura, reload: reloadCoberturas } = useCoberturas(user?.id);

  const [hlData,      setHlData]      = useState({});
  const [mids,        setMids]        = useState({});
  const [lastRefresh, setLastRefresh] = useState(null);
  const [loading,     setLoading]     = useState(false);
  const [closing,     setClosing]     = useState({});  // { id: true }

  const hlWallets = (() => {
    try { return JSON.parse(localStorage.getItem("hl_wallets") || "[]"); } catch { return []; }
  })();

  // También sincroniza localStorage para compatibilidad con ProtectionModal existente
  const protections = activas;
  const history     = historial;

  // ── Refresh HL live data ──────────────────────────────────────────
  const refresh = useCallback(async () => {
    setLoading(true);
    const [newMids, ...posResults] = await Promise.all([
      fetchHlMids(),
      ...hlWallets.map(w => fetchHlPositions(w.address).then(d => ({ addr: w.address, ...d }))),
    ]);
    setMids(newMids);
    const newHlData = {};
    posResults.forEach(r => { newHlData[r.addr] = { balance: r.balance, positions: r.positions }; });
    setHlData(newHlData);
    setLastRefresh(new Date());
    setLoading(false);
  }, [hlWallets.map(w => w.address).join(",")]); // eslint-disable-line

  useEffect(() => {
    refresh();
    const t = setInterval(refresh, 10000);
    return () => clearInterval(t);
  }, [refresh]);

  // ── Cerrar SHORT — siempre usa el ID único de Supabase ────────────
  const closeShort = async (prot) => {
    const key = prot.id;   // ID único de Supabase — sin ambigüedad
    setClosing(prev => ({ ...prev, [key]: true }));

    const currentPrice = parseFloat(mids[prot.coin?.replace("-PERP","")] ?? prot.openPrice);
    const hlPos = !prot._demo
      ? (hlData[hlWallets.find(w => w.id === prot.walletId)?.address]?.positions ?? [])
          .find(p => p.coin === prot.coin?.replace("-PERP","") && p.size < 0)
      : null;
    const pnl = hlPos ? hlPos.pnl : (prot.openPrice - currentPrice) * Math.abs(parseFloat(prot.size ?? "0"));

    if (!prot._demo) {
      try {
        const wallet = hlWallets.find(w => w.id === prot.walletId);
        if (!wallet?.privateKey) { alert("No se encontró la API key"); setClosing(prev => { const n={...prev}; delete n[key]; return n; }); return; }
        const sizeToClose = hlPos ? Math.abs(hlPos.size) : Math.abs(parseFloat(prot.size));
        await fetch(HL_API, {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: { type:"order", orders:[{ a:0, b:true, p:"0", s:sizeToClose.toFixed(4), r:true, t:{ limit:{tif:"Ioc"} } }], grouping:"na" },
          }),
        });
      } catch (e) { alert("Error cerrando en HL: " + e.message); }
    }

    // Actualiza en Supabase (fuente de verdad)
    await cerrarCobertura(prot.id, { closePrice: currentPrice, finalPnl: pnl, closeReason: "manual" });

    // Sincroniza localStorage (para compatibilidad con ProtectionModal)
    const lsProts = JSON.parse(localStorage.getItem("hl_protections") || "[]");
    localStorage.setItem("hl_protections", JSON.stringify(lsProts.filter(p => p.id !== prot.id)));

    setClosing(prev => { const n = { ...prev }; delete n[key]; return n; });
    await refresh();
  };

  // ── Enrich protections with live data ────────────────────────────
  const enriched = protections.map(prot => {
    const isDemo   = !!prot._demo;
    const wallet   = isDemo ? { label:"Demo Wallet", address:"demo" } : hlWallets.find(w => w.id === prot.walletId);
    const walletAddr = wallet?.address ?? "";
    const walletData = hlData[walletAddr] ?? { positions: [] };
    const coinBase = prot.coin?.replace("-PERP","") ?? "";
    const hlPos    = isDemo ? null : walletData.positions.find(p => p.coin === coinBase && p.size < 0);
    const currentPrice = parseFloat(mids[coinBase] ?? prot.openPrice);
    // Demo pool: usa mock data directamente desde localStorage si no hay pool real
    const pool     = pools.find(p => String(p.tokenId) === String(prot.poolId));
    const demoPoolStatus = prot.openPrice > 0 && currentPrice < prot.openPrice
      ? { label:"Fuera (Abajo)", color:"#ff4f6e", bg:"#1a0810", border:"#5a1a28" }
      : { label:"Fuera (Arriba)", color:"#ffb347", bg:"#1a0e00", border:"#5a3a00" };
    const poolInRange = pool?.status?.label === "En Rango";
    const poolStatus  = pool?.status ?? (isDemo ? demoPoolStatus : null);
    const pnl      = hlPos
      ? hlPos.pnl
      : ((prot.openPrice - currentPrice) * Math.abs(parseFloat(prot.size)));
    const pnlPct   = prot.openPrice > 0
      ? ((prot.openPrice - currentPrice) / prot.openPrice) * parseFloat(prot.leverage) * 100
      : 0;
    const slPrice  = prot.openPrice * (1 + parseFloat(prot.stopLoss || 0) / 100);
    return { ...prot, wallet, hlPos, currentPrice, pool, poolInRange, poolStatus, pnl, pnlPct, slPrice, coinBase, isDemo };
  });

  // ── Totals ────────────────────────────────────────────────────────
  const totalPnl    = enriched.reduce((a, e) => a + (e.pnl || 0), 0);
  const totalMargin = enriched.reduce((a, e) => a + (e.hlPos?.margin || 0), 0);
  const activeCount = enriched.length;

  return (
    <>
      <style>{CSS}</style>
      <div className="ht-wrap">

        {/* ── Toolbar ── */}
        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:4 }}>
          <button className="action-btn" onClick={refresh} disabled={loading}>
            {loading ? "⟳ Actualizando..." : "↻ Actualizar"}
          </button>
          {lastRefresh && (
            <span className="ht-last-refresh">
              ↻ {lastRefresh.toLocaleTimeString("es-CO", { hour:"2-digit", minute:"2-digit", second:"2-digit" })}
              &nbsp;· Auto-refresh 10s
            </span>
          )}
        </div>

        {/* ── Stats bar ── */}
        <div className="ht-stats">
          <div className="ht-stat">
            <div className="ht-stat-lbl">Coberturas Activas</div>
            <div className="ht-stat-val cyan">{activeCount}</div>
          </div>
          <div className="ht-stat">
            <div className="ht-stat-lbl">PNL Total (Hedges)</div>
            <div className={`ht-stat-val ${totalPnl >= 0 ? "green" : "red"}`}>{fmtUsd(totalPnl)}</div>
          </div>
          <div className="ht-stat">
            <div className="ht-stat-lbl">Margen Desplegado</div>
            <div className="ht-stat-val">{totalMargin > 0 ? `$${fmtP(totalMargin)}` : "—"}</div>
          </div>
          <div className="ht-stat">
            <div className="ht-stat-lbl">Cerradas (historial)</div>
            <div className="ht-stat-val">{history.length}</div>
          </div>
        </div>

        {/* ── Coberturas activas ── */}
        <div className="ht-section-title">
          🛡 Coberturas Activas
          {activeCount > 0 && <span className="ht-count">{activeCount}</span>}
        </div>

        {activeCount === 0 ? (
          <div className="ht-empty">
            <div className="ht-empty-icon">🛡</div>
            <div className="ht-empty-title">Sin coberturas activas</div>
            <div className="ht-empty-sub">
              Cuando un pool salga del rango y configures una<br/>
              protección SHORT en Hyperliquid, aparecerá aquí<br/>
              con PNL en tiempo real.
            </div>
          </div>
        ) : (
          enriched.map((e) => {
            const isClosing   = !!closing[e.id];
            const pnlPositive = e.pnl >= 0;
            const cardClass   = `ht-card ${e.pool && !e.poolInRange ? "active-below" : ""}`;

            return (
              <div key={key} className={cardClass}>

                {/* Header */}
                <div className="ht-card-header">
                  <span className="ht-pair">
                    {e.pool ? `${e.pool.token0Symbol}/${e.pool.token1Symbol}` : `Pool #${e.poolId}`}
                  </span>

                  {/* Pool status */}
                  {e.poolStatus && (
                    <span className="ht-badge" style={{
                      color: e.poolStatus.color, background: e.poolStatus.bg,
                      border: `1px solid ${e.poolStatus.border}`,
                    }}>
                      {e.poolStatus.label}
                    </span>
                  )}

                  {/* SHORT badge */}
                  <span className="ht-short-badge">SHORT {e.coin}</span>

                  {/* Match HL indicator */}
                  {e.isDemo
                    ? <span style={{ fontSize:10, color:"#a78bfa", fontWeight:700, background:"#0d0820", border:"1px solid #3730a3", padding:"1px 7px" }}>🧪 DEMO</span>
                    : e.hlPos
                      ? <span style={{ fontSize:10, color:"#00ff88", fontWeight:700 }}>✓ Posición HL activa</span>
                      : <span style={{ fontSize:10, color:"#ff4f6e", fontWeight:700 }}>⚠ Sin match en HL</span>
                  }

                  {e.pool && <span className="ht-chain">{e.pool.chainName}</span>}
                  <span className="ht-age">🕐 {fmtAge(e.openedAt)}</span>
                </div>

                {/* Métricas grid */}
                <div className="ht-body">
                  <div className="ht-metric">
                    <div className="ht-metric-lbl">Precio Entrada</div>
                    <div className="ht-metric-val">${fmtP(e.openPrice)}</div>
                  </div>
                  <div className="ht-metric">
                    <div className="ht-metric-lbl">Precio Actual</div>
                    <div className="ht-metric-val cyan">${fmtP(e.currentPrice)}</div>
                  </div>
                  <div className="ht-metric">
                    <div className="ht-metric-lbl">Tamaño SHORT</div>
                    <div className="ht-metric-val">
                      {e.hlPos ? Math.abs(e.hlPos.size).toFixed(4) : e.size} {e.coinBase}
                    </div>
                  </div>
                  <div className="ht-metric">
                    <div className="ht-metric-lbl">Leverage</div>
                    <div className="ht-metric-val">{e.hlPos?.leverage ?? e.leverage}x</div>
                  </div>
                  <div className="ht-metric">
                    <div className="ht-metric-lbl">Stop Loss</div>
                    <div className="ht-metric-val red">${fmtP(e.slPrice)}</div>
                    <div className="ht-metric-sub">+{e.stopLoss}% desde entrada</div>
                  </div>
                  <div className="ht-metric">
                    <div className="ht-metric-lbl">Margen Usado</div>
                    <div className="ht-metric-val">{e.hlPos ? `$${fmtP(e.hlPos.margin)}` : "—"}</div>
                    <div className="ht-metric-sub">Isolated {e.leverage}x</div>
                  </div>
                  {e.pool && (
                    <>
                      <div className="ht-metric">
                        <div className="ht-metric-lbl">Rango Pool Min</div>
                        <div className="ht-metric-val">${fmtP(e.pool.priceLower)}</div>
                      </div>
                      <div className="ht-metric">
                        <div className="ht-metric-lbl">Rango Pool Max</div>
                        <div className="ht-metric-val">${fmtP(e.pool.priceUpper)}</div>
                      </div>
                      <div className="ht-metric">
                        <div className="ht-metric-lbl">Pool NFT</div>
                        <div className="ht-metric-val" style={{ fontSize:12 }}>#{e.pool.tokenId}</div>
                      </div>
                    </>
                  )}
                </div>

                {/* PNL grande */}
                <div className="ht-pnl-row">
                  <div>
                    <div className={`ht-pnl-big ${pnlPositive ? "green" : "red"}`}>
                      {fmtUsd(e.pnl)}
                    </div>
                    <div className="ht-pnl-label">
                      PNL No Realizado &nbsp;
                      <span style={{ color: pnlPositive ? "#00ff88" : "#ff4f6e" }}>
                        ({fmtPct(e.pnlPct)})
                      </span>
                    </div>
                  </div>

                  {/* Pool status inline */}
                  {e.pool && e.poolInRange && (
                    <div style={{ background:"#001a0e", border:"1px solid #003a22", padding:"8px 14px", fontSize:12, color:"#00ff88" }}>
                      ✓ Pool volvió al rango — considera cerrar el SHORT
                    </div>
                  )}
                  {!e.hlPos && !e.isDemo && (
                    <div className="ht-no-match">
                      No se encontró una posición SHORT activa en Hyperliquid para este hedge.
                      Puede haber sido cerrada externamente o aún no se refleja.
                    </div>
                  )}
                  {e.isDemo && (
                    <div style={{ background:"#0d0820", border:"1px solid #3730a344", padding:"8px 14px", fontSize:11, color:"#6b5fa0" }}>
                      🧪 <strong style={{color:"#a78bfa"}}>Cobertura demo</strong> — PNL calculado simulando un SHORT real.
                      En producción se sincroniza con tu posición en Hyperliquid.
                    </div>
                  )}
                </div>

                {/* Acciones */}
                <div className="ht-actions">
                  <a
                    href="https://app.hyperliquid.xyz/trade"
                    target="_blank" rel="noreferrer"
                    className="ht-btn-link"
                  >
                    🔗 Ver en HL
                  </a>
                  {e.pool && (
                    <a
                      href={`https://revert.finance/#/uniswap-position/arbitrum/${e.pool.tokenId}`}
                      target="_blank" rel="noreferrer"
                      className="ht-btn-link"
                    >
                      📊 Revert
                    </a>
                  )}
                  <button
                    className="ht-btn-close-pos"
                    disabled={isClosing}
                    onClick={() => closeShort(e)}
                  >
                    {isClosing ? "⟳ Cerrando..." : "❌ Cerrar SHORT"}
                  </button>
                </div>
              </div>
            );
          })
        )}

        {/* ── Historial ── */}
        <div className="ht-section-title">
          📋 Historial de Coberturas
          {history.length > 0 && <span className="ht-count">{history.length}</span>}
        </div>

        {history.length === 0 ? (
          <div style={{ fontSize:12, color:"#2a5a72", padding:"16px 0" }}>
            Las coberturas cerradas aparecerán aquí.
          </div>
        ) : (
          <div style={{ background:"#070d14", border:"1px solid #0e2435" }}>
            {history.map((h, i) => {
              const pnlPos = (h.finalPnl ?? 0) >= 0;
              const reason = {
                manual:   "🖐 Cierre manual",
                sl:       "🔴 SL alcanzado",
                tp:       "🟢 TP alcanzado",
                reentry:  "↩ Pool re-entró al rango",
              }[h.closeReason] ?? "Cerrado";

              return (
                <div key={i} className="ht-hist-row">
                  <span className="ht-hist-tag" style={{
                    background:"#1a1020", border:"1px solid #3a1a5a", color:"#9a70cc",
                  }}>
                    CERRADO
                  </span>
                  <span style={{ fontWeight:700, color:"#c8d8e8" }}>{h.coin}</span>
                  <span style={{ color:"#4a7a96" }}>Pool #{h.poolId}</span>
                  <span className={pnlPos ? "green" : "red"} style={{ fontWeight:700, fontSize:13 }}>
                    {fmtUsd(h.finalPnl ?? 0)}
                  </span>
                  <span style={{ color:"#2a5a72" }}>{fmtAge(h.openedAt)} activo</span>
                  <span style={{ color:"#4a7a96" }}>{reason}</span>
                  <span style={{ color:"#1a3a5e", marginLeft:"auto", fontSize:10 }}>
                    {new Date(h.closedAt).toLocaleDateString("es-CO")} {new Date(h.closedAt).toLocaleTimeString("es-CO",{hour:"2-digit",minute:"2-digit"})}
                  </span>
                </div>
              );
            })}
          </div>
        )}

        {/* ── Info wallets ── */}
        {hlWallets.length === 0 && (
          <div style={{ background:"#0d0a1a", border:"1px solid #3a1a5a", padding:"16px", fontSize:13, color:"#9a70cc", marginTop:8 }}>
            ⚠ No hay wallets configuradas. Ve a la pestaña <strong>Wallets</strong> para agregar tu wallet de Hyperliquid.
          </div>
        )}
      </div>
    </>
  );
}
