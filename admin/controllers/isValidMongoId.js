/*
 * validator used to check if the monoId provided by the client side is a valid mongoId or not
 * if(valid) - returns true
 * else - returns false
 */
const mongoose = require("mongoose");
module.exports = function isValidMongoId(id) {
  return mongoose.Types.ObjectId.isValid(id);
};
