import type { Pool, PoolStats } from '../../../types'

export function calcPoolStats(pos: Pool): PoolStats {
  const r = pos.revert ?? null

  const valueUsd        = r ? parseFloat(r.underlying_value  ?? "0") : (pos.valueUsd ?? 0)
  const depositsValue   = r ? parseFloat(r.deposits_value    ?? "0") : (pos.valueAtCreation ?? 0)
  const withdrawalsVal  = r ? parseFloat(r.withdrawals_value ?? "0") : 0
  const netInvested     = depositsValue - withdrawalsVal
  const pnlUsd          = r ? parseFloat(r.performance?.usd?.pnl ?? "0") : (valueUsd - netInvested)
  const pnlPct          = depositsValue > 0 ? (pnlUsd / depositsValue) * 100 : 0
  const aprUsd          = r ? parseFloat(r.performance?.usd?.pool_apr ?? r.performance?.hodl?.apr ?? "0") : 0
  const ilUsd           = r ? parseFloat(r.performance?.usd?.il  ?? "0") : 0

  const pnlVsHodl       = r ? parseFloat(r.performance?.hodl?.pnl ?? "0") : 0
  const aprVsHodl       = r ? parseFloat(r.performance?.hodl?.apr ?? "0") : 0

  const pnlToken0       = r ? parseFloat(r.performance?.token0?.pnl ?? "0") : 0
  const pnlToken1       = r ? parseFloat(r.performance?.token1?.pnl ?? "0") : 0

  const feesValue       = r ? parseFloat(r.fees_value ?? "0")  : (pos.collectedFeesUsd ?? 0)
  const ageDaysRaw      = r ? parseFloat(r.age        ?? "0")  : 0
  const feesAprCalc     = (r && feesValue > 0 && depositsValue > 0 && ageDaysRaw > 0)
    ? (feesValue / depositsValue) * (365 / ageDaysRaw) * 100 : 0
  const feesApr         = r ? (parseFloat(r.performance?.hodl?.fee_apr ?? "0") || feesAprCalc) : 0
  const uncollected0    = r ? parseFloat(r.uncollected_fees0 ?? "0") : 0
  const uncollected1    = r ? parseFloat(r.uncollected_fees1 ?? "0") : 0
  const collected0      = r ? parseFloat(r.collected_fees0   ?? "0") : 0
  const collected1      = r ? parseFloat(r.collected_fees1   ?? "0") : 0

  const ageDaysFloat    = ageDaysRaw
  const ageFromTs       = r ? null : (pos.createdAtTimestamp ? (Date.now() - pos.createdAtTimestamp) / 1000 : 0)
  const ageDays         = r ? Math.floor(ageDaysFloat) : Math.floor((ageFromTs ?? 0) / 86400)
  const ageHours        = r ? Math.floor((ageDaysFloat % 1) * 24) : Math.floor(((ageFromTs ?? 0) % 86400) / 3600)

  const amount0         = r ? parseFloat(r.current_amount0 ?? "0") : parseFloat(pos.amount0 ?? "0")
  const amount1         = r ? parseFloat(r.current_amount1 ?? "0") : parseFloat(pos.amount1 ?? "0")

  const currentPrice    = r ? parseFloat(r.pool_price  ?? "0") : (pos.currentPrice ?? 0)
  const priceLower      = r ? parseFloat(r.price_lower ?? "0") : (pos.priceLower ?? 0)
  const priceUpper      = r ? parseFloat(r.price_upper ?? "0") : (pos.priceUpper ?? 0)
  const entryPrice      = pos.priceAtCreation ?? currentPrice

  const span            = priceUpper - priceLower
  const barPct          = span > 0 ? Math.max(0, Math.min(100, (currentPrice - priceLower) / span * 100)) : 0

  const delta24hPnl     = 0
  const delta24hApr     = 0

  const totalDep1       = r ? parseFloat(r.total_deposits1  ?? "0") : 0
  const totalWit1       = r ? parseFloat(r.total_withdrawn1 ?? "0") : 0

  return {
    valueUsd, depositsValue, netInvested, withdrawalsVal,
    pnlUsd, pnlPct, aprUsd, ilUsd,
    pnlVsHodl, aprVsHodl, pnlToken0, pnlToken1,
    feesValue, feesApr, uncollected0, uncollected1, collected0, collected1,
    ageDays, ageHours,
    amount0, amount1,
    currentPrice, priceLower, priceUpper, entryPrice, barPct,
    delta24hPnl, delta24hApr,
    totalDep1, totalWit1,
  }
}
