import { useEffect, useRef } from "react";

const CHART_ID = "chart2_container";

export default function Chart2Tab() {
  const scriptRef = useRef(null);

  useEffect(() => {
    const container = document.getElementById(CHART_ID);
    if (!container) return;
    container.innerHTML = "";
    if (scriptRef.current) { scriptRef.current.remove(); scriptRef.current = null; }

    const script = document.createElement("script");
    script.src   = "https://s3.tradingview.com/tv.js";
    script.async = true;
    script.onload = () => {
      if (!window.TradingView) return;
      new window.TradingView.widget({
        container_id:        CHART_ID,
        symbol:              "BINANCE:BTCUSDTPERP",
        interval:            "60",
        timezone:            "America/Bogota",
        theme:               "dark",
        style:               "1",
        locale:              "es",
        toolbar_bg:          "#0d0d0d",
        enable_publishing:   false,
        hide_top_toolbar:    false,
        hide_legend:         false,
        save_image:          true,
        studies:             ["Volume@tv-basicstudies"],
        width:               "100%",
        height:              "100%",
        autosize:            true,
        backgroundColor:     "#0d0d0d",
        gridColor:           "rgba(255,255,255,0.04)",
        hide_side_toolbar:   false,
        allow_symbol_change: true,
        details:             true,
        withdateranges:      true,
        range:               "3M",
      });
    };

    container.appendChild(script);
    scriptRef.current = script;
    return () => { if (container) container.innerHTML = ""; };
  }, []);

  return (
    <div style={{ width: "100%", height: "100%", background: "#0d0d0d" }}>
      <div id={CHART_ID} style={{ width: "100%", height: "100%" }} />
    </div>
  );
}
