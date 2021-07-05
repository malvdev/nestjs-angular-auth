import * as winston from 'winston';

export const loggerConf = {
  format: winston.format.prettyPrint({
    colorize: true,
    depth: 2,
  }),
  transports: [
    new winston.transports.Console({
      consoleWarnLevels: ['info', 'warn', 'error'],
    }),
  ],
};
