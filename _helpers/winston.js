const appRoot = require("app-root-path");
const winston = require("winston");

// -------Log Formatting----------- //

// Logging Timezone
const TIME_ZONE = process.env.TIME_ZONE||Intl.DateTimeFormat().resolvedOptions().timeZone;

const timezoned = () => {
  return new Date().toLocaleString("en-US", {
    timeZone: TIME_ZONE
  });
};

const commonFormatOptions = [
  winston.format.timestamp({format: timezoned}),
]

const consoleLoggerFormat = winston.format.combine(
  ...commonFormatOptions,
  winston.format.colorize({ all: true }),
  winston.format.align(),
  winston.format.printf(info => `${info.timestamp} ${info.level} ${info.message}`),
);

const fileLoggerFormat = winston.format.combine(
  ...commonFormatOptions,
  // winston.format.align(),
  winston.format.printf(info => JSON.stringify(info)),
);

// ----- LOG OPTIONS ----- //
const options = {
  file: {
    filename: `${appRoot}/logs/app.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
    format: fileLoggerFormat
  },
  console: {
    handleExceptions: true,
    json: true,
    colorize: true,
    format: consoleLoggerFormat
  },
};


// ----- Initialize the Logger ------ //
const transports= [
  new winston.transports.Console(options.console),
]

// Log to file only in development
if (process.env.NODE_ENV === "PRODUCTION") {
  transports.push((new winston.transports.File(options.file)))
}

const logger = winston.createLogger({
  transports: transports,
  exitOnError: false, // do not exit on handled exceptions
});


logger.stream = {
  // eslint-disable-next-line no-unused-vars
  write: function(message, encoding) {
    logger.info(message);
  },
};


logger.info(`Logging TimeZone is set to: ${TIME_ZONE}`)

module.exports = logger;