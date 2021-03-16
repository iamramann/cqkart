const { productModel } = require("../../models/export");
module.exports = async function getAllProdcuts(filter) {
  return new Promise((resolve, reject) => {
    productModel.find(
      filter,
      { __v: 0 },
      { sort: { title: 1 } },
      (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      }
    );
  });
};
