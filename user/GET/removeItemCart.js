const findUser = require("../controllers/user/findUser");
const removeProduct = require("../controllers/cart/removeProduct");
module.exports = async function removeItemCart(req, res) {
  const { username } = req.session;
  const { productId } = req.query;
  const userFilter = { email: username };
  let response, status;
  try {
    let user = await findUser(userFilter);
    let { cart } = user;
    //The filter() method creates a new array with all elements that pass the test implemented by the provided function
    response = cart.filter((item) => item.productId === productId);
    if (response.length) {
      // remove only if it is present in the cart
      let result = await removeProduct(userFilter, productId);
      response = "product is removed from the cart";
      status = 200;
    } else {
      // means product is not present in the cart
      response = "Bad Request";
      status = 400;
    }
    res.send(response).status(status);
  } catch (error) {
    response = "something went wrong";
    status = 500;
    res.send(response).status(status);
  }
};
