// ── Pool ──────────────────────────────────────────────────────────────────────

export interface PoolStatus {
  label:  string
  color:  string
  bg:     string
  border: string
}

export interface RevertPerf {
  usd?:    { pnl?: string; pool_apr?: string; il?: string }
  hodl?:   { pnl?: string; apr?: string; fee_apr?: string }
  token0?: { pnl?: string }
  token1?: { pnl?: string }
}

export interface RevertData {
  underlying_value?:   string
  deposits_value?:     string
  withdrawals_value?:  string
  fees_value?:         string
  age?:                string
  pool_price?:         string
  price_lower?:        string
  price_upper?:        string
  current_amount0?:    string
  current_amount1?:    string
  uncollected_fees0?:  string
  uncollected_fees1?:  string
  collected_fees0?:    string
  collected_fees1?:    string
  total_deposits1?:    string
  total_withdrawn1?:   string
  performance?:        RevertPerf
}

export interface Pool {
  tokenId:            number
  chainName:          string
  chainId:            number
  poolAddress:        string
  dex:                string
  token0Symbol:       string
  token1Symbol:       string
  token0Address:      string
  token1Address:      string
  priceLower:         number
  priceUpper:         number
  tickLower:          number
  tickUpper:          number
  priceAtCreation:    number
  valueAtCreation:    number
  walletAddress:      string
  importedAt:         number
  createdAtTimestamp: number
  // runtime fields (filled by Revert enricher)
  valueUsd:           number
  currentPrice:       number
  amount0:            string
  amount1:            string
  status:             PoolStatus
  _dbId:              string | number
  revert?:            RevertData | null
  collectedFeesUsd?:  number
  fee?:               number
  og_owner?:          string
}

export interface PoolStats {
  valueUsd:       number
  depositsValue:  number
  netInvested:    number
  withdrawalsVal: number
  pnlUsd:         number
  pnlPct:         number
  aprUsd:         number
  ilUsd:          number
  pnlVsHodl:      number
  aprVsHodl:      number
  pnlToken0:      number
  pnlToken1:      number
  feesValue:      number
  feesApr:        number
  uncollected0:   number
  uncollected1:   number
  collected0:     number
  collected1:     number
  ageDays:        number
  ageHours:       number
  amount0:        number
  amount1:        number
  currentPrice:   number
  priceLower:     number
  priceUpper:     number
  entryPrice:     number
  barPct:         number
  delta24hPnl:    number
  delta24hApr:    number
  totalDep1:      number
  totalWit1:      number
}

// ── Wallet ────────────────────────────────────────────────────────────────────

export interface Wallet {
  id:             string
  user_id:        string
  label:          string
  exchange_id:    string
  api_key:        string
  api_secret:     string
  passphrase?:    string
  wallet_address: string
  wallet_type:    string
  created_at:     string
}

// ── Notification ──────────────────────────────────────────────────────────────

export interface Notification {
  id:         string
  user_id:    string
  type:       string
  title:      string
  message:    string
  leida:      boolean
  created_at: string
  pool_id?:   string | number | null
}

// ── Constants ─────────────────────────────────────────────────────────────────

export interface WalletType {
  id:       string
  icon:     string
  name:     string
  sub:      string
  disabled: boolean
}

export interface ExchangeConfig {
  id:             string
  name:           string
  color:          string
  bg:             string
  border:         string
  hasPassphrase:  boolean
  isCex:          boolean
}

// ── Chain / Scanner ───────────────────────────────────────────────────────────

export interface ChainConfig {
  label:      string
  chainId:    number
  rpc:        string
  nftManager: string
  factory:    string
}

export interface Chain {
  id:    string
  label: string
}

export interface ScannedPosition {
  tokenId:      number
  token0Symbol: string
  token1Symbol: string
  fee:          number
  priceLower:   number
  priceUpper:   number
  currentPrice: number
  status:       PoolStatus
  og_owner?:    string
}
