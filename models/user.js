// const { bold } = require("chalk");
const mongoose = require("mongoose");
const user_schema = new mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: Number, required: true },
  userId: { type: String, required: true },
  gender: { type: String },
  dob: { type: String },
  username: { type: String },
  cart: { type: Array, required: false },
  avatar: { type: String, default: "/uploads/user/default.png" },
  date: { type: Date, default: Date.now(), required: false },
  status: { type: String, default: "active" },
  address: { type: Array, require: false },
});
mongoose.model("User", user_schema);
module.exports = mongoose.model("User");
