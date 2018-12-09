import { MarketRecord } from '../../market/Record'
import { BtcCurrency } from '../../market/currency/Btc'
import { Currency } from '../../market/currency/Currency'

const BLOKCHAIN_IDENTIFIER = 'blockchain'

export class BlockchainRecord extends MarketRecord {
  constructor(buy: number, sell: number, currency: Currency) {
    super(BlockchainRecord.identifier, buy, sell, new BtcCurrency(), currency)
  }

  public static get identifier() {
    return BLOKCHAIN_IDENTIFIER
  }
}
