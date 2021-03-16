const getUserDetails = require("../controllers/getUserDetails");
const { STRIPE_PUBLIC_KEY } = require("../../config/keys");
module.exports = async function getUserCart(req, res) {
  try {
    let user = await getUserDetails({ _id: req.session.MongoId });
    res.render("users/cart", {
      cartItems: user.cart,
      display: true,
      user: user,
      stripePublicKey: STRIPE_PUBLIC_KEY,
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
