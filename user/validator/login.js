const { body, validationResult, check } = require("express-validator");
const findUser = require("../controllers/user/findUser");
const userValidationRules = () => {
  return [
    // validate email
    check("username")
      .notEmpty()
      .withMessage("Please provide an email address")
      .isEmail()
      .withMessage("Please enter a valid email address")
      .custom(async (username) => {
        try {
          let userFilter = { email: username };
          let user = await findUser(userFilter);
          if (user === null) {
            throw new Error("user not exist");
          }
        } catch (error) {
          throw error;
        }
      })
      .withMessage("user not exist"),
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
