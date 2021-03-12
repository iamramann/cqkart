const getUserDetails = require("../controllers/getUserDetails");
module.exports = async function getUserCart(req, res) {
  try {
    let user = await userCartHandler({ _id: req.session.MongoId });
    res.render("users/cart", {
      cartItems: user.cart,
      display: true,
      user: user,
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
