import { useState, useEffect } from "react";
import { useAuth } from "../../lib/AuthContext";
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

  const purposeColor = { proteccion: "#00e5ff", trading: "#00ff88", insider: "#ffb347", copy: "#888" };
  const purposeLabel = { proteccion: "Protección", trading: "Trading", insider: "Insider", copy: "Copy" };
  const exchColor = (id) => EXCHANGES.find(e => e.id === id)?.color || "#4a7a96";
  const exchName  = (id) => EXCHANGES.find(e => e.id === id)?.name  || id;

  return (
    <>
      <div className="info-box">
        Conecta tus wallets de diferentes exchanges para monitorear balances y posiciones en tiempo real.
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
                    <span style={{
                      fontSize: 10, fontWeight: 700, letterSpacing: 1, padding: "2px 8px",
                      border: `1px solid ${purposeColor[w.purpose]}`,
                      color: purposeColor[w.purpose], background: "transparent",
                    }}>{purposeLabel[w.purpose]?.toUpperCase()}</span>

                    <div style={{ flex: 1 }}>
                      <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:3 }}>
                        <div style={{ fontWeight: 700, color: "#c8e6f0", fontSize: 14 }}>{w.label}</div>
                        <span style={{ fontSize:10, fontWeight:700, padding:"2px 8px", borderRadius:4,
                          color: exchColor(w.exchange), border:`1px solid ${exchColor(w.exchange)}44`,
                          background:`${exchColor(w.exchange)}11`, letterSpacing:0.5 }}>
                          {exchName(w.exchange || "hyperliquid")}
                        </span>
                        <span style={{ fontSize:10, color: purposeColor[w.purpose] || "#4a7a96",
                          border:`1px solid ${purposeColor[w.purpose] || "#4a7a96"}44`, padding:"2px 8px", borderRadius:4 }}>
                          {purposeLabel[w.purpose] || w.purpose}
                        </span>
                      </div>
                      <div style={{ fontSize: 11, color: "#2a5a72", fontFamily: "monospace" }}>
                        {w.address?.slice(0,10)}...{w.address?.slice(-6)}
                      </div>
                    </div>

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

                    <button onClick={() => handleRemove(w.id)} style={{
                      background: "transparent", border: "1px solid #5a1a28",
                      color: "#ff4f6e", padding: "4px 10px", fontSize: 12,
                      cursor: "pointer", fontFamily: "Outfit, sans-serif",
                    }}>🗑</button>
                  </div>

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
        onClick={() => {}}>
        <div className="wallet-modal">
          <div className="modal-header">
            <div>
              <div className="modal-title">Conectar Exchange</div>
              <div style={{ fontSize:12, color:"#4a7a96", marginTop:2 }}>Añade tus credenciales API para operar</div>
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
                      padding:"8px 16px", border:`1px solid ${selectedExchange === ex.id ? ex.border : "#1a3a5e"}`,
                      background: selectedExchange === ex.id ? ex.bg : "transparent",
                      color: selectedExchange === ex.id ? ex.color : "#4a7a96",
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
                <div style={{ background:"#0a1520", border:"1px solid #1a3a5e", padding:"12px 14px", fontSize:12, lineHeight:1.8, color:"#4a7a96" }}>
                  <div style={{ color:"#7b61ff", fontWeight:700, marginBottom:6, fontSize:11, letterSpacing:1, textTransform:"uppercase" }}>⚡ Hyperliquid — 2 direcciones</div>
                  <div><span style={{ color:"#ffb347" }}>① Cuenta Principal</span> — donde están tus fondos USDC (MetaMask/Rabby)</div>
                  <div><span style={{ color:"#7ab8d4" }}>② Private Key</span> — del API Wallet que firma las órdenes (no puede retirar fondos)</div>
                  <div style={{ marginTop:6, fontSize:11, color:"#2a5a72" }}>En HL: Portfolio → tu address arriba derecha = Cuenta Principal ✓</div>
                </div>
                <div className="form-group">
                  <label className="form-label" style={{ color:"#ffb347" }}>① Dirección Cuenta Principal <span style={{ color:"#ff4f6e" }}>*</span></label>
                  <input className="form-input" placeholder="0x476e... (cuenta con fondos USDC)"
                    value={address} onChange={e => setAddress(e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label" style={{ color:"#7ab8d4" }}>② Private Key del API Wallet <span style={{ color:"#ff4f6e" }}>*</span></label>
                  <input className="form-input" type="password" placeholder="0x6e6b... (Trade → API → Show Secret)"
                    value={apiKey} onChange={e => handleApiKeyChange(e.target.value)} />
                  {agentWallet && (
                    <div style={{ fontSize:11, color:"#00ff88", marginTop:4 }}>✓ Agent: {agentWallet.slice(0,10)}...{agentWallet.slice(-6)}</div>
                  )}
                </div>
              </>
            )}

            {exchDef?.isCex && (
              <>
                <div style={{ background:"#0a1520", border:`1px solid ${exchDef.border}`, padding:"12px 14px", fontSize:12, lineHeight:1.8, color:"#4a7a96" }}>
                  <div style={{ color: exchDef.color, fontWeight:700, marginBottom:4, fontSize:11, letterSpacing:1, textTransform:"uppercase" }}>🔑 {exchDef.name} — API Keys</div>
                  <div>Crea una API Key en {exchDef.name} con permisos de <strong style={{ color: exchDef.color }}>Futures/Perp Trading</strong>. No actives permisos de retiro.</div>
                </div>
                <div className="form-group">
                  <label className="form-label">API Key <span style={{ color:"#ff4f6e" }}>*</span></label>
                  <input className="form-input" placeholder={`Tu API Key de ${exchDef.name}`}
                    value={cexApiKey} onChange={e => setCexApiKey(e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label">Secret Key <span style={{ color:"#ff4f6e" }}>*</span></label>
                  <input className="form-input" type="password" placeholder="Secret Key"
                    value={cexSecret} onChange={e => setCexSecret(e.target.value)} />
                </div>
                {exchDef.hasPassphrase && (
                  <div className="form-group">
                    <label className="form-label">Passphrase <span style={{ color:"#ff4f6e" }}>*</span></label>
                    <input className="form-input" type="password" placeholder={`Passphrase de ${exchDef.name}`}
                      value={cexPassphrase} onChange={e => setCexPassphrase(e.target.value)} />
                  </div>
                )}
              </>
            )}

            {saveError && (
              <div style={{ color:"#ff4f6e", fontSize:12, padding:"8px 0", borderTop:"1px solid #5a1a28" }}>⚠ {saveError}</div>
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
