const { productModel, userModel } = require("../../models/export");
module.exports = async function user_home(req, res) {
  const { isUserLoggedIn, username } = req.session;
  let productQuery = productModel.find({});
  let userQuery = userModel.findOne({ email: username });
  try {
    let products = await productQuery.exec();
    let user = await userQuery.exec();
    if (isUserLoggedIn) {
      res.render("index", {
        products: products,
        user: user,
        display: true,
        message: null,
      });
    } else {
      res.redirect("/user");
    }
  } catch (err) {
    res.sendStatus(500);
  }
};
