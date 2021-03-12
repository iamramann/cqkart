const { body, validationResult, check } = require("express-validator");
const findUser = require("../dump/controllers/findUser");
const loginRules = () => {
  return [
    // validate email
    check("username")
      .notEmpty()
      .withMessage("Please provide an username")
      .custom(async (username) => {
        try {
          let filter = { email: username };
          let user = await findUser(filter);
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
const loginValidator = (req, res, next) => {
  const errors = validationResult(req);
  // console.log(errors);
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
  loginRules,
  loginValidator,
};
