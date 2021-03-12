const { randomBytes } = require("crypto");
module.exports = function getRandomString(size) {
  return randomBytes(size).toString("hex");
};
