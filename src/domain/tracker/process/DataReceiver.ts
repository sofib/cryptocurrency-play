import { MarketRecord } from '../market/Record'

export interface DataReceiver {
  exec (records: MarketRecord[]): void
}

export interface DataReceiverFactory {
  (): DataReceiver
}

export abstract class DataReceiverFactoryPlaceholder {}
