const bcrypt = require("bcrypt");
const saltRounds = 8;
async function hashPassword(myPlaintextPassword, cb) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(myPlaintextPassword, saltRounds, function (err, hash) {
      if (err) {
        reject("Internal server error");
      } else {
        resolve(hash);
      }
    });
  });
}
module.exports = hashPassword;
