import { Currency } from './Currency'

const USD_IDENTIFIER = 'USD'

export class UsdCurrency extends Currency {
  constructor() {
    super(UsdCurrency.identifier, '$', false)
  }

  public static get identifier(): string {
    return USD_IDENTIFIER
  }
}
