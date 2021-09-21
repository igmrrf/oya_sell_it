module.exports = (err, req, res, next, logger) => {
  logger.error(err.message, err);
  res.status(500).send("Something went Wrong");
  next(err);
};
