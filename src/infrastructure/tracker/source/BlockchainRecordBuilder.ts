import { MarketRecordBuilder } from '../../../domain/tracker/MarketRecordBuilder'
import { BlockchainRecord } from './blockchain/BlockchainRecord'
import { MarketRecord } from '../../../domain/tracker/market/Record'

export class BlockchainRecordBuilder extends MarketRecordBuilder {
  public build (): MarketRecord {
    return new BlockchainRecord(this.buy, this.sell, this.currencyTarget)
  }
}
