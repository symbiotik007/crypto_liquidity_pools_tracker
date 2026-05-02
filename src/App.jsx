import { useState, useEffect, Component } from "react";
import { useAuth } from "./lib/AuthContext";
import InactivityOverlay from "./InactivityOverlay";
import cryptoHouseLogo from "./assets/cryptohouselogo.png";

import HedgeTrackerTab        from "./HedgeTrackerTab";
import { buildWaUpgradeUrl }  from "./features/dashboard/utils";
import DashboardTab           from "./features/dashboard/DashboardTab";
import LockedTab              from "./features/dashboard/LockedTab";
import WalletsTab             from "./features/wallets/WalletsTab";
import CoberturaTab           from "./features/pools/components/CoberturaTab";
import TradingTab             from "./features/pools/components/TradingTab";
import ProgramaTab            from "./features/programa/ProgramaTab";
import CryptoBootcampTab      from "./features/programa/CryptoBootcampTab";
import AdminPanel             from "./features/admin/AdminPanel";
import PreguntasTab           from "./features/admin/PreguntasTab";
import TradingViewTab         from "./components/TradingViewTab";
import TradingViewOperableTab from "./components/TradingViewOperableTab";
import ComingSoonTab          from "./components/ComingSoonTab";
import ContactModal           from "./components/ContactModal";
import NotificationBell       from "./components/NotificationBell";
import "./styles/app.css";
import "./styles/themes/futurista.css";
import "./styles/themes/light.css";
import "./styles/themes/profesional.css";
import "./styles/themes/glassmorphism.css";
import "./styles/themes/neumorphism.css";

// ════════════════════════════════════════════════════════════════════
// CONSTANTS
// ════════════════════════════════════════════════════════════════════
const TABS = [
  { id: "Wallets",              label: "Wallets",              available: true  },
  { id: "Cobertura",            label: "Cobertura",            available: true  },
  { id: "Monitor de Cobertura", label: "Monitor de Cobertura", available: true  },
  { id: "Trading Automatizado", label: "Trading Automatizado", available: false },
  { id: "Insider (Trading)",    label: "Insider (Trading)",    available: false },
];
const NAV_ITEMS       = ["Dashboard","Programa","Crypto Bootcamp","Preguntas"];
const NAV_ITEMS_ADMIN = ["Admin Panel"];
const PAID_TABS = ["Wallets","Cobertura","Trading Automatizado","Programa CryptoEducation","Programa","Crypto Bootcamp"];

