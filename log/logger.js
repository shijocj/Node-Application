const { createLogger, transports, format, addColors } = require('winston');

const appConfig = require('../config/config');

addColors({
    info: 'bold blue', 
    warn: 'italic yellow',
    error: 'bold red',
    debug: 'green',
});
  
const logger = createLogger({
    level: appConfig.logLevel, 
    format: format.combine(
        format.timestamp({ format: appConfig.logTimeFormat }),
        format.printf(info => `${info.timestamp} - [${info.level.padEnd(5)}] - ${info.message}`),
        //format.colorize({ all: true }),
        format.errors({stack:true})
  ),
  transports: [
    new transports.File({
      filename: './logs/all-logs.log',
      json: false,
      maxsize: 5242880,
      maxFiles: 5,
      level:'info'
    }),
      new transports.Console({ level: 'debug' }),
      new transports.Http({
        level: 'warn'
        //format: format.json()
      }),
    ],
    exceptionHandlers: [
        new transports.File({ filename: './logs/exceptions.log' })
      ]
});

module.exports = logger;

/*
const { timestamp, combine, printf, errors } = format;

function buildDevLogger() {
  const logFormat = printf(({ level, message, timestamp, stack }) => {
    return `${timestamp} ${level}: ${stack || message}`;
  });

  return createLogger({
    format: combine(
      format.colorize(),
      timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      errors({ stack: true }),
      logFormat
    ),
    transports: [new transports.Console()],
  });
}


function buildProdLogger() {
  return createLogger({
    format: combine(timestamp(), errors({ stack: true }), json()),
    defaultMeta: { service: 'user-service' },
    transports: [new transports.Console()],
  });
}

let logger = null;
if (process.env.NODE_ENV === 'development') {
  logger = buildDevLogger();
} else {
  logger = buildProdLogger();
}

module.exports = logger;





*/