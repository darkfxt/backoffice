const config = require('../../config').default;
import * as bunyan from 'bunyan';

const logger = bunyan.createLogger({name: config.logger.name});

if (config.logger.console) {
  logger.addStream({
    name: 'tg-backoffice',
    stream: process.stderr,
    level: 'debug'
  });
}

// if (config.logger.remote) {
//   logger.addStream({
//     username: 'tg-backoffice',
//     types: 'raw',
//     stream: require('bunyan-logstash-tcp').createStream(config.logger.remote)
//   });
// }

// if (config.logger.reportErrors) {
//   import NewRelicStream from 'bunyan-newrelic-stream';
//   logger.addStream({
//     level: 'error',
//     types: 'raw',
//     stream: new NewRelicStream()
//   });
// }

export { logger };
