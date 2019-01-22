import { MarketRecord } from '../market/Record'

export interface Ticker {
  ticker (): Promise<MarketRecord[]>
}
