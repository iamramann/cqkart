const { body, validationResult, check } = require("express-validator");
const findUser = require("../controllers/user/findUser");
const userValidationRules = () => {
  return [
    // validate email
    check("email")
      .notEmpty()
      .withMessage("Please provide an email address")
      .isEmail()
      .withMessage("Please enter a valid email address")
      .custom(async (email) => {
        try {
          let userFilter = { email: email };
          let user = await findUser(userFilter);
          if (user !== null) {
            throw new Error("Email already registered");
          }
        } catch (error) {
          throw error;
        }
      })
      .withMessage("Email already registered"),

    // validate name
    check("name")
      .notEmpty()
      .withMessage("Please provide a name")
      .isAlpha()
      .withMessage("Must be only alphabetical characters")
      .isLength({ min: 2 })
      .withMessage("Name must be atleast 3 characters long"),

    // validate passsword
    check("password")
      .notEmpty()
      .withMessage("Password cannot be empty")
      .isLength({ min: 5 })
      .withMessage("Password must be atleast 5 characters long"),

    // confirm password validation
    // check("cpassword")
    //   .custom((cpassword, password) => {
    //     console.log(cpassword, password);
    //     if (cpassword.localeCompare(password) === 1) {
    //       throw new Error("Password doesn't Match");
    //     }
    //   })
    //   .withMessage("Password doesn't Match"),

    // validate phone number
    check("phone")
      .notEmpty()
      .withMessage("Phone Number cannot be empty")
      .matches(/[6,7,8,9][0-9]{9,10}$/)
      .withMessage("Please enter a valid Phone Number")
      .isLength({ min: 10, max: 10 })
      .withMessage("Please enter a valid Mobile Number")
      .isNumeric()
      .withMessage("Phone Number cannot contain characters"),
  ];
};

// middleware
const validate = (req, res, next) => {
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
  // return res.status(422).json({
  //   errors: extractedErrors,
  // });
};

module.exports = {
  userValidationRules,
  validate,
};
