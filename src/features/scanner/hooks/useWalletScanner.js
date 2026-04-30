import { useState, useRef, useCallback } from 'react';
import { scanWalletOnChain } from '../services/uniswapV3Service';

/**
 * Hook que encapsula el ciclo de vida del escaneo on-chain:
 * loading → progress → resultado/error → idle.
 *
 * Uso:
 *   const { scan, cancel, progress, error, isScanning } = useWalletScanner();
 *   const pools = await scan('0xABC...', 'arbitrum');
 */
export function useWalletScanner() {
  const [progress, setProgress] = useState(null); // null = idle
  const [error,    setError]    = useState(null);
  const abortRef = useRef(null);

  const scan = useCallback(async (walletAddr, chainKey) => {
    abortRef.current?.abort();
    abortRef.current = new AbortController();
    setError(null);
    setProgress({ phase: 'starting', scanned: 0, total: 0 });

    try {
      const pools = await scanWalletOnChain(
        walletAddr,
        chainKey,
        setProgress,
        abortRef.current.signal,
      );
      return pools;
    } catch (e) {
      if (e.name !== 'AbortError') setError(e.message);
      return [];
    } finally {
      setProgress(null);
    }
  }, []);

  const cancel = useCallback(() => abortRef.current?.abort(), []);

  return {
    scan,
    cancel,
    progress,
    error,
    isScanning: progress !== null,
  };
}
