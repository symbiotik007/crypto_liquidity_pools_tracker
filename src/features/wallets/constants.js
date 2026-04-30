export const WALLET_TYPES = [
  { id: "proteccion", icon: "🛡", name: "Protección", sub: "Cobertura",     disabled: false },
  { id: "trading",    icon: "📊", name: "Trading",    sub: "Rango",         disabled: true  },
  { id: "insider",    icon: "🤖", name: "Insider",    sub: "Mean-rev",      disabled: true  },
  { id: "copy",       icon: "📋", name: "Copy",       sub: "No disponible", disabled: true  },
];

export const EXCHANGES = [
  { id: "hyperliquid", name: "Hyperliquid", color: "#7b61ff", bg: "rgba(123,97,255,0.12)", border: "rgba(123,97,255,0.4)",  hasPassphrase: false, isCex: false },
  { id: "binance",     name: "Binance",     color: "#F0B90B", bg: "rgba(240,185,11,0.1)",  border: "rgba(240,185,11,0.35)", hasPassphrase: false, isCex: true  },
  { id: "bybit",       name: "Bybit",       color: "#F7A600", bg: "rgba(247,166,0,0.1)",   border: "rgba(247,166,0,0.35)",  hasPassphrase: false, isCex: true  },
  { id: "okx",         name: "OKX",         color: "#e0e0e0", bg: "rgba(224,224,224,0.07)",border: "rgba(224,224,224,0.25)",hasPassphrase: true,  isCex: true  },
  { id: "bitget",      name: "Bitget",      color: "#00F0FF", bg: "rgba(0,240,255,0.08)",  border: "rgba(0,240,255,0.3)",   hasPassphrase: true,  isCex: true  },
  { id: "kucoin",      name: "KuCoin",      color: "#23AF91", bg: "rgba(35,175,145,0.1)",  border: "rgba(35,175,145,0.3)",  hasPassphrase: true,  isCex: true  },
];
