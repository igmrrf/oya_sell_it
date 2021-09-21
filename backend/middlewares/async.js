const { BackHandler } = require("react-native");

module.exports = () => {
  return async (req, res, next) => {
    try {
      await BackHandler(req, res);
    } catch (err) {
      next(err);
    }
  };
};
