const { userModel } = require("../../models/export");
module.exports = async function findUserProfile(filter) {
  return new Promise((resolve, reject) => {
    userModel.findOne(filter, { __v: 0 }, (err, user) => {
      if (err) {
        reject(err);
      } else {
        resolve(user);
      }
    });
  });
};
