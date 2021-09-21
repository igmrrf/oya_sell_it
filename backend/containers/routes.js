const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const IndexRoute = require("../routes");
const AuthRoute = require("../routes/auth");
const FeedsRoute = require("../routes/feed");
const UsersRoute = require("../routes/user");
const error = require("../middlewares/error");

var whitelist = ["http://example1.com", "http://example2.com"];
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

module.exports = (app) => {
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use(helmet());
  app.use(cors(corsOptions));
  app.use(express.static("public"));
  app.use("/", IndexRoute);
  app.use("/auth", AuthRoute);
  app.use("/api/feeds", FeedsRoute);
  app.use("/api/users", UsersRoute);
  app.use(error);
};
