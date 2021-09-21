const jwt = require("jsonwebtoken");
const config = require("config");

const auth = (req, res, next) => {
  const token = req.header("oya-token");
  if (!token) return res.status(401).send("Access Denied. No Token found");
  try {
    const decoded = jwt.verify(token, config.get("jwt"));
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(400).send("Invalid token");
  }
};
