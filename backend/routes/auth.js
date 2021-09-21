const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const debug = require("debug")("app:route:auth");
const { User, validate } = require("../models/User");

router.post("/", async (req, res) => {
  const { email, password } = req.body;
  d;

  const error = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = User.find({ email: email });
  if (!user) return res.status(400).send("Invalid email or Password");

  const validPassword = bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or Password");

  const token = user.generateAuthToken();
  res.status(200).header("oya-token", token).send(token);
});

module.exports = router;
