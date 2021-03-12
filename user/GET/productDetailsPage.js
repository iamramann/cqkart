/*
 * whenver a user clicks to view description button this function handle the request and rendered the page and displays the requested product alongside similar product
 * @param {req} contains a query object.
 * @param {req.query} contains {category:some_value, id:some_value} properties
 * @param {query} holds the mongo query
 * @param {display} toggles whehter to show login and signup links on the sidebar
 * @param {products} holds the result of mognoQuery.exec() i.e all products of specified @param {category}
 * @param {requestedProduct} stores the product returned by Array.filter()
 *
 */
const { productModel, userModel } = require("../../models/export");
const { INTERNAL_ERROR } = require("../../message");
module.exports = async function viewProductDetails(req, res) {
  const { category, id } = req.query;
  const { username, isUserLoggedIn } = req.session;
  const query = productModel.find({ category: category }, { _id: 0, __v: 0 });
  const userQuery = userModel.findOne({ email: username });
  let display = false;

  try {
    const products = await query.exec();
    let requestedProduct = products.find((product) => {
      return product.productId === id;
    });
    if (isUserLoggedIn) {
      const user = await userQuery.exec();
      res.render("users/home", {
        details: requestedProduct,
        simlarProducts: products,
        display: !display,
        message: null,
        user: user,
      });
    } else {
      res.render("users/home", {
        details: requestedProduct,
        display: display,
        simlarProducts: products,
        message: null,
      });
    }
  } catch (err) {
    res.render("users/home", {
      details: null,
      display: null,
      simlarProducts: null,
      message: INTERNAL_ERROR,
    });
  }
};
