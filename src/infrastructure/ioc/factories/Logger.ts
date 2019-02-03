import * as SyslogStream from 'bunyan-syslog'
import * as Logger from 'bunyan'

export function loggerFactory (): Logger {
  return Logger.createLogger({
    name: 'DummyLogger',
    streams: [
      {
        level: 'debug',
        type: 'raw',
        stream: SyslogStream.createBunyanStream({
          type: 'sys',
          facility: SyslogStream.local0,
          host: 'syslog',
          port: 514
        })
      },
      {
        level: 'debug',
        stream: process.stdout
      }
    ]
  })
}
