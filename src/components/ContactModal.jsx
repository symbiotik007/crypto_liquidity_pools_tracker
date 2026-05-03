import { useState } from "react";
import cryptoHouseLogo from "../assets/cryptohouselogo.png";

export default function ContactModal({ onClose }) {
  const [form, setForm]       = useState({ name:"", email:"", msg:"" });
  const [sending, setSending] = useState(false);
  const [sent, setSent]       = useState(false);

  const handleWA = () => {
    const text = encodeURIComponent(`Hola. Soy ${form.name || "un usuario"} de Liquidity Engine ™. ${form.msg}`);
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

  const inputStyle = {
    width:"100%", padding:"9px 12px",
    background:"var(--bg-input)", border:"1px solid var(--border-dim)",
    color:"var(--text-primary)", fontFamily:"Outfit,sans-serif",
    fontSize:13, outline:"none", borderRadius:6,
    boxSizing:"border-box",
  };

  return (
    <div
      onClick={e => e.target===e.currentTarget && onClose()}
      style={{
        position:"fixed", inset:0,
        background:"var(--overlay-backdrop)",
        zIndex:200, display:"flex", alignItems:"center", justifyContent:"center",
        padding:16, backdropFilter:"blur(8px)",
      }}
    >
      <style>{`
        @keyframes fadeSlide{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
        .cm-wa-card:hover  { border-color: var(--color-success) !important; }
        .cm-em-card:hover  { border-color: var(--color-accent)  !important; }
        .cm-input:focus    { border-color: var(--color-accent)  !important; }
        .cm-btn-wa:not(:disabled):hover { background: var(--color-success) !important; color:#fff !important; }
        .cm-btn-em:not(:disabled):hover { background: var(--color-accent)  !important; color:#fff !important; }
      `}</style>

      <div style={{
        background:"var(--bg-modal)", border:"1px solid var(--border-dim)",
        boxShadow:"var(--shadow-overlay)", borderRadius:10,
        width:"100%", maxWidth:480, animation:"fadeSlide 0.2s ease",
      }}>

        {/* Header */}
        <div style={{
          padding:"24px 28px 20px",
          display:"flex", justifyContent:"space-between", alignItems:"flex-start",
          borderBottom:"1px solid var(--border-dim)",
        }}>
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:4 }}>
              <img src={cryptoHouseLogo} alt="The Crypto House" style={{ width:32, height:32, objectFit:"contain" }} />
              <div>
                <div style={{ fontSize:11, fontWeight:700, color:"var(--color-accent)", letterSpacing:2, textTransform:"uppercase" }}>The Crypto House</div>
                <div style={{ fontSize:10, color:"var(--text-dim)", letterSpacing:1, textTransform:"uppercase" }}>Soporte</div>
              </div>
            </div>
            <div style={{ fontSize:20, fontWeight:700, color:"var(--text-primary)", marginTop:12 }}>Contáctanos</div>
            <div style={{ fontSize:13, color:"var(--text-muted)", marginTop:2 }}>Respuesta en menos de 24 horas</div>
          </div>
          <button onClick={onClose} style={{
            background:"none", border:"none", color:"var(--text-faint)",
            fontSize:20, cursor:"pointer", lineHeight:1, padding:0,
          }}>✕</button>
        </div>

        {/* Contact cards */}
        <div style={{ padding:"20px 28px 0", display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
          <a href="https://wa.me/573215646716" target="_blank" rel="noreferrer" className="cm-wa-card"
            style={{
              background:"var(--bg-elevated)", border:"1px solid var(--border-dim)",
              borderRadius:8, padding:"14px 16px", textDecoration:"none",
              display:"flex", flexDirection:"column", gap:6, transition:"border-color 0.15s",
            }}>
            <div style={{ fontSize:22 }}>💬</div>
            <div style={{ fontSize:13, fontWeight:700, color:"var(--color-success)" }}>WhatsApp</div>
            <div style={{ fontSize:11, color:"var(--text-muted)" }}>+57 321 564 6716</div>
            <div style={{ fontSize:10, color:"var(--text-dim)", marginTop:2 }}>Respuesta inmediata</div>
          </a>
          <a href="mailto:profeoscarbol@gmail.com" className="cm-em-card"
            style={{
              background:"var(--bg-elevated)", border:"1px solid var(--border-dim)",
              borderRadius:8, padding:"14px 16px", textDecoration:"none",
              display:"flex", flexDirection:"column", gap:6, transition:"border-color 0.15s",
            }}>
            <div style={{ fontSize:22 }}>✉</div>
            <div style={{ fontSize:13, fontWeight:700, color:"var(--color-accent)" }}>Email</div>
            <div style={{ fontSize:11, color:"var(--text-muted)" }}>profeoscarbol@gmail.com</div>
            <div style={{ fontSize:10, color:"var(--text-dim)", marginTop:2 }}>Respuesta en 24h</div>
          </a>
        </div>

        {/* Form */}
        <div style={{ padding:"20px 28px 28px" }}>
          <div style={{ fontSize:11, color:"var(--text-dim)", letterSpacing:1, textTransform:"uppercase", marginBottom:14 }}>
            O envíanos un mensaje
          </div>

          {sent ? (
            <div style={{
              background:"var(--bg-success-subtle)", border:"1px solid var(--border-success-subtle)",
              borderRadius:8, padding:16, textAlign:"center",
              color:"var(--color-success)", fontSize:14,
            }}>
              ✓ Mensaje preparado — se abrió tu cliente de correo
            </div>
          ) : (
            <form onSubmit={handleEmail} style={{ display:"flex", flexDirection:"column", gap:12 }}>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
                <div>
                  <div style={{ fontSize:10, color:"var(--text-label)", letterSpacing:1, textTransform:"uppercase", marginBottom:5 }}>Nombre *</div>
                  <input className="cm-input" style={inputStyle}
                    placeholder="Tu nombre" value={form.name}
                    onChange={e=>setForm(p=>({...p,name:e.target.value}))} />
                </div>
                <div>
                  <div style={{ fontSize:10, color:"var(--text-label)", letterSpacing:1, textTransform:"uppercase", marginBottom:5 }}>Email</div>
                  <input className="cm-input" style={inputStyle}
                    type="email" placeholder="tu@email.com" value={form.email}
                    onChange={e=>setForm(p=>({...p,email:e.target.value}))} />
                </div>
              </div>
              <div>
                <div style={{ fontSize:10, color:"var(--text-label)", letterSpacing:1, textTransform:"uppercase", marginBottom:5 }}>Mensaje *</div>
                <textarea className="cm-input" style={{ ...inputStyle, resize:"vertical", minHeight:80 }}
                  placeholder="¿En qué podemos ayudarte?" value={form.msg}
                  onChange={e=>setForm(p=>({...p,msg:e.target.value}))} />
              </div>
              <div style={{ display:"flex", gap:10 }}>
                <button type="button" onClick={handleWA} className="cm-btn-wa"
                  disabled={!form.name||!form.msg}
                  style={{
                    flex:1, padding:"11px 0", background:"transparent",
                    border:"1px solid var(--color-success)", color:"var(--color-success)",
                    borderRadius:6, fontFamily:"Outfit,sans-serif", fontSize:13, fontWeight:700,
                    cursor:"pointer", transition:"background 0.15s, color 0.15s",
                    opacity:(!form.name||!form.msg)?0.4:1,
                  }}>
                  💬 Enviar por WhatsApp
                </button>
                <button type="submit" className="cm-btn-em"
                  disabled={!form.name||!form.msg||sending}
                  style={{
                    flex:1, padding:"11px 0", background:"transparent",
                    border:"1px solid var(--color-accent)", color:"var(--color-accent)",
                    borderRadius:6, fontFamily:"Outfit,sans-serif", fontSize:13, fontWeight:700,
                    cursor:"pointer", transition:"background 0.15s, color 0.15s",
                    opacity:(!form.name||!form.msg)?0.4:1,
                  }}>
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
