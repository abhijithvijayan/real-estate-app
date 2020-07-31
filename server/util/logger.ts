import {createLogger, format, transports, Logger} from 'winston';

import env from '../env';

const logLevel = (): string => {
  if (env.isProd) {
    return 'info';
  }

  return 'debug';
};

const logger: Logger = createLogger({
  format: format.combine(
    // Use these two instead for JSON format
    // format.timestamp(),
    // format.json()
    format.timestamp({format: 'DD-MM-YYYY HH:mm:ss.SSS'}),
    format.printf((info) => {
      return `[${info.timestamp}] [${info.level.toUpperCase()}] ${
        info.message
      }`;
    })
  ),
  transports: [new transports.Console({level: logLevel()})],
});

export default logger;
