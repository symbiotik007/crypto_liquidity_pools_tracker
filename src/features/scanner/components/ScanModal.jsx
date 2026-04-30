import { useState, useEffect, useRef } from "react";
import { CHAINS } from "../services/chainConfig";
import "./ScanModal.css";
import { formatPrice } from "../../../lib/rpcCodec";
import { scanWalletOnChain } from "../services/uniswapV3Service";

export default function ScanModal({ open, onClose, onImport }) {
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
