import * as restify from 'restify'
import { CurrencyController } from './currency/Controller'

const server = restify.createServer({
  name: 'Crypto currency API',
  version: '1.0.0'
})

server.get('/currency', CurrencyController.overview)

server.listen(8090, function () {
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