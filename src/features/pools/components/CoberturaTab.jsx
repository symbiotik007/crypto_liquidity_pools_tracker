import { useState, useEffect, useRef } from "react";
import { useAuth } from "../../../lib/AuthContext";
import { usePoolsSync, useActividadPools } from "../../../lib/useSupabaseSync";
import ScanModal from "../../scanner/components/ScanModal";
import PoolCard from "./PoolCard";
import { enrichPoolsWithMarketData } from "../services/revertService";

export default function CoberturaTab() {
  const { user } = useAuth()
  const { pools, setPools, loading: poolsLoading, addPool, removePool } = usePoolsSync(user?.id)
  const { actividad: activity, registrar: registrarActividad } = useActividadPools(user?.id)

  const [scanOpen, setScanOpen]       = useState(false);
  const [lastRefresh, setLastRefresh] = useState(null);
  const [revertLoading, setRevertLoading] = useState(false);
  const poolsRef          = useRef([]);
  const initialDoneRef    = useRef(false);

  useEffect(() => {
    poolsRef.current = pools;
  }, [pools]);

  const refreshAll = async () => {
    if (poolsRef.current.length === 0) return;
    setRevertLoading(true);
    const enriched = await enrichPoolsWithMarketData(poolsRef.current);
    setPools(enriched);
    localStorage.setItem("liquidity_engine_pools", JSON.stringify(enriched));
    setLastRefresh(new Date());
    setRevertLoading(false);
  };

  useEffect(() => {
    if (pools.length > 0 && !initialDoneRef.current && !poolsLoading) {
      initialDoneRef.current = true;
      refreshAll();
    }
  }, [pools.length, poolsLoading]); // eslint-disable-line

  useEffect(() => {
    const interval = setInterval(refreshAll, 30000);
    return () => clearInterval(interval);
  }, []); // eslint-disable-line

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

    for (const p of toAdd) {
      await registrarActividad({
        poolId: p.tokenId,
        pair:   `${p.token0Symbol}/${p.token1Symbol}`,
        chain:  p.chainName,
        action: 'imported',
      });
    }
  };

  const handleRemove = async (tokenId) => {
    await removePool(tokenId);
    await registrarActividad({
      poolId: tokenId,
      pair:   "Pool eliminada",
      chain:  "",
      action: 'removed',
    });
  };

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

      {pools.some(p => p._noLiveData) && (
        <div style={{
          margin: "12px 0",
          padding: "10px 14px",
          background: "#0e1820",
          border: "1px solid #1a3a5e",
          borderRadius: "8px",
          color: "#7a9ab0",
          fontSize: "13px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}>
          <span style={{ color: "#4a8ab0", fontSize: "16px" }}>⚠</span>
          <span>
            Datos en tiempo real no disponibles. Los precios y estados mostrados
            son estimaciones basadas en los datos de importación.
            {!import.meta.env.VITE_REVERT_PROXY_URL && " Configura el proxy de Revert para habilitar precios en vivo."}
          </span>
        </div>
      )}

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
