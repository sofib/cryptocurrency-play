import { Currency } from './currency/Currency'
import { EurCurrency } from './currency/Eur'
import { BtcCurrency } from './currency/Btc'
import { UsdCurrency } from './currency/Usd'

export class CurrencyFactory {
  public fromString (currencyName: string): Currency {
    let currency = null

    if (currencyName === EurCurrency.identifier) {
      currency = new EurCurrency()
    }

    if (currencyName === BtcCurrency.identifier) {
      currency = new BtcCurrency()
    }

    if (currencyName === UsdCurrency.identifier) {
      currency = new UsdCurrency()
    }

    return currency
  }
}
