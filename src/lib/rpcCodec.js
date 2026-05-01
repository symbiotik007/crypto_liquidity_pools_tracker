// Utilidades puras de codificación/decodificación ABI y cálculos de precio.
// Sin efectos secundarios, sin React — testeables de forma aislada.

// ── RPC call ───────────────────────────────────────────────────────────────
export async function rpcCall(rpc, to, data) {
  const res = await fetch(rpc, {
    method:  "POST",
    headers: { "Content-Type": "application/json" },
    body:    JSON.stringify({
      jsonrpc: "2.0", id: 1, method: "eth_call",
      params:  [{ to, data }, "latest"],
    }),
  });
  const json = await res.json();
  if (json.error) throw new Error(json.error.message);
  return json.result;
}

// ── ABI encode ─────────────────────────────────────────────────────────────
export function encodeAddress(addr) {
  return addr.toLowerCase().replace("0x", "").padStart(64, "0");
}

export function encodeUint256(n) {
  return BigInt(n).toString(16).padStart(64, "0");
}

// ── ABI decode ─────────────────────────────────────────────────────────────
export function decodeUint256(hex, offset = 0) {
  return BigInt("0x" + hex.slice(2 + offset * 64, 2 + (offset + 1) * 64));
}

export function decodeAddress(hex, offset = 0) {
  return "0x" + hex.slice(2 + offset * 64 + 24, 2 + (offset + 1) * 64);
}

export function decodeInt24(hex, offset = 0) {
  const raw  = BigInt("0x" + hex.slice(2 + offset * 64, 2 + (offset + 1) * 64));
  const bits = BigInt(24);
  const max  = BigInt(1) << bits;
  return raw >= max / BigInt(2) ? Number(raw - (BigInt(1) << BigInt(256))) : Number(raw);
}

// ── Decode string — browser-safe (sin Buffer) ──────────────────────────────
export function hexToBytes(hexStr) {
  const bytes = new Uint8Array(hexStr.length / 2);
  for (let i = 0; i < hexStr.length; i += 2)
    bytes[i / 2] = parseInt(hexStr.slice(i, i + 2), 16);
  return bytes;
}

export function decodeString(hex) {
  try {
    const raw    = hex.startsWith("0x") ? hex.slice(2) : hex;
    const offset = Number(BigInt("0x" + raw.slice(0, 64))) * 2;
    const len    = Number(BigInt("0x" + raw.slice(offset, offset + 64)));
    if (len === 0) throw new Error("empty");
    const strHex = raw.slice(offset + 64, offset + 64 + len * 2);
    const decoded = new TextDecoder("utf-8").decode(hexToBytes(strHex));
    if (decoded && decoded.trim().length > 0) return decoded;
    throw new Error("blank");
  } catch {
    try {
      // bytes32 fixed-length fallback
      const raw   = hex.startsWith("0x") ? hex.slice(2) : hex;
      const bytes = hexToBytes(raw.slice(0, 64));
      const nullI = bytes.indexOf(0);
      return new TextDecoder("utf-8").decode(nullI > 0 ? bytes.slice(0, nullI) : bytes);
    } catch { return "?"; }
  }
}

// ── Uniswap V3 tick math ───────────────────────────────────────────────────

// Convierte un tick a precio. Para WETH(18)/USDT(6) devuelve el precio de ETH en USDT.
export function tickToPrice(tick, decimals0, decimals1) {
  const raw = Math.pow(1.0001, tick);
  return raw * Math.pow(10, decimals0 - decimals1);
}

// Determina el estado del pool respecto al rango y devuelve el objeto de estilo.
export function getStatus(currentTick, tickLower, tickUpper) {
  if (currentTick < tickLower) return { label: "Fuera (Abajo)",  color: "#ff4f6e", bg: "#1a0810", border: "#5a1a28" };
  if (currentTick > tickUpper) return { label: "Fuera (Arriba)", color: "#ffb347", bg: "#1a0e00", border: "#5a3a00" };
  return                              { label: "En Rango",        color: "#00ff88", bg: "#001a0e", border: "#003a22" };
}

// ── Display helpers ────────────────────────────────────────────────────────
export function formatPrice(p) {
  if (!p || isNaN(p)) return "0";
  if (p > 10000) return p.toLocaleString("en-US", { maximumFractionDigits: 2 });
  if (p > 1)     return p.toFixed(2);
  return p.toFixed(6);
}
