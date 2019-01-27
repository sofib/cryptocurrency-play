import { MarketRecord } from '../market/Record'

export interface ExchangeRates {
  get (): Promise<MarketRecord[]>
}

export interface ExchangeRatesFactory {
  (): ExchangeRates
}

// TS has issue using interface types as a value
// using this for the time being, in absence of better approach
export abstract class ExchangeRatesFactoryPlaceholder {}
