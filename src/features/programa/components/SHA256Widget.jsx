import { useState, useCallback } from "react";

async function sha256(text) {
  const encoded = new TextEncoder().encode(text);
  const buffer = await crypto.subtle.digest("SHA-256", encoded);
  return Array.from(new Uint8Array(buffer))
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}

export default function SHA256Widget() {
  const [message, setMessage]   = useState("");
  const [hashVal, setHashVal]   = useState("");
  const [loading, setLoading]   = useState(false);
  const [copied, setCopied]     = useState(false);

  const createHash = useCallback(async () => {
    if (!message.trim()) return;
    setLoading(true);
    const h = await sha256(message);
    setHashVal(h);
    setLoading(false);
  }, [message]);

  const reset = () => {
    setMessage("");
    setHashVal("");
    setCopied(false);
  };

  const copyHash = async () => {
    if (!hashVal) return;
    await navigator.clipboard.writeText(hashVal);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div style={{
      background: "var(--bg-elevated)",
      border: "1px solid var(--border-muted)",
      borderRadius: 10,
      padding: "22px 24px 20px",
      marginTop: 8,
    }}>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
        <div style={{
          width: 56, height: 56, flexShrink: 0,
          background: "linear-gradient(135deg,#1a1a2e 0%,#16213e 60%,#0f3460 100%)",
          border: "1px solid var(--border-blue)",
          borderRadius: 8,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 26, boxShadow: "2px 4px 12px rgba(0,0,0,0.35)",
        }}>
          🔐
        </div>
        <div>
          <div style={{
            fontFamily: "Outfit,sans-serif",
            fontStyle: "italic",
            fontWeight: 800,
            fontSize: 20,
            color: "var(--color-accent)",
            lineHeight: 1.2,
          }}>
            ¡Pruébalo tú mismo!
          </div>
          <div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 2 }}>
            Crea tu propio hash SHA-256
          </div>
        </div>
      </div>

      {/* Message */}
      <div style={{ marginBottom: 14 }}>
        <label style={{
          display: "block",
          fontFamily: "Outfit,sans-serif",
          fontWeight: 700,
          fontSize: 13,
          color: "var(--text-secondary)",
          marginBottom: 6,
        }}>
          Mensaje
        </label>
        <textarea
          value={message}
          onChange={e => setMessage(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) createHash(); }}
          placeholder="Escribe cualquier texto aquí…"
          rows={3}
          style={{
            width: "100%",
            boxSizing: "border-box",
            padding: "10px 12px",
            background: "var(--bg-input)",
            border: "1px solid var(--border-muted)",
            borderRadius: 6,
            color: "var(--text-primary)",
            fontSize: 14,
            fontFamily: "Outfit,sans-serif",
            resize: "vertical",
            outline: "none",
            transition: "border-color 0.15s",
          }}
          onFocus={e => e.target.style.borderColor = "var(--border-blue)"}
          onBlur={e => e.target.style.borderColor = "var(--border-muted)"}
        />
      </div>

      {/* Hash output */}
      <div style={{ marginBottom: 18 }}>
        <label style={{
          display: "block",
          fontFamily: "Outfit,sans-serif",
          fontWeight: 700,
          fontSize: 13,
          color: "var(--text-secondary)",
          marginBottom: 6,
        }}>
          Hash
        </label>
        <div style={{ position: "relative" }}>
          <div
            onClick={hashVal ? copyHash : undefined}
            title={hashVal ? (copied ? "¡Copiado!" : "Clic para copiar") : ""}
            style={{
              padding: "10px 40px 10px 12px",
              background: "var(--bg-input)",
              border: "1px solid var(--border-muted)",
              borderRadius: 6,
              color: hashVal ? "var(--text-primary)" : "var(--text-faint)",
              fontSize: 13,
              fontFamily: "monospace",
              letterSpacing: "0.04em",
              wordBreak: "break-all",
              minHeight: 42,
              cursor: hashVal ? "pointer" : "default",
              lineHeight: 1.6,
              transition: "background 0.15s",
            }}
          >
            {loading
              ? "Calculando…"
              : hashVal || "El hash aparecerá aquí"}
          </div>
          {hashVal && (
            <span style={{
              position: "absolute",
              right: 10,
              top: "50%",
              transform: "translateY(-50%)",
              fontSize: 14,
              color: copied ? "var(--color-success)" : "var(--text-faint)",
              pointerEvents: "none",
              transition: "color 0.2s",
            }}>
              {copied ? "✓" : "⎘"}
            </span>
          )}
        </div>
        {hashVal && (
          <div style={{ fontSize: 11, color: "var(--text-faint)", marginTop: 4, fontFamily: "Outfit,sans-serif" }}>
            64 caracteres · 256 bits · SHA-256
          </div>
        )}
      </div>

      {/* Buttons */}
      <div style={{ display: "flex", gap: 10 }}>
        <button
          onClick={createHash}
          disabled={!message.trim() || loading}
          style={{
            padding: "10px 22px",
            background: message.trim() && !loading ? "var(--color-success)" : "var(--bg-input)",
            border: "1px solid " + (message.trim() && !loading ? "var(--color-success)" : "var(--border-muted)"),
            color: message.trim() && !loading ? "#ffffff" : "var(--text-faint)",
            fontFamily: "Outfit,sans-serif",
            fontWeight: 700,
            fontSize: 13,
            cursor: message.trim() && !loading ? "pointer" : "not-allowed",
            borderRadius: 6,
            transition: "all 0.15s",
            letterSpacing: "0.3px",
          }}
        >
          {loading ? "Calculando…" : "Crear Hash"}
        </button>
        <button
          onClick={reset}
          style={{
            padding: "10px 20px",
            background: "var(--bg-input)",
            border: "1px solid var(--border-muted)",
            color: "var(--text-muted)",
            fontFamily: "Outfit,sans-serif",
            fontWeight: 700,
            fontSize: 13,
            cursor: "pointer",
            borderRadius: 6,
            transition: "all 0.15s",
            letterSpacing: "0.3px",
          }}
        >
          Reiniciar
        </button>
      </div>

    </div>
  );
}
