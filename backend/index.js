require("dotenv").config();
const express = require("express");
const app = express();

const logger = require("./containers/logging");
require("./containers/config")(app);
require("./containers/database")(logger);

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => logger.info(`Running on port ${PORT}`));

module.exports = server;
