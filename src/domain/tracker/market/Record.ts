import { Currency } from './currency/Currency'

export abstract class MarketRecord {
  private _currencyObserved: Currency
  private _currencyTarget: Currency
  private _buy: number
  private _sell: number
  private _source: string
  private _time: number

  constructor (source: string, buy: number, sell: number, currencyObserved: Currency, currencyTarget: Currency, time: number = new Date().getTime()) {
    this._currencyObserved = currencyObserved
    this._currencyTarget = currencyTarget
    this._buy = buy
    this._sell = sell
    this._source = source
    this._time = time
  }

  public get observed (): Currency {
    return this._currencyObserved
  }

  public get currency (): Currency {
    return this._currencyTarget
  }

  public get buy (): number {
    return this._buy
  }

  public get sell (): number {
    return this._sell
  }

  public get source (): string {
    return this._source
  }

  public get time (): number {
    return this._time
  }
}
