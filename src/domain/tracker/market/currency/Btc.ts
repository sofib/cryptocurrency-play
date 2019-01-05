import { Currency } from './Currency'

const BTC_IDENTIFIER = 'Bitcoin'

export class BtcCurrency extends Currency {
  constructor () {
    super(BtcCurrency.identifier, 'BTC', true)
  }

  public static get identifier (): string {
    return BTC_IDENTIFIER
  }
}
