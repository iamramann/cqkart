const { productModel, userModel } = require("../../models/export");
const findUser = require("../controllers/user/findUser");
const findProduct = require("../controllers/product/findProduct");
const decreaseProductQuantityFromStock = require("../controllers/product/decreaseProductQuantityFromStock");
const addProduct = require("../controllers/cart/addProduct");
const updateCartItemQuantity = require("../controllers/updateCartItemQuantity");
const removeItemCart = require("../GET/removeItemCart");
const removeProduct = require("../controllers/cart/removeProduct");
module.exports = async function userAddCart(req, res) {
  const { username } = req.session;
  let { productId, flag } = req.query;
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

            /*
             * if product is already there and flag is 0 then set flag to 1 to indicate that it is already in the cart
             */

            // flag = "1";
            let oldQty = result.quantity;
            flag = flag === "0" || flag === "1" ? "1" : "-1";

            if (flag === "1") {
              // means increment the product qty
              let xx = await updateCartItemQuantity(productId, flag);
              response = "product qty is incremented";
            }

            if (flag === "-1" && oldQty === 1) {
              // remove product completely
              let prodx = await removeProduct(userFilter, productId);
              response = "product is completely removed";
            }

            if (flag === "-1" && oldQty > 1) {
              // modify product qty
              let xx = await updateCartItemQuantity(productId, flag);
              response = "qty is decresed";
            }

            // // todo: increment and decrement product quantity in cart logic here
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
    console.log(err);
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
