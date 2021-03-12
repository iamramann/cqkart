const { productModel } = require("../models/export");
module.exports = {
  calculateDiscount: (price, rate) => {
    // console.log(rate);
    let amount = price - (price / 100) * rate.toFixed(2);
    // console.log(">>>  ~ file: helper.js ~ line 5 ~ amount", amount);
    return amount;
  },
  getAllCategories: async (cb) => {
    productModel.find({}, (err, products) => {
      if (err) {
        throw err;
      } else {
        cb(new Set(products.map((product) => product.category)));
      }
    });
  },

  calculteTotalAmount: (data) => {
    let total = 0;
    data.forEach((item, index) => {
      // console.log(item.price, item.discount);
      if (isNaN(Number(item.discount)) || item.discount === null) {
        total += item.price;
      } else {
        total += item.price - (item.price / 100) * item.discount;
      }
    });
    let totalAmount = total.toFixed(2);
    // console.log(">>>  ~ file: helper.js ~ line 30 ~ totalAmount", totalAmount);
    return totalAmount;
  },
};
