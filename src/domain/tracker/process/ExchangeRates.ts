import { MarketRecord } from '../market/Record'

export interface ExchangeRates {
  get() : Promise<MarketRecord[]>
}