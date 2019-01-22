import { Currency } from './market/currency/Currency'
import { CurrencyFactory } from './market/CurrencyFactory'
import { MarketRecord } from './market/Record'

export abstract class MarketRecordBuilder {
  get currencyObserved (): Currency {
    return this._currencyObserved
  }

  get currencyTarget (): Currency {
    return this._currencyTarget
  }

  get buy (): number {
    return this._buy
  }

  get sell (): number {
    return this._sell
  }

  get source (): string {
    return this._source
  }

  get time (): number {
    return this._time
  }

  get currencyFactory (): CurrencyFactory {
    return this._currencyFactory
  }
  private _currencyObserved: Currency
  private _currencyTarget: Currency
  private _buy: number
  private _sell: number
  private _source: string
  private _time: number

  private _currencyFactory: CurrencyFactory = new CurrencyFactory()

  public setSource (source: string): MarketRecordBuilder {
    this._source = source
    return this
  }

  public get currency (): CurrencyFactory {
    return this._currencyFactory
  }

  public setCurrencyObserved (currency: Currency): MarketRecordBuilder {
    this._currencyObserved = currency
    return this
  }

  public setCurrencyTarget (currency: Currency): MarketRecordBuilder {
    this._currencyTarget = currency
    return this
  }

  public setBuy (buy: number): MarketRecordBuilder {
    this._buy = buy
    return this
  }

  public setSell (sell: number): MarketRecordBuilder {
    this._sell = sell
    return this
  }

  public setTime (time: number): MarketRecordBuilder {
    this._time = time
    return this
  }

  public abstract build (): MarketRecord
}
