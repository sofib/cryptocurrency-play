import { Currency } from './Currency'

const EUR_IDENTIFIER = 'Euro'

export class EurCurrency extends Currency {
  constructor() {
    super(EurCurrency.identifier, '€', false)
  }

  public static get identifier(): string {
    return EUR_IDENTIFIER
  }
}
