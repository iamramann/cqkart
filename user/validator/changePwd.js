const { body, validationResult, check } = require("express-validator");
const findUser = require("../controllers/user/findUser");
const check_password = require("../../controllers/check_password");
const userValidationRules = () => {
  return [
    // validate old password
    check("oldPassword")
      .custom(async (value, { req }) => {
        let user = await findUser({ email: req.session.username });
        console.log(value);
        if (user) {
          let dbPass = user.password;
          let isMatched = await check_password(value, dbPass);
          console.log(
            ">>>  ~ file: changePwd.js ~ line 14 ~ .custom ~ isMatched",
            isMatched
          );
          if (!isMatched) {
            throw new Error("old Password is incorrect");
          }

          return true;
        }
      })
      .withMessage("old Password is incorrect"),

    // validate new password
    check("newPassword")
      .isLength({ min: 5 })
      .withMessage("Password must be 5 characters long"),

    // validate old password
    check("confirmPassword").custom((value, { req }) => {
      if (value !== req.body.newPassword) {
        throw new Error("Password confirmation does not match password");
      }
      return true;
    }),
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
};

module.exports = {
  userValidationRules,
  validate,
};
