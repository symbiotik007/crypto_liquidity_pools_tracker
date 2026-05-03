import { useState, useEffect, useRef } from "react";

const EXCHANGES = [
  { id: "binance-futures", label: "Binance Futures", short: "BINF" },
  { id: "binance-spot",    label: "Binance Spot",    short: "BINS" },
  { id: "bybit",           label: "Bybit",            short: "BYBT" },
  { id: "okx",             label: "OKX",              short: "OKX"  },
];

// TV symbol map: [exchange_id][coin] → TradingView symbol string
const TV_SYMBOL = {
  "binance-futures": {
    BTC: "BINANCE:BTCUSDTPERP", ETH: "BINANCE:ETHUSDTPERP",
    SOL: "BINANCE:SOLUSDT.P",   BNB: "BINANCE:BNBUSDTPERP",
    XRP: "BINANCE:XRPUSDTPERP", DOGE: "BINANCE:DOGEUSDTPERP",
    LINK: "BINANCE:LINKUSDTPERP", ADA: "BINANCE:ADAUSDTPERP",
    AVAX: "BINANCE:AVAXUSDTPERP", MATIC: "BINANCE:MATICUSDTPERP",
    OP: "BINANCE:OPUSDTPERP",   ARB: "BINANCE:ARBUSDTPERP",
    ORDI: "BINANCE:ORDIUSDTPERP",
  },
  "binance-spot": {
    BTC: "BINANCE:BTCUSDT", ETH: "BINANCE:ETHUSDT",
    SOL: "BINANCE:SOLUSDT", BNB: "BINANCE:BNBUSDT",
    XRP: "BINANCE:XRPUSDT", DOGE: "BINANCE:DOGEUSDT",
    LINK: "BINANCE:LINKUSDT", ADA: "BINANCE:ADAUSDT",
    AVAX: "BINANCE:AVAXUSDT", MATIC: "BINANCE:MATICUSDT",
    OP: "BINANCE:OPUSDT",   ARB: "BINANCE:ARBUSDT",
    ORDI: "BINANCE:ORDIUSDT",
  },
  "bybit": {
    BTC: "BYBIT:BTCUSDT.P", ETH: "BYBIT:ETHUSDT.P",
    SOL: "BYBIT:SOLUSDT.P", BNB: "BYBIT:BNBUSDT.P",
    XRP: "BYBIT:XRPUSDT.P", DOGE: "BYBIT:DOGEUSDT.P",
    LINK: "BYBIT:LINKUSDT.P", ADA: "BYBIT:ADAUSDT.P",
    AVAX: "BYBIT:AVAXUSDT.P", MATIC: "BYBIT:MATICUSDT.P",
    ARB: "BYBIT:ARBUSDT.P",
  },
  "okx": {
    BTC: "OKX:BTCUSDTSWAP", ETH: "OKX:ETHUSDTSWAP",
    SOL: "OKX:SOLUSDTSWAP", BNB: "OKX:BNBUSDTSWAP",
    XRP: "OKX:XRPUSDTSWAP", DOGE: "OKX:DOGEUSDTSWAP",
    LINK: "OKX:LINKUSDTSWAP", ADA: "OKX:ADAUSDTSWAP",
    AVAX: "OKX:AVAXUSDTSWAP", ARB: "OKX:ARBUSDTSWAP",
  },
};

const COINS = [
  { id: "BTC",   label: "Bitcoin",  color: "#f7931a" },
  { id: "ETH",   label: "Ethereum", color: "#627eea" },
  { id: "SOL",   label: "Solana",   color: "#9945ff" },
  { id: "XRP",   label: "Ripple",   color: "#346aa9" },
  { id: "BNB",   label: "BNB",      color: "#f3ba2f" },
  { id: "DOGE",  label: "Dogecoin", color: "#c2a633" },
  { id: "AVAX",  label: "Avalanche",color: "#e84142" },
  { id: "LINK",  label: "Chainlink",color: "#2a5ada" },
  { id: "ARB",   label: "Arbitrum", color: "#12aaff" },
  { id: "OP",    label: "Optimism", color: "#ff0420" },
  { id: "ORDI",  label: "ORDI",     color: "#ff7c00" },
  { id: "ADA",   label: "Cardano",  color: "#0d1e2d" },
  { id: "MATIC", label: "Polygon",  color: "#8247e5" },
];

const INTERVALS = [
  { label: "1m",  value: "1"   },
  { label: "5m",  value: "5"   },
  { label: "15m", value: "15"  },
  { label: "30m", value: "30"  },
  { label: "1h",  value: "60"  },
  { label: "4h",  value: "240" },
  { label: "1D",  value: "D"   },
  { label: "1W",  value: "W"   },
];

