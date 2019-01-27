import * as restify from 'restify'
import { CurrencyController } from './currency/Controller'
import { Container } from '../../../common/ioc/Container'
import { CryptoCurrencyTracker as Tracker } from '../../../domain/tracker/CryptoCurrencyTracker'
import { ExchangeRatesFactoryPlaceholder } from '../../../domain/tracker/process/ExchangeRates'
import { CryptoCurrencyTracker } from '../../../infrastructure/tracker/CryptoCurrencyTracker'

const server = restify.createServer({
  name: 'Crypto currency API',
  version: '1.0.0'
})

Container.instance().bindToFactory(Tracker, CryptoCurrencyTracker.createCsvReader)
Container.instance().bindToFactory(ExchangeRatesFactoryPlaceholder, CryptoCurrencyTracker.createFlatfileFetcher('./test.csv'))

server.get('/currency', CurrencyController.overview)
server.get('/currency/history', CurrencyController.overview)
server.get('/currency/analytics', CurrencyController.overview)

server.listen(8091, function () {
  console.log('%s listening at %s', server.name, server.url)
})

const shutdown = () => {
  server.close(function () {
    console.log('server shut down')
  })
}

process.on('SIGTERM', shutdown)

process.on('SIGINT', shutdown)

process.on('uncaughtException', function (err: Error) {
  console.error('error out of control', err)
  shutdown()
})

process.on('unhandledRejection', function (reason, p) {
  console.error('Unhandled Rejection at:', p, 'reason:', reason)
})
