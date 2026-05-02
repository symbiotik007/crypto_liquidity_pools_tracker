import { useAuth } from "../../lib/AuthContext";
import { buildWaUpgradeUrl } from "./utils";

export default function LockedTab({ tabName }) {
  const { user, profile } = useAuth()
  const userName  = profile?.full_name || user?.user_metadata?.full_name || user?.email?.split("@")[0]
  const userEmail = user?.email
  const waUrl     = buildWaUpgradeUrl(userName, userEmail)
  return (
    <div style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", padding:"60px 24px" }}>
      <div style={{ maxWidth:480, width:"100%", textAlign:"center" }}>
        <div style={{ fontSize:48, marginBottom:16 }}>🔒</div>
        <div style={{ fontSize:11, fontWeight:700, color:"#00e5ff", letterSpacing:3, textTransform:"uppercase", marginBottom:12 }}>
          Contenido exclusivo
        </div>
        <h2 style={{ fontSize:28, fontWeight:800, color:"#fff", marginBottom:12, lineHeight:1.2 }}>
          Acceso disponible para<br /><span style={{ color:"#00e5ff" }}>Traders en Formación</span>
        </h2>
        <p style={{ fontSize:14, color:"#4a7a96", lineHeight:1.7, marginBottom:32 }}>
          <strong style={{ color:"#7ab8d4" }}>{tabName}</strong> es parte del programa de formación profesional.
          Únete y obtén acceso completo a todas las herramientas, el programa educativo y el acompañamiento personalizado.
        </p>
        <div style={{ display:"flex", flexDirection:"column", gap:10, alignItems:"center" }}>
          <a
            href={waUrl}
            target="_blank" rel="noreferrer"
            style={{ display:"inline-block", padding:"13px 36px", background:"#00e5ff", color:"#050a0f", fontFamily:"Outfit,sans-serif", fontSize:14, fontWeight:700, letterSpacing:"0.5px", textDecoration:"none", transition:"opacity 0.15s" }}
            onMouseEnter={e=>e.currentTarget.style.opacity="0.88"}
            onMouseLeave={e=>e.currentTarget.style.opacity="1"}
          >
            Hablar con Oscar →
          </a>
          <a
            href="/"
            style={{ fontSize:13, color:"#2a5a72", textDecoration:"none", transition:"color 0.15s" }}
            onMouseEnter={e=>e.currentTarget.style.color="#7ab8d4"}
            onMouseLeave={e=>e.currentTarget.style.color="#2a5a72"}
          >
            Ver planes y precios
          </a>
        </div>
        <div style={{ marginTop:40, padding:"20px 24px", background:"#070d14", border:"1px solid #0e2435", textAlign:"left" }}>
          <div style={{ fontSize:11, fontWeight:700, color:"#4a7a96", letterSpacing:2, textTransform:"uppercase", marginBottom:14 }}>
            Incluido en tu plan
          </div>
          {[
            "Programa completo de formación en criptomonedas",
            "Liquidity Engine — gestión de pools Uniswap",
            "Trading automatizado en Hyperliquid",
            "Cobertura automático SHORT",
            "Acompañamiento personalizado 1 a 1",
          ].map((item, i) => (
            <div key={i} style={{ display:"flex", alignItems:"center", gap:10, fontSize:13, color:"#7ab8d4", marginBottom:10 }}>
              <div style={{ width:6, height:6, background:"#00e5ff", flexShrink:0 }} />
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
