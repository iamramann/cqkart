const { adminModel } = require("../../models/export");
module.exports = async function findAdmin(filter) {
  return new Promise((resolve, reject) => {
    adminModel.findOne(filter, { __v: 0 }, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};
