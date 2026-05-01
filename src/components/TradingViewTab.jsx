import { useState, useEffect } from "react";

export default function TradingViewTab() {
  const [symbol, setSymbol] = useState("BINANCE:ETHUSD");
  const [interval, setInterval] = useState("60");
  const [theme] = useState("dark");
  const containerId = "tv_chart_container";

  const SYMBOLS = [
    { label: "ETH/USD",  value: "BINANCE:ETHUSD" },
    { label: "BTC/USD",  value: "BINANCE:BTCUSD" },
    { label: "ARB/USD",  value: "BINANCE:ARBUSDT" },
    { label: "UNI/USD",  value: "BINANCE:UNIUSDT" },
    { label: "LINK/USD", value: "BINANCE:LINKUSDT" },
    { label: "SOL/USD",  value: "BINANCE:SOLUSDT" },
    { label: "BNB/USD",  value: "BINANCE:BNBUSDT" },
  ];

  const INTERVALS = [
    { label: "1m",  value: "1" },
    { label: "5m",  value: "5" },
    { label: "15m", value: "15" },
    { label: "1h",  value: "60" },
    { label: "4h",  value: "240" },
    { label: "1D",  value: "D" },
    { label: "1W",  value: "W" },
  ];

  useEffect(() => {
    const existing = document.getElementById(containerId);
    if (existing) existing.innerHTML = "";

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;
    script.onload = () => {
      if (window.TradingView) {
        new window.TradingView.widget({
          container_id: containerId,
          symbol,
          interval,
          timezone: "America/Bogota",
          theme,
          style: "1",
          locale: "es",
          toolbar_bg: "#0a1520",
          enable_publishing: false,
          hide_top_toolbar: false,
          hide_legend: false,
          save_image: true,
          studies: ["RSI@tv-basicstudies", "MACD@tv-basicstudies"],
          width: "100%",
          height: "100%",
          autosize: true,
          backgroundColor: "#050a0f",
          gridColor: "rgba(14,36,53,0.6)",
        });
      }
    };

    const container = document.getElementById(containerId);
    if (container) container.appendChild(script);

    return () => {
      if (container) container.innerHTML = "";
    };
  }, [symbol, interval]);

  const btnStyle = (active) => ({
    padding: "5px 12px", fontSize: 12, fontWeight: 600, fontFamily: "Outfit, sans-serif",
    cursor: "pointer", border: "1px solid", borderRadius: 6,
    background: active ? "rgba(0,229,255,0.12)" : "transparent",
    borderColor: active ? "#00e5ff" : "#1a3a5e",
    color: active ? "#00e5ff" : "#4a7a96",
    transition: "all 0.15s",
  });

  return (
    <div style={{ display:"flex", flexDirection:"column", height:"100%", gap:0 }}>
      <div style={{ display:"flex", alignItems:"center", gap:8, padding:"10px 0 12px", flexWrap:"wrap" }}>
        <div style={{ display:"flex", gap:4, flexWrap:"wrap" }}>
          {SYMBOLS.map(s => (
            <button key={s.value} style={btnStyle(symbol === s.value)} onClick={() => setSymbol(s.value)}>
              {s.label}
            </button>
          ))}
        </div>
        <div style={{ width:1, height:20, background:"#1a3a5e", margin:"0 4px", flexShrink:0 }} />
        <div style={{ display:"flex", gap:4 }}>
          {INTERVALS.map(iv => (
            <button key={iv.value} style={btnStyle(interval === iv.value)} onClick={() => setInterval(iv.value)}>
              {iv.label}
            </button>
          ))}
        </div>
      </div>

      <div
        id={containerId}
        style={{
          flex: 1, minHeight: 0, borderRadius: 8,
          border: "1px solid #0e2435", overflow: "hidden",
          background: "#050a0f",
        }}
      />
    </div>
  );
}
