const { productModel } = require("../../models/export");
module.exports = function getAllProducts(filter) {
  return new Promise((resolve, reject) => {
    productModel.find(filter, { __v: 0 }, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
};
