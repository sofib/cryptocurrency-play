import { ExchangeRates } from './process/ExchangeRates'
import { DataReceiver } from './process/DataReceiver'
import { MarketRecord } from './market/Record'

export class CryptoCurrencyTracker {
  private exchangeRates: ExchangeRates
  private dataReceiver: DataReceiver

  constructor (rate: ExchangeRates, dataReceiver: DataReceiver) {
    this.exchangeRates = rate
    this.dataReceiver = dataReceiver
  }

  public async getRates (): Promise<MarketRecord[]> {
    return this.exchangeRates.get()
  }
}
