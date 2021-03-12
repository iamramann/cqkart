// hnadle request when user clicks on dropdown to get specified category of product
const { productModel, userModel } = require("../../models/export");
const { INTERNAL_ERROR } = require("../../message");
module.exports = async function productList(req, res) {
  const defaultCategory = "all products";
  let { category } = req.params;
  let { username } = req.session;
  let queryParam = {};
  category === defaultCategory
    ? (queryParam = {})
    : (queryParam = { category: category });
  let query = productModel.find(queryParam);
  let userQuery = userModel.findOne({ email: username });
  // let set = new Set();
  // set.add();
  try {
    let data = await query.exec();
    let user = await userQuery.exec();

    if (req.session.isUserLoggedIn) {
      res.render("index", {
        products: data,
        display: true,
        message: null,
        user: user,
      });
    } else {
      res.render("index", {
        products: data,
        user: null,
        display: false,
        message: null,
      });
    }
  } catch (err) {
    res.render("index", {
      products: data,
      display: false,
      message: INTERNAL_ERROR,
    });
  }
};
