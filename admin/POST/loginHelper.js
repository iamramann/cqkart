const check_password = require("../../controllers/check_password");
const findAdmin = require("../controllers/findAdmin");
// const jwt = require("jsonwebtoken");
const { USER_DNE, PASSWORD_INVALID, INTERNAL_ERROR } = require("../../message");
// const { JWT_SECRET } = require("../../config/keys");
module.exports = async function handleLogin(req, res) {
  const { username, password } = req.body;
  const isLoggedIn = true;
  const filter = { username: username };
  try {
    let response = await findAdmin(filter);
    if (response) {
      let isPasswordValid = await check_password(password, response.password);
      if (isPasswordValid) {
        Object.assign(req.session, { isLoggedIn, username, password });
        res.redirect("/dashboard");
      } else {
        res.status(401).render("adminx/login", {
          username,
          message: PASSWORD_INVALID,
          warningText: "PASS_INVALID",
        });
      }
    } else {
      res.status(404).render("adminx/login", {
        username,
        message: USER_DNE,
        warningText: "USER_DNE",
      });
    }
  } catch (error) {
    res.status(500).render("adminx/login", {
      username,
      message: INTERNAL_ERROR,
      warningText: "INTERNAL_ERROR",
    });
  }
};
