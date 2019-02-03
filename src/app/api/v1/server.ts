import * as restify from 'restify'
import { CurrencyController } from './currency/Controller'
import { Container } from '../../../common/ioc/Container'
import { CryptoCurrencyTracker as Tracker } from '../../../domain/tracker/CryptoCurrencyTracker'
import { CryptoCurrencyTracker } from '../../../infrastructure/tracker/CryptoCurrencyTracker'
import * as bunyan from 'bunyan'
import { loggerFactory } from '../../../infrastructure/ioc/factories/Logger'

const server = restify.createServer({
  name: 'Crypto currency API',
  version: '1.0.0'
})

Container.instance().bindToFactory(Tracker, CryptoCurrencyTracker.createCsvReader('./test.csv'))
Container.instance().bindToFactory(bunyan, loggerFactory)

server.get('/currency', CurrencyController.overview)
server.get('/currency/history', CurrencyController.overview)
server.get('/currency/analytics', CurrencyController.overview)

const logger = Container.instance().provide(bunyan) as bunyan

server.listen(process.env.EXPOSED_PORT, function () {
  logger.info(`${server.name} listening at ${server.url}`)
})

const shutdown = () => {
  server.close(function () {
    logger.info('server shut down')
  })
}

process.on('SIGTERM', shutdown)

process.on('SIGINT', shutdown)

process.on('uncaughtException', function (err: Error) {
  logger.error(err, 'error out of control')
  shutdown()
})

process.on('unhandledRejection', function (reason, p) {
  logger.error({ rejectionAt: p, reason }, 'Unhandled rejection')
})
