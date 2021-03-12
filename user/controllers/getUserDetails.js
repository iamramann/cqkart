const { userModel } = require("../../models/export");
module.exports = function getUserCartItems(filter) {
  return new Promise((resolve, reject) => {
    userModel.findOne(filter, { __v: 0 }).exec((err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
};
