export default function TradingViewOperableTab() {
  const openTV = () => {
    window.open("https://www.tradingview.com/chart/", "_blank", "width=1400,height=900,menubar=no,toolbar=no,location=no,status=no");
  };

  return (
    <div style={{ position:"relative", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"flex-start", minHeight:"100%", overflowY:"auto", overflowX:"hidden", textAlign:"center" }}>

      <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse 80% 60% at 50% 40%, rgba(0,229,255,0.06) 0%, rgba(123,97,255,0.04) 40%, transparent 70%)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", inset:0, backgroundImage:"linear-gradient(rgba(0,229,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.04) 1px, transparent 1px)", backgroundSize:"48px 48px", pointerEvents:"none" }} />
      <div style={{ position:"absolute", top:"15%", left:"10%", width:320, height:320, borderRadius:"50%", background:"radial-gradient(circle, rgba(123,97,255,0.08) 0%, transparent 70%)", filter:"blur(40px)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", bottom:"10%", right:"8%", width:260, height:260, borderRadius:"50%", background:"radial-gradient(circle, rgba(0,229,255,0.07) 0%, transparent 70%)", filter:"blur(40px)", pointerEvents:"none" }} />

      <style>{`@keyframes tvFloat{0%,100%{transform:translateY(0) rotate(-6deg)}50%{transform:translateY(-18px) rotate(-3deg)}} @keyframes tvRotate{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
      <div style={{ position:"absolute", right:"6%", top:"50%", transform:"translateY(-50%)", opacity:0.18, pointerEvents:"none", animation:"tvFloat 6s ease-in-out infinite" }}>
        <svg width="220" height="280" viewBox="0 0 220 280" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="110" cy="200" rx="60" ry="20" fill="#00e5ff" opacity="0.15" filter="url(#glow)"/>
          <defs>
            <filter id="glow"><feGaussianBlur stdDeviation="8" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
            <linearGradient id="suit" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#7b61ff"/><stop offset="1" stopColor="#00e5ff"/></linearGradient>
            <linearGradient id="visor" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#00e5ff" stopOpacity="0.9"/><stop offset="1" stopColor="#7b61ff" stopOpacity="0.7"/></linearGradient>
          </defs>
          <rect x="60" y="120" width="100" height="110" rx="30" fill="url(#suit)" opacity="0.9"/>
          <circle cx="110" cy="90" r="52" fill="url(#suit)" opacity="0.85"/>
          <ellipse cx="110" cy="88" rx="34" ry="30" fill="url(#visor)" opacity="0.9"/>
          <ellipse cx="100" cy="80" rx="10" ry="7" fill="white" opacity="0.25"/>
          <rect x="22" y="130" width="40" height="22" rx="11" fill="url(#suit)" opacity="0.85" transform="rotate(-20 42 141)"/>
          <circle cx="18" cy="148" r="12" fill="url(#suit)" opacity="0.8"/>
          <rect x="158" y="130" width="40" height="22" rx="11" fill="url(#suit)" opacity="0.85" transform="rotate(20 178 141)"/>
          <circle cx="202" cy="148" r="12" fill="url(#suit)" opacity="0.8"/>
          <rect x="72" y="220" width="32" height="50" rx="14" fill="url(#suit)" opacity="0.85"/>
          <ellipse cx="88" cy="272" rx="18" ry="10" fill="url(#suit)" opacity="0.8"/>
          <rect x="116" y="220" width="32" height="50" rx="14" fill="url(#suit)" opacity="0.85"/>
          <ellipse cx="132" cy="272" rx="18" ry="10" fill="url(#suit)" opacity="0.8"/>
          <rect x="85" y="145" width="50" height="32" rx="8" fill="#050a0f" opacity="0.4"/>
          <circle cx="100" cy="161" r="5" fill="#00ff88" opacity="0.8"/>
          <circle cx="115" cy="161" r="5" fill="#ffb347" opacity="0.8"/>
          <circle cx="130" cy="161" r="5" fill="#00e5ff" opacity="0.8"/>
          <circle cx="110" cy="90" r="52" fill="none" stroke="#00e5ff" strokeWidth="2" opacity="0.4"/>
          <line x1="110" y1="38" x2="110" y2="22" stroke="#00e5ff" strokeWidth="2.5" opacity="0.7" strokeLinecap="round"/>
          <circle cx="110" cy="18" r="5" fill="#00e5ff" opacity="0.9"/>
          {[[30,40],[180,30],[200,180],[25,200],[150,260]].map(([x,y],i)=>(
            <circle key={i} cx={x} cy={y} r={2} fill="#00e5ff" opacity={0.5}/>
          ))}
        </svg>
      </div>

      <div style={{ position:"relative", zIndex:1, display:"flex", flexDirection:"column", alignItems:"center", padding:"60px 24px 60px", maxWidth:680, width:"100%" }}>

        <div style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"5px 16px", border:"1px solid rgba(var(--color-accent-rgb),0.25)", background:"rgba(var(--color-accent-rgb),0.06)", borderRadius:999, fontSize:10, fontWeight:700, color:"var(--color-accent)", letterSpacing:2, textTransform:"uppercase", marginBottom:28 }}>
          <div style={{ width:6, height:6, borderRadius:"50%", background:"var(--color-accent)", animation:"tvPulse 2s infinite" }} />
          TradingView Operable
        </div>
        <style>{`@keyframes tvPulse{0%,100%{opacity:1}50%{opacity:0.4}} @keyframes tvGlare{0%{left:-60%;opacity:0}15%{opacity:1}45%{left:130%;opacity:0}100%{left:130%;opacity:0}}`}</style>

        <h2 style={{ fontSize:"clamp(26px,3vw,40px)", fontWeight:900, color:"var(--text-primary)", marginBottom:16, lineHeight:1.1, letterSpacing:-0.5 }}>
          Opera desde tu cuenta<br /><span style={{ color:"var(--color-accent)" }}>de TradingView</span>
        </h2>
        <p style={{ fontSize:15, color:"var(--text-muted)", lineHeight:1.8, marginBottom:8 }}>
          Abre TradingView con un clic e inicia sesión con tu cuenta para analizar el mercado
          y ejecutar operaciones en tiempo real, con todas tus herramientas y configuraciones guardadas.
        </p>
        <p style={{ fontSize:12, color:"var(--text-dim)", marginBottom:40 }}>Tu sesión se mantiene activa entre aperturas.</p>

        <button onClick={openTV} style={{
          position:"relative", overflow:"hidden",
          padding:"16px 52px", borderRadius:10,
          background:"rgba(var(--color-accent-rgb),0.08)",
          border:"1px solid rgba(var(--color-accent-rgb),0.35)",
          color:"var(--color-accent)", fontFamily:"Outfit,sans-serif", fontSize:16, fontWeight:800,
          cursor:"pointer", letterSpacing:0.5,
          boxShadow:"0 4px 24px rgba(var(--color-accent-rgb),0.12)",
          transition:"all 0.25s",
        }}
          onMouseEnter={e => { e.currentTarget.style.background="rgba(var(--color-accent-rgb),0.15)"; e.currentTarget.style.borderColor="var(--color-accent)"; }}
          onMouseLeave={e => { e.currentTarget.style.background="rgba(var(--color-accent-rgb),0.08)"; e.currentTarget.style.borderColor="rgba(var(--color-accent-rgb),0.35)"; }}
        >
          <span style={{ position:"absolute", top:0, left:"-60%", width:"35%", height:"100%", background:"linear-gradient(120deg,transparent,rgba(255,255,255,0.12),transparent)", transform:"skewX(-20deg)", animation:"tvGlare 4s ease-in-out infinite" }} />
          Abrir TradingView →
        </button>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12, marginTop:48, width:"100%" }}>
          {[
            { icon:"🔐", title:"Login seguro",       desc:"Inicia sesión con tu cuenta TradingView directamente",                      accentVar:"var(--color-purple)"  },
            { icon:"📊", title:"Gráficos completos", desc:"Todos tus indicadores, alertas y configuraciones guardadas",                accentVar:"var(--color-accent)"  },
            { icon:"⚡", title:"Operaciones reales", desc:"Ejecuta operaciones con tu broker/exchange conectado a TradingView",        accentVar:"var(--color-success)" },
          ].map((c,i) => (
            <div key={i} style={{ background:"var(--bg-elevated)", border:"1px solid var(--border-muted)", borderRadius:10, padding:"20px 16px", position:"relative", overflow:"hidden" }}>
              <div style={{ position:"absolute", top:0, left:0, right:0, height:2, background:`linear-gradient(90deg, transparent, ${c.accentVar}, transparent)` }} />
              <div style={{ fontSize:26, marginBottom:10 }}>{c.icon}</div>
              <div style={{ fontSize:13, fontWeight:700, color:c.accentVar, marginBottom:6 }}>{c.title}</div>
              <div style={{ fontSize:11, color:"var(--text-dim)", lineHeight:1.6 }}>{c.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
