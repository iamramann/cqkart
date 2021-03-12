const { productModel } = require("../../models/export");
module.exports = function listNewProduct(data) {
  return new Promise((resolve, reject) => {
    productModel.create(data, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};
