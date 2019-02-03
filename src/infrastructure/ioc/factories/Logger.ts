import * as SyslogStream from 'bunyan-syslog'
import * as Logger from 'bunyan'

export function loggerFactory (): Logger {
  const stream = SyslogStream.createBunyanStream({
    type: 'sys',
    facility: SyslogStream.local0,
    host: 'syslog',
    port: 514
  })
  const logger = Logger.createLogger({
    name: 'PerfectOne',
    streams: [
      {
        level: 'debug',
        type: 'raw',
        stream
      },
      {
        level: 'debug',
        stream: process.stdout
      }
    ]
  })
  logger.warn('where am I going?')
  return logger
}
