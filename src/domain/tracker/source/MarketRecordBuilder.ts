import { Currency } from '../market/currency/Currency'
import { EurCurrency } from '../market/currency/Eur'
import { UsdCurrency } from '../market/currency/Usd'
import { CurrencyFactory } from '../market/CurrencyFactory'
import { MarketRecord } from '../market/Record'
import { BlockchainRecord } from './blockchain/BlockchainRecord'

export class MarketRecordBuilder {
  private currencyObserved: Currency
  private currencyTarget: Currency
  private buy: number
  private sell: number
  private source: string
  private time: number

  private currencyFactory: CurrencyFactory = new CurrencyFactory()
  
  public setSource(source: string): MarketRecordBuilder {
    this.source = source
    return this
  }

  public get currency(): CurrencyFactory {
    return this.currencyFactory
  }

  public setCurrencyObserved(currency: Currency): MarketRecordBuilder {
    this.currencyObserved = currency
    return this
  }

  public setCurrencyTarget(currency: Currency): MarketRecordBuilder {
    this.currencyTarget = currency
    return this
  }

  public setBuy(buy: number): MarketRecordBuilder {
    this.buy = buy
    return this
  }

  public setSell(sell: number): MarketRecordBuilder {
    this.sell = sell
    return this
  }

  public setTime(time: number): MarketRecordBuilder {
    this.time = time
    return this
  }

  public build(): MarketRecord {
    if (this.source === BlockchainRecord.identifier) {
      return new BlockchainRecord(this.buy, this.sell, this.currencyTarget)
    }

    return null
  }
}
