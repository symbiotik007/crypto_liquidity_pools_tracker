const REVERT_API = "/revert-api/v1/positions/account";

export async function fetchRevertPositions(walletAddress) {
  try {
    const url = `${REVERT_API}/${walletAddress.toLowerCase()}?limit=100&active=true&with-v4=true`;
    const res  = await fetch(url);
    if (!res.ok) return {};
    const data = await res.json();
    const map = {};
    for (const pos of (data.data || [])) {
      map[String(pos.nft_id)] = pos;
    }
    return map;
  } catch { return {}; }
}

export function buildPriceMapFromRevert(revertMap) {
  const map = {};
  for (const pos of Object.values(revertMap)) {
    const tokens = pos.tokens || {};
    for (const t of Object.values(tokens)) {
      const sym = (t.symbol || "").toUpperCase().replace("WETH", "ETH");
      const price = parseFloat(t.price ?? "0");
      if (sym && price > 0) map[sym] = price;
    }
  }
  return map;
}

export async function enrichPoolsWithMarketData(pools) {
  const wallets = [...new Set(pools.map(p => p.og_owner || p.walletAddress).filter(Boolean))];
  const revertMaps = await Promise.all(wallets.map(w => fetchRevertPositions(w)));
  const revertAll  = Object.assign({}, ...revertMaps);

  const priceMap = Object.keys(revertAll).length > 0
    ? buildPriceMapFromRevert(revertAll)
    : {};

  return pools.map(pos => {
    const r   = revertAll[String(pos.tokenId)] ?? pos.revert ?? null;
    const sym0 = (pos.token0Symbol || "").toUpperCase().replace("WETH", "ETH");
    const sym1 = (pos.token1Symbol || "").toUpperCase();
    const isStable1 = sym1.includes("USD") || ["USDC","USDT","DAI"].includes(sym1);

    const livePrice = r
      ? parseFloat(r.pool_price ?? pos.currentPrice ?? 0)
      : (priceMap[sym0] ?? pos.currentPrice ?? 0);

    const inRange = r ? r.in_range : (livePrice >= pos.priceLower && livePrice <= pos.priceUpper);
    let status;
    if (inRange)                          status = { label: "En Rango",       color: "#00ff88", bg: "#001a0e", border: "#003a22" };
    else if (livePrice < pos.priceLower)  status = { label: "Fuera (Abajo)", color: "#ff4f6e", bg: "#1a0810", border: "#5a1a28" };
    else                                  status = { label: "Fuera (Arriba)",color: "#ffb347", bg: "#1a0e00", border: "#5a3a00" };

    const amount0  = r ? parseFloat(r.current_amount0 ?? pos.amount0 ?? "0") : parseFloat(pos.amount0 ?? "0");
    const amount1  = r ? parseFloat(r.current_amount1 ?? pos.amount1 ?? "0") : parseFloat(pos.amount1 ?? "0");
    const valueUsd = r
      ? parseFloat(r.underlying_value ?? "0")
      : (amount0 * (priceMap[sym0] ?? livePrice ?? 0) + amount1 * (isStable1 ? 1 : (priceMap[sym1] ?? 0)));

    return {
      ...pos,
      currentPrice: livePrice,
      status,
      valueUsd,
      amount0: String(amount0),
      amount1: String(amount1),
      revert: r,
      og_owner: pos.og_owner ?? pos.walletAddress,
    };
  });
}
