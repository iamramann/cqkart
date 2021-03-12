const { productModel } = require("../../models/export");
module.exports = function modifyUser(filter, update) {
  return new Promise((resolve, reject) => {
    productModel.findByIdAndUpdate(filter, update, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};
