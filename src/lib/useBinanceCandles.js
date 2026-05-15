import { useState, useEffect, useRef } from 'react';

const BASE_REST = 'https://api.binance.com/api/v3/klines';
const BASE_WS   = 'wss://stream.binance.com:9443/ws';

function parseKline(k) {
  return {
    time:   k[0] / 1000,
    open:   parseFloat(k[1]),
    high:   parseFloat(k[2]),
    low:    parseFloat(k[3]),
    close:  parseFloat(k[4]),
    volume: parseFloat(k[5]),
  };
}

export function useBinanceCandles(symbol, interval) {
  const [candles,           setCandles]           = useState([]);
  const [loading,           setLoading]           = useState(true);
  const [error,             setError]             = useState(null);
  const [liveCandle,        setLiveCandle]        = useState(null);
  const [connectionStatus,  setConnectionStatus]  = useState('connecting');
  const wsRef = useRef(null);

  // ── REST: fetch 500 historical candles ─────────────────────────────
  useEffect(() => {
    setLoading(true);
    setError(null);
    setLiveCandle(null);

    const controller = new AbortController();

    fetch(
      `${BASE_REST}?symbol=${symbol}&interval=${interval}&limit=500`,
      { signal: controller.signal }
    )
      .then(r => {
        if (!r.ok) throw new Error(`Binance API ${r.status}`);
        return r.json();
      })
      .then(data => {
        setCandles(data.map(parseKline));
        setLoading(false);
      })
      .catch(err => {
        if (err.name === 'AbortError') return;
        setError(err.message);
        setLoading(false);
      });

    return () => controller.abort();
  }, [symbol, interval]);

  // ── WebSocket: real-time kline stream ──────────────────────────────
  useEffect(() => {
    setConnectionStatus('connecting');

    const stream = `${symbol.toLowerCase()}@kline_${interval}`;
    const ws = new WebSocket(`${BASE_WS}/${stream}`);
    wsRef.current = ws;

    ws.onopen  = () => setConnectionStatus('connected');
    ws.onclose = () => setConnectionStatus('disconnected');
    ws.onerror = () => setConnectionStatus('error');

    ws.onmessage = (evt) => {
      const { k } = JSON.parse(evt.data);
      setLiveCandle({
        time:   k.t / 1000,
        open:   parseFloat(k.o),
        high:   parseFloat(k.h),
        low:    parseFloat(k.l),
        close:  parseFloat(k.c),
        volume: parseFloat(k.v),
      });
    };

    return () => {
      ws.close();
      setConnectionStatus('disconnected');
    };
  }, [symbol, interval]);

  return { candles, loading, error, liveCandle, connectionStatus };
}
