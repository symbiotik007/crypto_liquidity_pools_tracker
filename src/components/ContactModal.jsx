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

  const S = {
    overlay: { position:"fixed",inset:0,background:"rgba(5,10,15,0.80)",zIndex:200,display:"flex",alignItems:"center",justifyContent:"center",padding:16,backdropFilter:"blur(8px)" },
    box: { background:"#070d14",border:"1px solid #1a3a5e",width:"100%",maxWidth:480,animation:"fadeSlide 0.2s ease" },
  };

  return (
    <div style={S.overlay} onClick={e => e.target===e.currentTarget && onClose()}>
      <style>{`@keyframes fadeSlide{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}`}</style>
      <div style={S.box}>

        <div style={{ padding:"24px 28px 0", display:"flex", justifyContent:"space-between", alignItems:"flex-start", borderBottom:"1px solid #0e2435", paddingBottom:20 }}>
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:4 }}>
              <img src={cryptoHouseLogo} alt="The Crypto House" style={{ width:32, height:32, objectFit:"contain" }} />
              <div>
                <div style={{ fontSize:11,fontWeight:700,color:"#7ab8d4",letterSpacing:2,textTransform:"uppercase" }}>The Crypto House</div>
                <div style={{ fontSize:10,color:"#2a5a72",letterSpacing:1,textTransform:"uppercase" }}>Soporte</div>
              </div>
            </div>
            <div style={{ fontSize:20,fontWeight:700,color:"#c8e6f0",marginTop:12 }}>Contáctanos</div>
            <div style={{ fontSize:13,color:"#4a7a96",marginTop:2 }}>Respuesta en menos de 24 horas</div>
          </div>
          <button onClick={onClose} style={{ background:"none",border:"none",color:"#2a5a72",fontSize:20,cursor:"pointer",lineHeight:1,padding:0 }}>✕</button>
        </div>

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
