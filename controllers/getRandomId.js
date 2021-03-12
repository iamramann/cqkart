const cryptoRandomString = require("crypto-random-string");
module.exports = function getProductId(req, res) {
  const randomId = cryptoRandomString({ length: 12, type: "alphanumeric" });
  res.send(randomId).status(200);
};
