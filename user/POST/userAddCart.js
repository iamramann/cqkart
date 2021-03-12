const { productModel, userModel } = require("../../models/export");
const findUser = require("../controllers/user/findUser");
const findProduct = require("../controllers/product/findProduct");
const decreaseProductQuantityFromStock = require("../controllers/product/decreaseProductQuantityFromStock");
const addProduct = require("../controllers/cart/addProduct");

module.exports = async function userAddCart(req, res) {
  const { username } = req.session;
  const { productId } = req.query;
  const userFilter = { email: username };
  const productFilter = { productId };
  let response;
  try {
    // check for product
    let product = await findProduct(productFilter);
    // if product is null
    if (product === null) {
      response = "invalid request";
    } else {
      // check for stock
      if (product.quantity <= 0) {
        response = "product quantity is 0";
      } else {
        let newProduct = getNewProduct(product);

        let user = await findUser(userFilter);
        let userCart = user.cart;
        if (userCart.length) {
          let result = userCart.find((prod) => prod.productId === productId);
          // means product is existed
          if (result) {
            //update product quantity here
            response = result;
            response = "product is existed";
            // todo: increment and decrement product quantity in cart logic here
          } else {
            // always add a new product

            let result = await addProduct(userFilter, newProduct);
            response = "product is not existed and added";
          }
          //
        } else {
          // always add a new product

          let result = await addProduct(userFilter, newProduct);
          response = "added to cart";
        }
        let result = await decreaseProductQuantityFromStock(product.id);
      }
    }
    // decrement product quantity by 1

    res.send(response);
  } catch (err) {
    // res.redirect("/user");
    response = "something went wrong";
    res.send(response);
  }
};

function getNewProduct(product) {
  let {
    title,
    image,
    productId,
    description,
    price,
    category,
    discount,
  } = product;

  return (newProduct = {
    title,
    image,
    productId,
    description,
    price,
    category,
    discount,
    quantity: 1,
  });
}
