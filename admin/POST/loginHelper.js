const { USER_DNE, PASSWORD_INVALID, INTERNAL_ERROR } = require("../../message");
const check_password = require("../../controllers/check_password");
const findAdmin = require("../controllers/findAdmin");
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
        res.redirect("/dashboard/All");
      } else {
        res.status(401).render("adminx/login", {
          message: PASSWORD_INVALID,
        });
      }
    } else {
      res.status(404).render("adminx/login", {
        message: USER_DNE,
      });
    }
  } catch (error) {
    res.status(500).render("adminx/login", {
      message: INTERNAL_ERROR,
    });
  }
};
