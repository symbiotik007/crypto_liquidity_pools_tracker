import { useState, useEffect, useRef } from "react";
import { useAuth } from "../../../lib/AuthContext";
import { usePoolsSync, useActividadPools } from "../../../lib/useSupabaseSync";
import PoolCard from "./PoolCard";
import { enrichPoolsWithMarketData } from "../services/revertService";

export default function TradingTab() {
  const { user } = useAuth()
  const { pools, setPools, removePool } = usePoolsSync(user?.id)
  const { registrar: registrarActividad } = useActividadPools(user?.id)
  const poolsRef = useRef([])

  useEffect(() => {
    poolsRef.current = pools
  }, [pools])

  const refreshTradingPools = async () => {
    if (poolsRef.current.length === 0) return
    const enriched = await enrichPoolsWithMarketData(poolsRef.current)
    setPools(enriched)
    localStorage.setItem("liquidity_engine_pools", JSON.stringify(enriched))
  }

  useEffect(() => {
    refreshTradingPools()
    const interval = setInterval(refreshTradingPools, 10000)
    return () => clearInterval(interval)
  }, []) // eslint-disable-line

  useEffect(() => {
    if (pools.length > 0) refreshTradingPools()
  }, [pools.length]) // eslint-disable-line

  const handleRemove = async (tokenId) => {
    await removePool(tokenId)
    await registrarActividad({
      poolId: tokenId,
      pair:   "Pool eliminada",
      chain:  "",
      action: "removed",
    })
  }

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
            onRemove={handleRemove}
            mode="trading"
          />
        ))
      )}
    </>
  );
}
