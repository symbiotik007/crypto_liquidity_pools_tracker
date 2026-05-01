import type { ChainConfig, Chain } from '../../../types'

export const CHAINS_CONFIG: Record<string, ChainConfig> = {
  ethereum: {
    label:      "Ethereum",
    chainId:    1,
    rpc:        "https://eth.llamarpc.com",
    nftManager: "0xC36442b4a4522E871399CD717aBDD847Ab11FE88",
    factory:    "0x1F98431c8aD98523631AE4a59f267346ea31F984",
  },
  arbitrum: {
    label:      "Arbitrum",
    chainId:    42161,
    rpc:        "https://arb1.arbitrum.io/rpc",
    nftManager: "0xC36442b4a4522E871399CD717aBDD847Ab11FE88",
    factory:    "0x1F98431c8aD98523631AE4a59f267346ea31F984",
  },
  optimism: {
    label:      "Optimism",
    chainId:    10,
    rpc:        "https://mainnet.optimism.io",
    nftManager: "0xC36442b4a4522E871399CD717aBDD847Ab11FE88",
    factory:    "0x1F98431c8aD98523631AE4a59f267346ea31F984",
  },
  base: {
    label:      "Base",
    chainId:    8453,
    rpc:        "https://mainnet.base.org",
    nftManager: "0x03a520b32C04BF3bEEf7BEb72E919cf822Ed34f1",
    factory:    "0x33128a8fC17869897dcE68Ed026d694621f6FDfD",
  },
}

export const CHAINS: Chain[] = Object.entries(CHAINS_CONFIG).map(([id, c]) => ({ id, label: c.label }))

// ABI selectors — keccak256 de la firma de función (4 bytes)
export const SEL: Record<string, string> = {
  balanceOf:           "0x70a08231",
  tokenOfOwnerByIndex: "0x2f745c59",
  positions:           "0x99fbab88",
  getPool:             "0x1698ee82",
  slot0:               "0x3850c7bd",
  decimals:            "0x313ce567",
  symbol:              "0x95d89b41",
}
