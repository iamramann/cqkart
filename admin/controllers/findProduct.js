const { productModel } = require("../../models/export");
module.exports = async function findUser(filter) {
  return new Promise((resolve, reject) => {
    productModel.findOne(filter, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};
