const { userModel } = require("../../models/export");
module.exports = async function getAllUsers(filter) {
  return new Promise((resolve, reject) => {
    userModel.find(filter, { __v: 0 }, (err, user) => {
      if (err) {
        reject(err);
      } else {
        resolve(user);
      }
    });
  });
};
