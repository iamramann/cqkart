const { userModel } = require("../../models/export");
module.exports = function getUserCartItems(filter) {
  return new Promise((resolve, reject) => {
    userModel
      .findOne(filter)
      .select({ cart: 1 })
      .exec((err, data) => {
        if (err) reject(err);
        else {
          // console.log(data);
          resolve(data);
        }
      });
  });
};
