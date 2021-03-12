const { userModel } = require("../../models/export");
module.exports = function modifyUser(filter, update) {
  return new Promise((resolve, reject) => {
    userModel.findByIdAndUpdate(filter, update, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};
