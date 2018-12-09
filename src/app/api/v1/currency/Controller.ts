import * as restify from 'restify'

import {
  CryptoCurrencyTracker,
  CryptoCurrencyTrackerSource,
  CryptoCurrencyTrackerSourceFileConfig
} from '../../../../domain/tracker/CryptoCurrencyTracker'

export class CurrencyController {
  public static overview (req: restify.Request, res: restify.Response, next: restify.Next) {
    const config: CryptoCurrencyTrackerSourceFileConfig = {
      source: CryptoCurrencyTrackerSource.Flatfile,
      sourceFilename: './test.csv',
      dataReceiver: CryptoCurrencyTracker.createCsvFileReceiver('./test.csv'),
    }

    const currencyStats = CryptoCurrencyTracker.create(config)
    currencyStats.getRates()
      .then((records) => {
        res.status(200)
        res.json(records)
        // res.send()
        next()
      })
      .catch(err => {
        res.status(500)
        // res.send()
        console.error(err)
        next()
      })
  }
}