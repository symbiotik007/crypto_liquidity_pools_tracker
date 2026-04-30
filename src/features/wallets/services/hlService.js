import { encode as msgpackEncode } from "@msgpack/msgpack";

export const HL_API  = "https://api.hyperliquid.xyz/exchange";
export const HL_INFO = "https://api.hyperliquid.xyz/info";

export async function hlGetAccountState(address) {
  const res = await fetch(HL_INFO, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type: "clearinghouseState", user: address }),
  });
  return res.json();
}

export async function hlGetOpenOrders(address) {
  const res = await fetch(HL_INFO, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type: "openOrders", user: address }),
  });
  return res.json();
}

export async function hlGetPositions(address) {
  const [perpRes, spotRes] = await Promise.all([
    fetch(HL_INFO, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "clearinghouseState", user: address }),
    }),
    fetch(HL_INFO, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "spotClearinghouseState", user: address }),
    }),
  ]);
  const perp = await perpRes.json();
  const spot = await spotRes.json();

  const perpEquity = parseFloat(perp?.marginSummary?.accountValue ?? "0");
  const spotBalance = (spot?.balances ?? []).reduce((acc, b) => {
    return acc + parseFloat(b?.entryNtl ?? b?.hold ?? "0");
  }, 0);
  const totalBalance = perpEquity + spotBalance;

  const spotUsdc = (spot?.balances ?? []).find(b => b.coin === "USDC");
  const spotTotal = spotUsdc ? parseFloat(spotUsdc.total ?? "0") : 0;

  const balance = perpEquity > 0
    ? perpEquity
    : spotTotal > 0
      ? spotTotal
      : totalBalance;

  return {
    balance,
    perpEquity,
    spotTotal,
    positions: (perp?.assetPositions ?? []).map(p => ({
      coin:       p.position?.coin,
      size:       parseFloat(p.position?.szi ?? "0"),
      entryPrice: parseFloat(p.position?.entryPx ?? "0"),
      pnl:        parseFloat(p.position?.unrealizedPnl ?? "0"),
      leverage:   p.position?.leverage?.value ?? 1,
      side:       parseFloat(p.position?.szi ?? "0") > 0 ? "Long" : "Short",
    })),
    spotBalances: (spot?.balances ?? []).map(b => ({
      coin:  b.coin,
      total: parseFloat(b.total ?? "0"),
      hold:  parseFloat(b.hold ?? "0"),
    })),
    rawPerp: perp,
    rawSpot: spot,
  };
}

export async function hlGetAllMids() {
  const res = await fetch(HL_INFO, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type: "allMids" }),
  });
  return res.json();
}

// Keccak-256 / secp256k1 via ethers.js from CDN (loaded in index.html)
export function hlActionHash(action, vaultAddress, nonce) {
  const msgPackBytes = msgpackEncode(action);
  const additionalBytesLength = vaultAddress === null ? 9 : 29;
  const data = new Uint8Array(msgPackBytes.length + additionalBytesLength);
  data.set(msgPackBytes);
  const view = new DataView(data.buffer);
  view.setBigUint64(msgPackBytes.length, BigInt(nonce), false);
  if (vaultAddress === null) {
    data[msgPackBytes.length + 8] = 0;
  } else {
    data[msgPackBytes.length + 8] = 1;
    const vaultBytes = new Uint8Array(
      vaultAddress.slice(2).match(/.{2}/g).map(h => parseInt(h, 16))
    );
    data.set(vaultBytes, msgPackBytes.length + 9);
  }
  return window.ethers.keccak256(data);
}

export async function hlSignAndSend(action, privateKey, vaultAddress = null) {
  if (!window.ethers) throw new Error("ethers.js no cargado");

  const { ethers } = window;
  const wallet = new ethers.Wallet(
    privateKey.startsWith("0x") ? privateKey : "0x" + privateKey
  );
  const nonce        = Date.now();
  const connectionId = hlActionHash(action, vaultAddress, nonce);

  const domain = {
    name:              "HyperliquidSignTransaction",
    version:           "1",
    chainId:           1337,
    verifyingContract: "0x0000000000000000000000000000000000000000",
  };
  const types = {
    Agent: [
      { name: "source",       type: "string"  },
      { name: "connectionId", type: "bytes32" },
    ],
  };

  const signature = await wallet.signTypedData(
    domain, types, { source: "a", connectionId }
  );
  const sig = ethers.Signature.from(signature);

  const payload = {
    action,
    nonce,
    signature: { r: sig.r, s: sig.s, v: sig.v },
    ...(vaultAddress ? { vaultAddress } : {}),
  };

  const res  = await fetch(HL_API, {
    method:  "POST",
    headers: { "Content-Type": "application/json" },
    body:    JSON.stringify(payload),
  });
  const text = await res.text();
  try { return JSON.parse(text); }
  catch { throw new Error(`HL response: ${text.slice(0, 300)}`); }
}

export async function hlGetMeta() {
  const res = await fetch(HL_INFO, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type: "meta" }),
  });
  return res.json();
}

export async function hlPlaceOrder({ privateKey, coin, side, size, price = null, reduceOnly = false }) {
  const meta  = await hlGetMeta();
  const asset = meta?.universe?.findIndex(a => a.name === coin);
  if (asset === undefined || asset === -1)
    throw new Error(`Coin "${coin}" no encontrada en Hyperliquid`);

  const isBuy = side === "B";
  let orderPrice = price;
  if (!orderPrice) {
    const mids = await hlGetAllMids();
    const mid  = parseFloat(mids[coin] || "0");
    if (mid <= 0) throw new Error(`No se pudo obtener precio de ${coin}`);
    const slippage = isBuy ? mid * 1.05 : mid * 0.95;
    orderPrice = parseFloat(slippage.toPrecision(5));
  }

  const action = {
    type:   "order",
    orders: [{
      a:  asset,
      b:  isBuy,
      p:  String(orderPrice),
      s:  String(size),
      r:  reduceOnly,
      t:  price
        ? { limit: { tif: "Gtc" } }
        : { limit: { tif: "Ioc" } },
    }],
    grouping: "na",
  };

  return hlSignAndSend(action, privateKey);
}

export async function hlCancelOrder({ privateKey, coin, orderId }) {
  const meta  = await hlGetMeta();
  const asset = meta?.universe?.findIndex(a => a.name === coin);
  const action = {
    type:    "cancel",
    cancels: [{ a: asset, o: orderId }],
  };
  return hlSignAndSend(action, privateKey);
}

export async function hlClosePosition({ privateKey, coin, size }) {
  return hlPlaceOrder({
    privateKey,
    coin,
    side:       size > 0 ? "A" : "B",
    size:       Math.abs(size),
    reduceOnly: true,
  });
}

export async function hlDeriveAddress(privateKey) {
  if (!window.ethers) return null;
  try {
    const wallet = new window.ethers.Wallet(
      privateKey.startsWith("0x") ? privateKey : "0x" + privateKey
    );
    return wallet.address;
  } catch { return null; }
}
