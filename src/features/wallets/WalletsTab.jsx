import { useState, useEffect } from "react";
import { useAuth } from "../../lib/AuthContext";
import "./WalletsTab.css";
import { useWalletsSync } from "../../lib/useSupabaseSync";
import { hlGetPositions, hlGetAllMids } from "./services/hlService";
import { WALLET_TYPES, EXCHANGES } from "./constants";

export default function WalletsTab() {
  const { user } = useAuth()
  const { wallets, loading: walletsLoading, addWallet, removeWallet } = useWalletsSync(user?.id)

  const [modalOpen, setModalOpen]       = useState(false);
  const [selectedType, setSelectedType] = useState("proteccion");
  const [selectedExchange, setSelectedExchange] = useState("hyperliquid");
  const [walletName, setWalletName]     = useState("");
  const [address, setAddress]           = useState("");
  const [apiKey, setApiKey]             = useState("");
  const [agentWallet, setAgentWallet]   = useState("");
  const [cexApiKey, setCexApiKey]       = useState("");
  const [cexSecret, setCexSecret]       = useState("");
  const [cexPassphrase, setCexPassphrase] = useState("");
  const [saving, setSaving]             = useState(false);
  const [saveError, setSaveError]       = useState("");

  const [balances, setBalances] = useState({});
  const [positions, setPositions] = useState({});
  const [prices, setPrices]   = useState({});
  const [lastUpdated, setLastUpdated] = useState(null);
  const [tick, setTick] = useState(0); // forces "hace Xs" re-render
  const [copiedId, setCopiedId] = useState(null);

  // Live "hace Xs" counter — re-render every 5s
  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 5000);
    return () => clearInterval(id);
  }, []);

  const refreshBalances = async () => {
    const mids = await hlGetAllMids().catch(() => ({}));
    setPrices(mids);
    for (const w of wallets) {
      try {
        const data = await hlGetPositions(w.address);
        setBalances(prev => ({ ...prev, [w.id]: data.balance }));
        setPositions(prev => ({ ...prev, [w.id]: {
          positions:    data.positions,
          spotBalances: data.spotBalances,
          spotTotal:    data.spotTotal,
          perpEquity:   data.perpEquity,
        }}));
      } catch {}
    }
    setLastUpdated(Date.now());
  };

  useEffect(() => {
    if (wallets.length > 0) refreshBalances();
    const interval = setInterval(refreshBalances, 15000);
    return () => clearInterval(interval);
  }, [wallets.length]);

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
    setCexApiKey(""); setCexSecret(""); setCexPassphrase("");
    setSelectedType("proteccion"); setSelectedExchange("hyperliquid"); setSaveError("");
  };

  const exchDef = EXCHANGES.find(e => e.id === selectedExchange);

  const handleAdd = async () => {
    if (!walletName.trim()) return setSaveError("Nombre requerido");
    setSaving(true); setSaveError("");
    try {
      if (!exchDef.isCex) {
        if (!address.match(/^0x[0-9a-fA-F]{40}$/)) { setSaving(false); return setSaveError("Dirección inválida (0x + 40 hex)"); }
        const cleanKey = apiKey.startsWith("0x") ? apiKey.slice(2) : apiKey;
        if (!/^[0-9a-fA-F]{64}$/.test(cleanKey)) { setSaving(false); return setSaveError("Private Key debe ser 64 caracteres hex"); }
        let derivedAgent = agentWallet;
        if (!derivedAgent && window.ethers) {
          try { const w = new window.ethers.Wallet("0x" + cleanKey); derivedAgent = w.address; } catch {}
        }
        const data = await hlGetPositions(address);
        await addWallet({ label: walletName, address, agentAddress: derivedAgent, purpose: selectedType, privateKey: "0x" + cleanKey, exchange: "hyperliquid" });
        setBalances(prev => ({ ...prev, [address]: data.balance }));
        setPositions(prev => ({ ...prev, [address]: { positions: data.positions, spotBalances: data.spotBalances, spotTotal: data.spotTotal, perpEquity: data.perpEquity } }));
      } else {
        if (!cexApiKey.trim()) { setSaving(false); return setSaveError("API Key requerida"); }
        if (!cexSecret.trim()) { setSaving(false); return setSaveError("Secret Key requerida"); }
        if (exchDef.hasPassphrase && !cexPassphrase.trim()) { setSaving(false); return setSaveError("Passphrase requerida para " + exchDef.name); }
        const credentials = JSON.stringify({ apiKey: cexApiKey.trim(), secret: cexSecret.trim(), passphrase: cexPassphrase.trim() || undefined });
        await addWallet({ label: walletName, address: cexApiKey.trim().slice(0, 8) + "...", agentAddress: null, purpose: selectedType, privateKey: credentials, exchange: selectedExchange });
      }
      setModalOpen(false); resetForm();
    } catch (e) {
      setSaveError(e.message || "Error al guardar");
    }
    setSaving(false);
  };

  const handleRemove = async (id) => {
    await removeWallet(id);
    setBalances(prev => { const n = { ...prev }; delete n[id]; return n; });
    setPositions(prev => { const n = { ...prev }; delete n[id]; return n; });
  };

  const purposeColor = { proteccion: "var(--color-accent)", trading: "var(--color-success)", insider: "var(--color-warning)", copy: "var(--text-dim)" };
  const purposeLabel = { proteccion: "Protección", trading: "Trading", insider: "Insider", copy: "Copy" };
  const exchColor = (id) => EXCHANGES.find(e => e.id === id)?.color || "#4a7a96";
  const exchName  = (id) => EXCHANGES.find(e => e.id === id)?.name  || id;

  // Total portfolio
  const totalPortfolio = wallets.reduce((acc, w) => acc + (balances[w.id] || 0), 0);
  const fmtUsd = (n) => `$${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  const exchInitials = (id) => {
    const map = { hyperliquid: "HL", binance: "BN", bybit: "BB", okx: "OK", bitget: "BG", kucoin: "KC" };
    return map[id] || (exchName(id || "hyperliquid").slice(0, 2).toUpperCase());
  };

  // "hace Xs" relative time. Tick keeps it live.
  void tick;
  const lastUpdatedLabel = (() => {
    if (!lastUpdated) return "Conectando…";
    const s = Math.max(0, Math.floor((Date.now() - lastUpdated) / 1000));
    if (s < 5)   return "Justo ahora";
    if (s < 60)  return `Hace ${s}s`;
    const m = Math.floor(s / 60);
    return `Hace ${m}m`;
  })();

  const handleCopy = (addr, id) => {
    if (!addr) return;
    try {
      navigator.clipboard.writeText(addr);
      setCopiedId(id);
      setTimeout(() => setCopiedId(c => (c === id ? null : c)), 1500);
    } catch {}
  };

  const refTokens = ["ETH", "BTC", "SOL"].filter(s => prices[s]);

  return (
    <>
      {/* ── Hero portfolio banner ─────────────────────────────────── */}
      <div className="wallets-hero">
        <div>
          <div className="wallets-hero-label">Portfolio total</div>
          <div className="wallets-hero-value">
            {wallets.length > 0 ? fmtUsd(totalPortfolio) : "—"}
          </div>
          <div className="wallets-hero-sub">
            {wallets.length === 0
              ? "Conecta tu primera wallet para empezar a monitorear."
              : `${wallets.length} wallet${wallets.length === 1 ? "" : "s"} conectada${wallets.length === 1 ? "" : "s"} · datos en tiempo real`}
          </div>
        </div>
        {wallets.length > 0 && (
          <div className="wallets-hero-meta">
            <span className="live-pill">
              <span className="live-dot" />
              Live
            </span>
            <div style={{ fontSize: 11, color: "var(--text-dim)", letterSpacing: 0.04, fontVariantNumeric: "tabular-nums" }}>
              {lastUpdatedLabel} · auto cada 15s
            </div>
          </div>
        )}
      </div>

      {/* ── Reference price ticker ─────────────────────────────────── */}
      {refTokens.length > 0 && (
        <div className="price-ticker">
          <span className="price-ticker-label">Referencia</span>
          {refTokens.map(sym => (
            <span key={sym} className="price-ticker-item">
              <span className="price-ticker-symbol">{sym}</span>
              <span className="price-ticker-value">
                {fmtUsd(parseFloat(prices[sym]))}
              </span>
            </span>
          ))}
        </div>
      )}

      {/* ── Section header ─────────────────────────────────────────── */}
      <div className="wallets-section">
        <div className="wallets-section-header">
          <span className="wallets-section-title">
            Mis Wallets
            <span className="wallets-count-chip">{wallets.length}</span>
          </span>
          <button className="btn-add-wallet" onClick={() => setModalOpen(true)}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M6 2v8M2 6h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
            Añadir
          </button>
        </div>

        {wallets.length === 0 ? (
          <div className="wallets-empty">
            <div className="wallets-empty-icon">💼</div>
            <div className="wallets-empty-title">No tienes wallets configuradas</div>
            <div className="wallets-empty-sub">
              Conecta una wallet de Hyperliquid o un exchange centralizado para monitorear balances, posiciones abiertas y operar de forma automatizada.
            </div>
            <button className="btn-add-wallet" onClick={() => setModalOpen(true)}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M6 2v8M2 6h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
              Conectar primera wallet
            </button>
          </div>
        ) : (
          <div className="wallets-list">
            {wallets.map(w => {
              const bal      = balances[w.id];
              const posData  = positions[w.id] || {};
              const pos      = posData.positions || [];
              const spotBals = (posData.spotBalances || []).filter(b => b.total > 0);
              const exColor  = exchColor(w.exchange);
              const purpColor = purposeColor[w.purpose] || "#4a7a96";
              const isCopied = copiedId === w.id;
              const hasSplit = (positions[w.id]?.spotTotal > 0) && (positions[w.id]?.perpEquity > 0);

              return (
                <div key={w.id} className="wallet-card">
                  {/* Top row: avatar · identity · balance · actions */}
                  <div className="wallet-card-row">
                    <div
                      className="exch-avatar"
                      style={{
                        background: `linear-gradient(135deg, ${exColor}26 0%, ${exColor}10 100%)`,
                        border: `1px solid ${exColor}55`,
                        color: exColor,
                        boxShadow: `0 4px 14px ${exColor}1a`,
                      }}
                    >
                      {exchInitials(w.exchange)}
                    </div>

                    <div className="wallet-identity">
                      <div className="wallet-name-row">
                        <span className="wallet-name">{w.label}</span>
                        <span className="wallet-chip" style={{
                          color: exColor,
                          border: `1px solid ${exColor}55`,
                          background: `${exColor}10`,
                        }}>
                          {exchName(w.exchange || "hyperliquid")}
                        </span>
                        <span className="wallet-chip" style={{
                          color: purpColor,
                          border: `1px solid ${purpColor}55`,
                          background: `${purpColor}10`,
                        }}>
                          {purposeLabel[w.purpose] || w.purpose}
                        </span>
                      </div>
                      <div className="wallet-address-row">
                        <span className="wallet-address">
                          {w.address?.slice(0, 10)}…{w.address?.slice(-6)}
                        </span>
                        <button
                          className={`wallet-copy-btn ${isCopied ? "copied" : ""}`}
                          title={isCopied ? "Copiado" : "Copiar dirección"}
                          onClick={() => handleCopy(w.address, w.id)}
                        >
                          {isCopied ? (
                            <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                              <path d="M2 6.5L4.5 9L10 3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          ) : (
                            <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                              <rect x="3.5" y="3.5" width="6.5" height="6.5" rx="1.2" stroke="currentColor" strokeWidth="1.3"/>
                              <path d="M2 8V2.8c0-.4.4-.8.8-.8H8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                            </svg>
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="wallet-balance">
                      <div className="wallet-balance-label">Balance</div>
                      <div className={`wallet-balance-value ${bal === undefined ? "empty" : ""}`}>
                        {bal !== undefined ? fmtUsd(bal) : "—"}
                      </div>
                      {hasSplit && (
                        <div className="wallet-balance-split">
                          Spot <b>{fmtUsd(positions[w.id].spotTotal)}</b> · Perp <b>{fmtUsd(positions[w.id].perpEquity)}</b>
                        </div>
                      )}
                    </div>

                    <button
                      className="wallet-remove-btn"
                      onClick={() => handleRemove(w.id)}
                      title="Eliminar wallet"
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M2.5 3.5h9M5.5 3.5V2.5h3v1M3.5 3.5l.6 8c.04.4.4.8.8.8h4.2c.4 0 .76-.4.8-.8l.6-8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>

                  {/* SPOT */}
                  {spotBals.length > 0 && (
                    <div className="wallet-section">
                      <div className="wallet-section-label">Spot Holdings</div>
                      <div className="spot-grid">
                        {spotBals.map((b, i) => {
                          const usd = prices[b.coin] ? parseFloat(prices[b.coin]) * b.total : null;
                          return (
                            <div key={i} className="spot-chip">
                              <div className="spot-chip-head">
                                <span className="spot-chip-symbol">{b.coin}</span>
                                {usd !== null && <span className="spot-chip-usd">{fmtUsd(usd)}</span>}
                              </div>
                              <div className="spot-chip-amount">
                                {b.total.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 6 })}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* POSITIONS */}
                  {pos.length > 0 && (
                    <div className="wallet-section">
                      <div className="wallet-section-label">Posiciones abiertas</div>
                      <div className="pos-grid">
                        {pos.map((p, i) => {
                          const isLong = p.side === "Long";
                          return (
                            <div key={i} className="pos-card">
                              <div className="pos-card-head">
                                <span className="pos-card-coin">{p.coin}</span>
                                <span className={`pos-side ${isLong ? "long" : "short"}`}>{p.side}</span>
                              </div>
                              <div className="pos-meta"><span>Size</span><span>{p.size}</span></div>
                              <div className="pos-meta"><span>Entry</span><span>${p.entryPrice.toLocaleString()}</span></div>
                              <div className={`pos-pnl ${p.pnl >= 0 ? "up" : "down"}`}>
                                {p.pnl >= 0 ? "+" : ""}${p.pnl.toFixed(2)}
                              </div>
                            </div>
                          );
                        })}
                      </div>
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
        onClick={() => {}}>
        <div className="wallet-modal">
          <div className="modal-header">
            <div>
              <div className="modal-title">Conectar Exchange</div>
              <div style={{ fontSize:12, color:"var(--text-dim)", marginTop:2 }}>Añade tus credenciales API para operar</div>
            </div>
            <button className="modal-close" onClick={() => { setModalOpen(false); resetForm(); }}>✕</button>
          </div>
          <div className="modal-body">

            <div className="form-group">
              <label className="form-label">Exchange</label>
              <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
                {EXCHANGES.map(ex => (
                  <button key={ex.id} onClick={() => { setSelectedExchange(ex.id); setSaveError(""); }}
                    style={{
                      padding:"8px 16px", border:`1px solid ${selectedExchange === ex.id ? ex.border : "var(--border-blue)"}`,
                      background: selectedExchange === ex.id ? ex.bg : "transparent",
                      color: selectedExchange === ex.id ? ex.color : "var(--text-dim)",
                      fontFamily:"Outfit,sans-serif", fontSize:13, fontWeight:700,
                      cursor:"pointer", borderRadius:6, transition:"all 0.15s",
                    }}>
                    {ex.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Nombre / Etiqueta</label>
              <input className="form-input" placeholder={`Ej: Mi ${exchDef?.name} Principal`}
                value={walletName} onChange={e => setWalletName(e.target.value)} />
            </div>

            <div className="form-group">
              <label className="form-label">Propósito</label>
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

            {!exchDef?.isCex && (
              <>
                <div style={{ background:"var(--bg-modal)", border:"1px solid var(--border-blue)", padding:"12px 14px", fontSize:12, lineHeight:1.8, color:"var(--text-dim)" }}>
                  <div style={{ color:"var(--color-purple)", fontWeight:700, marginBottom:6, fontSize:11, letterSpacing:1, textTransform:"uppercase" }}>⚡ Hyperliquid — 2 direcciones</div>
                  <div><span style={{ color:"var(--color-warning)" }}>① Cuenta Principal</span> — donde están tus fondos USDC (MetaMask/Rabby)</div>
                  <div><span style={{ color:"var(--text-hover)" }}>② Private Key</span> — del API Wallet que firma las órdenes (no puede retirar fondos)</div>
                  <div style={{ marginTop:6, fontSize:11, color:"var(--text-label)" }}>En HL: Portfolio → tu address arriba derecha = Cuenta Principal ✓</div>
                </div>
                <div className="form-group">
                  <label className="form-label" style={{ color:"var(--color-warning)" }}>① Dirección Cuenta Principal <span style={{ color:"var(--color-danger)" }}>*</span></label>
                  <input className="form-input" placeholder="0x476e... (cuenta con fondos USDC)"
                    value={address} onChange={e => setAddress(e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label" style={{ color:"var(--text-hover)" }}>② Private Key del API Wallet <span style={{ color:"var(--color-danger)" }}>*</span></label>
                  <input className="form-input" type="password" placeholder="0x6e6b... (Trade → API → Show Secret)"
                    value={apiKey} onChange={e => handleApiKeyChange(e.target.value)} />
                  {agentWallet && (
                    <div style={{ fontSize:11, color:"var(--color-success)", marginTop:4 }}>✓ Agent: {agentWallet.slice(0,10)}...{agentWallet.slice(-6)}</div>
                  )}
                </div>
              </>
            )}

            {exchDef?.isCex && (
              <>
                <div style={{ background:"var(--bg-modal)", border:`1px solid ${exchDef.border}`, padding:"12px 14px", fontSize:12, lineHeight:1.8, color:"var(--text-dim)" }}>
                  <div style={{ color: exchDef.color, fontWeight:700, marginBottom:4, fontSize:11, letterSpacing:1, textTransform:"uppercase" }}>🔑 {exchDef.name} — API Keys</div>
                  <div>Crea una API Key en {exchDef.name} con permisos de <strong style={{ color: exchDef.color }}>Futures/Perp Trading</strong>. No actives permisos de retiro.</div>
                </div>
                <div className="form-group">
                  <label className="form-label">API Key <span style={{ color:"var(--color-danger)" }}>*</span></label>
                  <input className="form-input" placeholder={`Tu API Key de ${exchDef.name}`}
                    value={cexApiKey} onChange={e => setCexApiKey(e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label">Secret Key <span style={{ color:"var(--color-danger)" }}>*</span></label>
                  <input className="form-input" type="password" placeholder="Secret Key"
                    value={cexSecret} onChange={e => setCexSecret(e.target.value)} />
                </div>
                {exchDef.hasPassphrase && (
                  <div className="form-group">
                    <label className="form-label">Passphrase <span style={{ color:"var(--color-danger)" }}>*</span></label>
                    <input className="form-input" type="password" placeholder={`Passphrase de ${exchDef.name}`}
                      value={cexPassphrase} onChange={e => setCexPassphrase(e.target.value)} />
                  </div>
                )}
              </>
            )}

            {saveError && (
              <div style={{ color:"var(--color-danger)", fontSize:12, padding:"8px 0", borderTop:"1px solid var(--border-danger-subtle)" }}>⚠ {saveError}</div>
            )}
          </div>
          <div className="modal-footer">
            <button className="btn btn-ghost" onClick={() => { setModalOpen(false); resetForm(); }}>Cancelar</button>
            <button className="btn btn-gold" onClick={handleAdd} disabled={saving}>
              {saving ? "Guardando..." : `Conectar ${exchDef?.name}`}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
