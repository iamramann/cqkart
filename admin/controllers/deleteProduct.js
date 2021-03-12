const { productModel } = require("../../models/export");
module.exports = async function deleteProduct(filter) {
  return new Promise((resolve, reject) => {
    productModel.findByIdAndDelete(filter, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};
