const cryptoRandomString = require("crypto-random-string");
module.exports = function getProductId(req, res) {
  const productId = cryptoRandomString({ length: 12, type: "alphanumeric" });
  res.send(productId).status(200);
};
