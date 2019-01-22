import { MarketRecordBuilder as Builder } from '../../../domain/tracker/MarketRecordBuilder'
import { BlockchainRecordBuilder } from './BlockchainRecordBuilder'

export class MarketRecordBuilder {
  static fromSource (source: string): Builder {
    if (source === 'blockchain') {
      return new BlockchainRecordBuilder()
    }

    return null
  }
}