// ════════════════════════════════════════════════════════════════════
// ERROR BOUNDARY
// ════════════════════════════════════════════════════════════════════
class AppErrorBoundary extends Component {
  constructor(props) { super(props); this.state = { error: null }; }
  static getDerivedStateFromError(error) { return { error }; }
  render() {
    if (this.state.error) {
      return (
        <div style={{ display:"flex", alignItems:"center", justifyContent:"center", height:"100vh", background:"#050a0f", fontFamily:"Outfit,sans-serif", padding:24 }}>
          <div style={{ maxWidth:600, width:"100%", textAlign:"center" }}>
            <div style={{ fontSize:40, marginBottom:16 }}>⚠</div>
            <div style={{ fontSize:18, fontWeight:700, color:"#ff4f6e", marginBottom:12 }}>Algo salió mal</div>
            <div style={{ fontSize:13, color:"#4a7a96", marginBottom:24, lineHeight:1.6 }}>
              Hubo un error al cargar la aplicación. Copia el mensaje de abajo y envíalo a soporte.
            </div>
            <div style={{ background:"#0a1520", border:"1px solid #1a3a5e", padding:"16px", borderRadius:8, textAlign:"left", fontSize:11, color:"#ff6b88", fontFamily:"monospace", marginBottom:24, wordBreak:"break-all" }}>
              {this.state.error?.message || String(this.state.error)}
            </div>
            <button
              onClick={() => window.location.reload()}
              style={{ padding:"10px 28px", background:"#00e5ff", color:"#050a0f", border:"none", borderRadius:8, fontFamily:"Outfit,sans-serif", fontSize:14, fontWeight:700, cursor:"pointer" }}
            >
              Recargar página
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// ════════════════════════════════════════════════════════════════════
// APP
// ════════════════════════════════════════════════════════════════════
export default function App() {
  const { user, profile, signOut, isPaid, planLabel, isAdmin } = useAuth();

  const [activeSection, setActiveSection] = useState("Dashboard");
  const [activeLiquidityTab, setActiveLiquidityTab] = useState("Cobertura");

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const closeSidebar = () => setSidebarOpen(false);

  useEffect(() => {
    const handler = (e) => {
      const { section, tab } = e.detail;
      if (section) setActiveSection(section);
      if (tab)     setActiveLiquidityTab(tab);
    };
    window.addEventListener("dash-navigate", handler);
    return () => window.removeEventListener("dash-navigate", handler);
  }, []);

  const isLiquiditySection = activeSection === "liquidity";

  const userName  = profile?.full_name || user?.user_metadata?.full_name || user?.email?.split("@")[0] || "Usuario";
  const userEmail = user?.email || "";
  const avatarUrl = profile?.avatar_url || user?.user_metadata?.avatar_url || null;
  const initials  = userName.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
  const waUpgradeUrl = buildWaUpgradeUrl(userName !== "Usuario" ? userName : null, userEmail || null);

  const SECTION_TITLES = {
    liquidity:"Liquidity Engine",
    Dashboard:"Dashboard",
    Programa:"Programa",
    "Crypto Bootcamp":"Crypto Bootcamp",
    TradingView:"TradingView",
    TradingViewOperable:"TradingView Operable",
    Preguntas:"Preguntas",
    "Admin Panel":"Admin Panel",
  };

  const renderContent = () => {
    if (isLiquiditySection) {
      if (!isPaid && PAID_TABS.includes(activeLiquidityTab)) return <LockedTab tabName={activeLiquidityTab} />;
      switch (activeLiquidityTab) {
        case "Wallets":               return <WalletsTab />;
        case "Cobertura":             return <CoberturaTab />;
        case "Monitor de Cobertura":  return <HedgeTrackerTab />;
        case "Trading Automatizado":
        case "Insider (Trading)":
        default:                      return <ComingSoonTab name={activeLiquidityTab} />;
      }
    }
    if (!isPaid && PAID_TABS.includes(activeSection)) return <LockedTab tabName={activeSection} />;
    switch (activeSection) {
      case "Dashboard":            return <DashboardTab />;
      case "Programa":             return <ProgramaTab />;
      case "Crypto Bootcamp":      return <CryptoBootcampTab />;
      case "TradingView":          return <TradingViewTab />;
      case "TradingViewOperable":  return <TradingViewOperableTab />;
      case "Preguntas":            return <PreguntasTab />;
      case "Admin Panel":          return <AdminPanel />;
      default:                     return <ComingSoonTab name={activeSection} />;
    }
  };

  return (
    <>
      <div className="app">
        <div className={`overlay ${sidebarOpen ? "open" : ""}`} onClick={closeSidebar} />
        {contactOpen && <ContactModal onClose={() => setContactOpen(false)} />}

        <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
          <div className="logo">
            <div className="logo-box" style={{ background:"#00e5ff", padding:2 }}>
              <img src={cryptoHouseLogo} alt="The Crypto House" style={{ width:32, height:32, objectFit:"contain", display:"block" }} />
            </div>
            <div className="logo-text">The Crypto<br />House</div>
          </div>
          <a href="/" className="nav-item-site" title="Volver al sitio web">
            ← Sitio web
          </a>
          <div className="nav-section">
            {NAV_ITEMS.map(l => {
              const locked = !isPaid && PAID_TABS.includes(l);
              const isActive = activeSection === l;
              return (
                <div key={l}
                  className={`nav-item ${isActive ? 'active' : ''}`}
                  onClick={() => { setActiveSection(l); closeSidebar(); }}
                  style={locked ? { opacity:0.5 } : {}}
                >
                  {l}
                  {locked && <span style={{ marginLeft:"auto", fontSize:11, color:"#2a5a72" }}>🔒</span>}
                </div>
              );
            })}
          </div>
          <div className="nav-section">
            <div className="nav-label">Herramientas</div>
            <div
              className={`nav-item ${isLiquiditySection ? 'active' : ''}`}
              onClick={() => { setActiveSection("liquidity"); closeSidebar(); }}
            >
              Liquidity Engine <span className="badge">BETA</span>
            </div>
            <div
              className={`nav-item ${activeSection === "TradingView" ? 'active' : ''}`}
              onClick={() => { setActiveSection("TradingView"); closeSidebar(); }}
            >
              📈 TradingView
            </div>
            <div
              className={`nav-item ${activeSection === "TradingViewOperable" ? 'active' : ''}`}
              onClick={() => { setActiveSection("TradingViewOperable"); closeSidebar(); }}
            >
              🖥️ TV Operable
            </div>
          </div>
          <div className="nav-section">
            <div className="nav-label">Contacto</div>
            <div className="nav-item" style={{cursor:"pointer"}} onClick={() => { setContactOpen(true); closeSidebar(); }}>
              💬 WhatsApp / Email
            </div>
          </div>
          {isAdmin && (
            <div className="nav-section">
              <div className="nav-label" style={{ color:"#00e5ff44" }}>Admin</div>
              {NAV_ITEMS_ADMIN.map(l => (
                <div key={l}
                  className={`nav-item ${activeSection === l ? "active" : ""}`}
                  onClick={() => { setActiveSection(l); closeSidebar(); }}
                  style={{ color: activeSection===l ? "#00e5ff" : "#4a7a96" }}
                >
                  ⚙ {l}
                </div>
              ))}
            </div>
          )}

          <div className="sidebar-spacer" />

          <div className="user-info" style={{ flexDirection:"column", alignItems:"stretch", gap:0, padding:"12px 14px" }}>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
              {avatarUrl ? (
                <img src={avatarUrl} alt={userName}
                  style={{ width:36, height:36, borderRadius:"50%", objectFit:"cover", flexShrink:0 }} />
              ) : (
                <div className="user-avatar">{initials}</div>
              )}
              <div style={{ minWidth:0, flex:1 }}>
                <div className="user-name" title={userName}>{userName}</div>
                <div className={`user-plan ${isPaid ? "paid" : "free"}`}>{planLabel}</div>
              </div>
            </div>
            <button onClick={signOut} style={{
              width:"100%", padding:"7px 0",
              background:"transparent", border:"1px solid #1a3a5e",
              color:"#4a7a96", fontSize:12, cursor:"pointer",
              fontFamily:"Outfit, sans-serif", letterSpacing:"0.5px",
              display:"flex", alignItems:"center", justifyContent:"center", gap:6,
              transition:"all 0.15s",
            }}
            onMouseEnter={e => { e.target.style.borderColor="#ff4f6e"; e.target.style.color="#ff4f6e"; }}
            onMouseLeave={e => { e.target.style.borderColor="#1a3a5e"; e.target.style.color="#4a7a96"; }}
            >
              ⎋ Cerrar sesión
            </button>
            {!isPaid && (
              <a
                href={waUpgradeUrl}
                target="_blank" rel="noreferrer"
                className="plan-upgrade-btn"
                style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:6, textDecoration:"none", marginTop:8 }}
              >
                ⚡ Actualizar plan
              </a>
            )}
          </div>
        </div>

        <div className="main">
          <div className="topbar">
            <div className="topbar-row">
              <button className="hamburger" onClick={() => setSidebarOpen(true)}>☰</button>
              <span className="page-title">{SECTION_TITLES[activeSection] || "Liquidity Engine"}</span>
              {isLiquiditySection && <span className="beta-tag">BETA</span>}
              <div style={{ marginLeft:'auto', display:'flex', alignItems:'center', gap:8 }}>
                <NotificationBell userId={user?.id} />
                {isAdmin && (
                  <button
                    onClick={() => { setActiveSection("Admin Panel"); closeSidebar(); }}
                    style={{
                      padding:"5px 12px",
                      background:"transparent", border:"1px solid #00e5ff44",
                      color:"#00e5ff88", fontFamily:"Outfit,sans-serif",
                      fontSize:11, fontWeight:700, cursor:"pointer",
                      letterSpacing:"0.5px",
                    }}
                  >
                    ⚙ Admin
                  </button>
                )}
              </div>
            </div>
            <div className="page-sub">
              <span className="dot-active" />
              {isLiquiditySection
                ? <span>Monitoreo Pools de Liquidez, protección de rango y trading automatizado</span>
                : <span>{SECTION_TITLES[activeSection]}</span>
              }
            </div>
            {isLiquiditySection && (
              <div className="tabs">
                {TABS.map(tab => (
                  <button
                    key={tab.id}
                    className={`tab ${activeLiquidityTab === tab.id ? "active" : ""} ${!tab.available ? "tab-disabled" : ""}`}
                    onClick={() => tab.available && setActiveLiquidityTab(tab.id)}
                    style={{ opacity: tab.available ? 1 : 0.4, cursor: tab.available ? "pointer" : "not-allowed" }}
                    title={!tab.available ? "Próximamente" : undefined}
                  >
                    {tab.label}
                    {!tab.available && <span style={{ fontSize:9, marginLeft:4, color:"#2a5a72", letterSpacing:0.5 }}>pronto</span>}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="content" style={activeSection === "Programa" ? { padding:0 } : {}}>{renderContent()}</div>
        </div>
      </div>

      <InactivityOverlay enabled={isLiquiditySection} />
    </>
  );
}
