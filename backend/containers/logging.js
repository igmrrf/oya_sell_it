const { format, createLogger, transports } = require("winston");
const winston = require("winston");
require("express-async-errors");

const exitOnError = require("../middlewares/exitOnError");

const logger = createLogger({
  level: "info",
  format: format.json(),
  defaultMeta: { service: "user-service" },

  // // Handle exception from the createlog function
  // exceptionHandlers: [
  //   new winston.transports.File({ filename: "exceptions.log" }),
  // ],
  // // Handle Uncaught Rejections from createlog function
  // rejectionHandlers: [new transports.File({ filename: "rejections.log" })],

  transports: [
    new transports.File({ filename: "error.log", level: "error" }),
    new transports.File({ filename: "combined.log" }),
  ],
  exitOnError: exitOnError,
});

if (process.env.NODE_ENV !== "production") {
  logger.add(new transports.Console({ format: format.simple() }));
}

// or Handle exceptions by using exceptions.handle
logger.exceptions.handle(
  new transports.Console({
    level: "info",
    format: format.combine(format.colorize(), format.simple()),
  }),
  new transports.File({
    filename: "exceptions.log",
    level: "error",
    format: format.json(),
  })
);

// Handle Uncaught Rejections by using rejections.handle
logger.rejections.handle(
  new transports.Console({
    level: "info",
    format: format.combine(format.colorize(), format.simple()),
  }),
  new transports.File({
    filename: "uncaught.log",
    level: "error",
    format: format.json(),
  })
);
module.exports = logger;
