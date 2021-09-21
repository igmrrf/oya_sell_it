const config = require("config");
const debug = require("debug")("app:config");
const morgan = require("morgan");

module.exports = (app) => {
  console.log("help");
  if (!config.get("port")) throw new Error("Fatal Error: PORT NOT DEFINED");
  debug("Application Name: ", config.get("name"));

  if (app.get("env") === "development") {
    app.use(morgan("tiny"));
    debug("Morgan Enabled");
  }
};
