import { MarketRecord } from '../../../../domain/tracker/market/Record'
import { BtcCurrency } from '../../../../domain/tracker/market/currency/Btc'
import { Currency } from '../../../../domain/tracker/market/currency/Currency'

const BLOKCHAIN_IDENTIFIER = 'blockchain'

export class BlockchainRecord extends MarketRecord {
  constructor (buy: number, sell: number, currency: Currency) {
    super(BlockchainRecord.identifier, buy, sell, new BtcCurrency(), currency)
  }

  public static get identifier () {
    return BLOKCHAIN_IDENTIFIER
  }
}
