import * as restify from 'restify'

import { Container } from '../../../../common/ioc/Container'
import { CryptoCurrencyTracker } from '../../../../domain/tracker/CryptoCurrencyTracker'
import Logger = require('bunyan')

export class CurrencyController {
  public static overview (req: restify.Request, res: restify.Response, next: restify.Next) {
    const currencyStats = Container.instance().provide(CryptoCurrencyTracker) as CryptoCurrencyTracker
    currencyStats.getRates()
      .then((records) => {
        res.status(200)
        res.json(records.map(record => ({
          currency: record.observed.name,
          buy: {
            value: record.buy,
            currency: record.currency.name
          },
          sell: {
            value: record.sell,
            currency: record.currency.name
          },
          time: new Date(record.time).toUTCString()
        })))
        next()
      })
      .catch(err => {
        res.status(500)
        const logger = Container.instance().provide(Logger) as Logger
        logger.error('err', err)
        next(new Error('Unable to process your request'))
      })
  }
}
