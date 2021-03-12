const mongoose = require("mongoose");
const admin_schema = new mongoose.Schema({
  email: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  mobile: { type: String, required: true },
  name: { type: String, required: true },
  designation: { type: String },
  dob: { type: String },
  cqkartid: { type: String },
  avatar: { type: String },
});

mongoose.model("Admin", admin_schema);
module.exports = mongoose.model("Admin");
