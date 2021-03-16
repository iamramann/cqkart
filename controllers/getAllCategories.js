const { productModel } = require("../models/export");
module.exports = function getAllCategories(req, res) {
  try {
    productModel.find({}, (err, products) => {
      if (err) {
        res.send(err).status(200);
      }
      res
        .send(Array.from(new Set(products.map((product) => product.category))))
        .status(200);
    });
  } catch (error) {
    res.send("something went wrong").status(500);
  }
};
