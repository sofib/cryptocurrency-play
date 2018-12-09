import { MarketRecord } from '../market/Record'

export interface DataReceiver {
  exec (records: MarketRecord[]): void
}
