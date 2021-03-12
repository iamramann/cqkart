const bcrypt = require("bcrypt");
//if both password matched then return true otherwise false
async function check_password(client_password, hashPassword) {
  var is_valid = await bcrypt.compare(client_password, hashPassword);
  return is_valid;
}
module.exports = check_password;