const CHART_ID = "velo_chart_container";

export default function VeloChartTab() {
  const [exchange, setExchange]   = useState("binance-futures");
  const [coin, setCoin]           = useState("BTC");
  const [interval, setInterval]   = useState("60");
  const [panelOpen, setPanelOpen] = useState(true);
  const [winW, setWinW]           = useState(() => window.innerWidth);
  const scriptRef                 = useRef(null);

  useEffect(() => {
    const onResize = () => setWinW(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const isMobile = winW < 768;
  // On mobile default panel closed
  useEffect(() => { if (isMobile) setPanelOpen(false); }, [isMobile]);

  const tvSymbol = TV_SYMBOL[exchange]?.[coin]
    ?? TV_SYMBOL["binance-futures"][coin]
    ?? "BINANCE:BTCUSDTPERP";

  useEffect(() => {
    const container = document.getElementById(CHART_ID);
    if (!container) return;
    container.innerHTML = "";

    if (scriptRef.current) {
      scriptRef.current.remove();
      scriptRef.current = null;
    }

    const script = document.createElement("script");
    script.src   = "https://s3.tradingview.com/tv.js";
    script.async = true;
    script.onload = () => {
      if (!window.TradingView) return;
      new window.TradingView.widget({
        container_id: CHART_ID,
        symbol: tvSymbol,
        interval,
        timezone: "America/Bogota",
        theme: "dark",
        style: "1",
        locale: "es",
        toolbar_bg: "#0d0d0d",
        enable_publishing: false,
        hide_top_toolbar: false,
        hide_legend: false,
        save_image: true,
        studies: ["Volume@tv-basicstudies"],
        width: "100%",
        height: "100%",
        autosize: true,
        backgroundColor: "#0d0d0d",
        gridColor: "rgba(255,255,255,0.04)",
        hide_side_toolbar: false,
        allow_symbol_change: true,
        details: true,
        hotlist: false,
        calendar: false,
        withdateranges: true,
        range: "3M",
      });
    };

    container.appendChild(script);
    scriptRef.current = script;

    return () => {
      if (container) container.innerHTML = "";
    };
  }, [tvSymbol, interval]);

  const coinAvailable = (c) => !!TV_SYMBOL[exchange]?.[c.id];

  // ── styles ──────────────────────────────────────────────────────────
  const C = {
    wrap: {
      display: "flex", height: "100%", minHeight: 0, position: "relative",
      background: "#0d0d0d", fontFamily: "Outfit, sans-serif",
    },
    // Left panel
    panel: {
      width: panelOpen ? (isMobile ? "100%" : 220) : 0,
      minWidth: 0, flexShrink: 0,
      borderRight: panelOpen ? "1px solid #1a1a1a" : "none",
      background: "#111",
      overflow: "hidden",
      transition: "width 0.2s ease",
      display: "flex", flexDirection: "column",
      position: isMobile && panelOpen ? "absolute" : "relative",
      zIndex: isMobile ? 20 : 1,
      height: "100%",
    },
    panelHead: {
      padding: "12px 12px 8px",
      borderBottom: "1px solid #1a1a1a",
      flexShrink: 0,
    },
    panelTitle: {
      fontSize: 10, letterSpacing: 2, color: "#444", textTransform: "uppercase",
      fontWeight: 700, marginBottom: 10,
    },
    exchRow: { display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 2 },
    exchBtn: (active) => ({
      padding: "4px 8px", fontSize: 10, fontWeight: 700, cursor: "pointer",
      border: "1px solid", fontFamily: "Outfit,sans-serif",
      background: active ? "rgba(0,229,255,0.1)" : "transparent",
      borderColor: active ? "#00e5ff" : "#222",
      color: active ? "#00e5ff" : "#444",
      letterSpacing: 0.5,
    }),
    coinList: { flex: 1, overflowY: "auto", paddingBottom: 8 },
    coinItem: (active, disabled) => ({
      display: "flex", alignItems: "center", gap: 8,
      padding: "8px 12px", cursor: disabled ? "not-allowed" : "pointer",
      background: active ? "rgba(0,229,255,0.06)" : "transparent",
      borderLeft: active ? "2px solid #00e5ff" : "2px solid transparent",
      opacity: disabled ? 0.3 : 1,
      transition: "background 0.1s",
    }),
    coinDot: (color) => ({
      width: 7, height: 7, borderRadius: "50%", background: color, flexShrink: 0,
    }),
    coinLabel: (active) => ({
      fontSize: 13, fontWeight: 700, color: active ? "#fff" : "#888",
      flex: 1, letterSpacing: 0.3,
    }),
    coinSub: { fontSize: 10, color: "#444" },
    // Chart area
    chartArea: {
      flex: 1, minWidth: 0, display: "flex", flexDirection: "column",
    },
    toolbar: {
      display: "flex", alignItems: "center", gap: 0,
      borderBottom: "1px solid #1a1a1a", flexShrink: 0,
      background: "#0d0d0d", padding: "0 12px",
      height: 40, overflowX: "auto",
    },
    toggleBtn: {
      display: "flex", alignItems: "center", gap: 6,
      padding: "5px 10px", fontSize: 11, fontWeight: 700,
      background: "transparent", border: "none",
      color: "#444", cursor: "pointer", fontFamily: "Outfit,sans-serif",
      flexShrink: 0, marginRight: 8,
    },
    symbolTag: {
      fontSize: 13, fontWeight: 800, color: "#00e5ff",
      marginRight: 12, flexShrink: 0, letterSpacing: 0.5,
    },
    sep: { width: 1, height: 16, background: "#1a1a1a", margin: "0 8px", flexShrink: 0 },
    ivBtn: (active) => ({
      padding: "4px 8px", fontSize: 11, fontWeight: active ? 700 : 500,
      cursor: "pointer", border: "none", fontFamily: "Outfit,sans-serif",
      background: active ? "rgba(0,229,255,0.1)" : "transparent",
      color: active ? "#00e5ff" : "#555",
      flexShrink: 0, letterSpacing: 0.5,
    }),
    chartBox: {
      flex: 1, minHeight: 0, background: "#0d0d0d",
    },
    // Mobile overlay close
    overlay: {
      display: isMobile && panelOpen ? "block" : "none",
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 19,
    },
  };

  const selectedCoin = COINS.find(c => c.id === coin);

  return (
    <div style={C.wrap}>
      {/* Mobile overlay */}
      <div style={C.overlay} onClick={() => setPanelOpen(false)} />

      {/* Left panel */}
      <div style={C.panel}>
        <div style={C.panelHead}>
          <div style={C.panelTitle}>Exchange</div>
          <div style={C.exchRow}>
            {EXCHANGES.map(ex => (
              <button key={ex.id} style={C.exchBtn(exchange === ex.id)}
                onClick={() => {
                  setExchange(ex.id);
                  if (!TV_SYMBOL[ex.id]?.[coin]) {
                    const first = Object.keys(TV_SYMBOL[ex.id] ?? {})[0];
                    if (first) setCoin(first);
                  }
                }}
              >
                {ex.short}
              </button>
            ))}
          </div>
        </div>
        <div style={{ padding:"8px 12px 4px", fontSize:10, letterSpacing:2, color:"#444", textTransform:"uppercase", fontWeight:700, flexShrink:0 }}>
          Símbolos
        </div>
        <div style={C.coinList}>
          {COINS.map(c => {
            const active   = coin === c.id;
            const disabled = !coinAvailable(c);
            return (
              <div key={c.id} style={C.coinItem(active, disabled)}
                onClick={() => !disabled && setCoin(c.id)}
              >
                <div style={C.coinDot(c.color)} />
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={C.coinLabel(active)}>{c.id}</div>
                  <div style={C.coinSub}>{c.label}</div>
                </div>
                {active && <div style={{ fontSize:9, color:"#00e5ff", letterSpacing:1 }}>●</div>}
              </div>
            );
          })}
        </div>
        <div style={{ padding:"12px", borderTop:"1px solid #1a1a1a", flexShrink:0 }}>
          <a href="https://velo.xyz/chart" target="_blank" rel="noreferrer"
            style={{ display:"block", textAlign:"center", fontSize:11, color:"#333",
              textDecoration:"none", letterSpacing:1 }}>
            velo.xyz/chart ↗
          </a>
        </div>
      </div>

      {/* Chart area */}
      <div style={C.chartArea}>
        <div style={C.toolbar}>
          <button style={C.toggleBtn} onClick={() => setPanelOpen(v => !v)}
            title={panelOpen ? "Cerrar panel" : "Abrir panel"}>
            {panelOpen ? "◀" : "▶"}
          </button>
          <span style={C.symbolTag}>
            {selectedCoin?.id ?? coin} / USDT
            <span style={{ fontSize:10, color:"#444", marginLeft:6, fontWeight:500 }}>
              {EXCHANGES.find(e => e.id === exchange)?.label}
            </span>
          </span>
          <div style={C.sep} />
          {INTERVALS.map(iv => (
            <button key={iv.value} style={C.ivBtn(interval === iv.value)}
              onClick={() => setInterval(iv.value)}>
              {iv.label}
            </button>
          ))}
        </div>
        <div id={CHART_ID} style={C.chartBox} />
      </div>
    </div>
  );
}
