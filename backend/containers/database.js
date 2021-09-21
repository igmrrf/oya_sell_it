const mongoose = require("mongoose");
const config = require("config");
const debug = require("debug")("app:database");

module.exports = async (logger) => {
  const connection = await mongoose
    .createConnection(config.get("db"), {
      serverSelectionTimeoutMS: 5000,
    })
    .asPromise();
  debug(connection);

  if (connection.readyState === 1)
    logger.info("Successful Connection to Database");
  else logger.error("Connection to database failed");
};
