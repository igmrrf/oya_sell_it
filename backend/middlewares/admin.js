const { response } = require("express");

module.exports = (req, res, next) => {
  if (!req.user.isAdmin)
    return response.status(403).send("Access Level not enough");
  next();
};
