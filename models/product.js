const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  productId: {
    type: String,
    trim: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    trim: true,
  },
  quantity: {
    type: Number,
  },
  discount: {
    type: Number,
  },
});
mongoose.model("Productx", schema);
module.exports = mongoose.model("Productx");
