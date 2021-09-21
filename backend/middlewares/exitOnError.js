module.exports = function (err) {
  return err.code !== "INTENTIONAL";
};
