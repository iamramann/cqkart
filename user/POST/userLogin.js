const chalk = require("chalk");
const { USER_DNE, PASSWORD_INVALID, INTERNAL_ERROR } = require("../../message");
const check_password = require("../../controllers/check_password");
const findUser = require("../controllers/user/findUser");
const getAllProducts = require("../controllers/product/getAllProducts");
module.exports = async function userLogin(req, res) {
  let user, products, display, message;
  const { username: email, password: client_password } = req.body;
  let userFilter = { email: email };
  try {
    //get user details from the database
    user = await findUser(userFilter);
    products = await getAllProducts();
    if (user && user.status === "active") {
      //check for username if user with given username exists only then check for password
      const db_password = user.password;
      if (await check_password(client_password, db_password)) {
        // todo : here session variable is set as username but it is email so change it later
        req.session.isUserLoggedIn = true;
        req.session.username = email;
        req.session.MongoId = user.id;
        req.session.password = client_password;
        console.log(chalk.hex("#FF8C00")(">>> Session created"));
        res.redirect("/user/BuySection");
        return;
      } else {
        message = PASSWORD_INVALID;
        user = null;
        display = false;
      }
    } else {
      message = USER_DNE;
      user = null;
      display = false;
    }
    res.render("index", {
      products,
      display,
      user,
      message,
    });
  } catch (err) {
    res.render("index", {
      products: products,
      display: false,
      user: null,
      message: INTERNAL_ERROR,
    });
  }
};
