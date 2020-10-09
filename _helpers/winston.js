/* eslint-disable max-len */
let appRoot = require("app-root-path");
let winston = require("winston");

// define the custom settings for each transport (file, console)
const TIME_ZONE =
  process.env.TIME_ZONE || Intl.DateTimeFormat().resolvedOptions().timeZone;

const timezoned = () => {
  return new Date().toLocaleString("en-US", {
    timeZone: TIME_ZONE,
  });
};

const commonFormatOptions = [winston.format.timestamp({ format: timezoned })];

const consoleLoggerFormat = winston.format.combine(
  ...commonFormatOptions,
  winston.format.colorize({}),
  winston.format.align(),
  winston.format.printf((info) => {
    const { timestamp, level, message } = info;
    // eslint-disable-next-line max-len
    const match = /(?<route>\w+ \/\w+.*) HTTP\/(1.1|2|2.2)"\s(?<statusCode>\d{3})/.exec(
      info.message
    );
    if (match) {
      const { route, statusCode } = match.groups;
      if (Number(statusCode) >= 400) {
        return `${timestamp} ${level} \u001b[31m${route} ${statusCode}\u001b[39m ${message}`;
      }
      return `${timestamp} ${level} \u001b[33m${route} ${statusCode}\u001b[39m ${message}`;
    }
    return `${timestamp} ${level} ${message}`;
  })
);

let options = {
  file: {
    level: "info",
    filename: `${appRoot}/logs/app.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  },
  console: {
    level: "debug",
    handleExceptions: true,
    json: false,
    colorize: true,
    format: consoleLoggerFormat,
  },
};

const transports = [new winston.transports.Console(options.console)];

if (process.env.NODE_ENV === "production") {
  transports.push(new winston.transports.File(options.file));
}

// instantiate a new Winston Logger with the settings defined above
let logger = new winston.createLogger({
  transports: transports,
  exitOnError: false, // do not exit on handled exceptions
});

logger.stream = {
  // eslint-disable-next-line no-unused-vars
  write(message, encoding) {
    logger.info(message);
  },
};

process.on("uncaughtException", (err) => {
  logger.error(err);
});

process.on("unhandledRejection", (err) => {
  logger.error(err);
});

module.exports = logger;
