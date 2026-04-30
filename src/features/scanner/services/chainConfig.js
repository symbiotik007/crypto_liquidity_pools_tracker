// Configuración de cadenas soportadas para el scanner on-chain de Uniswap V3.
// Añadir una cadena aquí la hace disponible en el dropdown de escaneo sin
// tocar ningún componente.

export const CHAINS_CONFIG = {
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
};

// Lista plana para dropdowns/selects — [{id, label}]
export const CHAINS = Object.entries(CHAINS_CONFIG).map(([id, c]) => ({ id, label: c.label }));

// ABI selectors — keccak256 de la firma de función (4 bytes)
export const SEL = {
  balanceOf:           "0x70a08231", // balanceOf(address)
  tokenOfOwnerByIndex: "0x2f745c59", // tokenOfOwnerByIndex(address,uint256)
  positions:           "0x99fbab88", // positions(uint256)
  getPool:             "0x1698ee82", // getPool(address,address,uint24)
  slot0:               "0x3850c7bd", // slot0()
  decimals:            "0x313ce567", // decimals()
  symbol:              "0x95d89b41", // symbol()
};
