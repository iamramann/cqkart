const { body, validationResult, check } = require("express-validator");
const { productModel } = require("../../models/export");
const productRules = () => {
  /*
  * validation cases
   // * title-must be greater then 3 characters x
   // * price-must be greater then zero,number x
   // * discount-must be greater then zero,number x
   // * quantity-must be greater then zero,number x
   // * check for valid mongo id
   */

  return [
    check("id").isMongoId().withMessage("Not a valid MongoId"),
    check("title")
      .isLength({ min: 5 })
      .withMessage("Product name must be of atleast 5 characters"),

    check("price").custom((price) => {
      // console.log(typeof price);
      price = Number(price); //! only for postman request
      if (price <= 0 || price === undefined || isNaN(price)) {
        throw new Error("Price must be greater then zero");
      }
      // else if (typeof price === "string" || price instanceof String) {
      //   throw new Error("Price must be an integer value");
      // }
      return true;
    }),

    // ! Fixme: when discount value is NA it recieved undefined becox we remove null keys from client side
    check("discount").custom((discount) => {
      discount = Number(discount); //! only for postman request
      // console.log(discount);
      if (discount === undefined) {
        // do nothing
      } else if (discount < 0 || discount > 100 || isNaN(discount)) {
        throw new Error("invalid discount rate");
      } // else if (typeof discount === "string" || discount instanceof String) {
      //   throw new Error("discount must be an integer value");
      // }

      return true;
    }),
    check("quantity").custom((quantity) => {
      quantity = Number(quantity); //! only for postman requests
      if (quantity < 0 || quantity === undefined || isNaN(quantity)) {
        throw new Error("Please enteter a valid quantity for product");
      } // else if (typeof quantity === "string" || quantity instanceof String) {
      //   throw new Error("quantity must be an integer value");
      // }
      return true;
    }),
  ];
};

// middleware
const productValidator = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors
    .array({ onlyFirstError: true })
    .map((err) => extractedErrors.push({ msg: err.msg }));

  req.validationError = extractedErrors;
  return next();
};

module.exports = {
  productRules,
  productValidator,
};
