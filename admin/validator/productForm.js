const { check } = require("express-validator");
// const upload = require("../../mulx");
// const uploader = upload.single("fileUpload");

const validationRules = () => {
  // uploader(req, res, (err) => {
  return [
    check("title")
      .isLength({ min: 5 })
      .withMessage("Product name must be 5 character long"),

    // validate price
    check("price")
      .custom((value) => {
        console.log(typeof value);
        return isNaN(Number(value)) ? false : true;
      })
      .withMessage("Please enter a valid price"),

    // validate discount
    check("discount")
      .custom((value) => {
        value = value instanceof String ? value.toUpperCase() : value;
        if (value === "NA") {
          return true;
        } else {
          if (
            typeof value === "string" ||
            value instanceof String ||
            value < 0 ||
            value > 100
          ) {
            return false;
          }
        }

        return true;
      })
      .withMessage("Please enter a valid discount rate"),

    // validate quantity
    check("quantity")
      .custom((value, { req }) => {
        if (
          typeof value === "string" ||
          value instanceof String ||
          value <= 0
        ) {
          return false;
        }

        return true;
      })
      .withMessage("Please enter a valid quantity"),

    // validate description
    check("description")
      .isLength({ min: 0, max: 400 })
      .withMessage("Description cannot be more then 400 characters"),

    // todo: image validaton later
  ];
  // });
};

module.exports = {
  validationRules,
};
//  // _id: 6043355ed6b36d042c0277e1,
//  // title: min length 5 characters,
//  // price: cannot be zero or negative, not a string,
//  //  discount: not a string , not > 100 or less then 0,
//  //  quantity: non negative , not a string,
//  // description: not more then 400 characters
//  todo: category: validate category from available categories,
//  todo: productId: 'mc5l0kmNtE8K', later
//  todo: image: 'https://res.cloudinary.com/oncloud9/image/upload/v1615017308/products/sswl6whukikujm3r6bve.jpg', later
