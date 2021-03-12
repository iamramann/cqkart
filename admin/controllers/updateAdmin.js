const e = require("express");
const { adminModel } = require("../../models/export");
module.exports = function updateAdmin(filter, update) {
  return new Promise((resolve, reject) => {
    adminModel.findByIdAndUpdate(filter, update, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};
