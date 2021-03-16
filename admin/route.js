const express = require("express");
const router = express.Router();
module.exports = router;
const { productRules, productValidator } = require("./validator/product");

// VIEWS HANDLERS
const viewDashboardPage = require("./GET/viewDashboardPage"),
  viewLoginPage = require("./GET/viewLoginPage"),
  viewProfilePage = require("./GET/viewProfilePage"),
  viewForgetPage = require("./GET/viewForgetPage");

// ACTIONS
const ActionLogout = require("./GET/ActionLogout");

// GET HANDLERS
const getProductHelper = require("./GET/getProductHelper"),
  getAdminHelper = require("./GET/getAdminHelper"),
  getUserHelper = require("./GET/getUserHelper");

// POST HANDLERS
const newProductHelper = require("./POST/newProductHelper"),
  loginHelper = require("./POST/loginHelper"),
  handleSignup = require("./POST/handleSignup"),
  forgetPwdHelper = require("./POST/forgetPwdHelper");

// DELETE HANDLERS
const deleteProductHelper = require("./DELETE/deleteProductHelper"),
  deleteUserHelper = require("./DELETE/deleteUserHelper");

// UPDATE HANDLERS
const modifyUserHelper = require("./PATCH/modifyUserHelper"),
  updateAdminHelper = require("./PATCH/updateAdminHelper"),
  updateProductHelper = require("./PATCH/updateProductHelper");

// MIDDLEWARES
const authenticate = require("./middleware/authenticate");

//? VIEWS
router
  .get(
    "/admin",
    (req, res, next) => {
      req.session.isLoggedIn ? res.redirect("/dashboard") : next();
    },
    viewLoginPage
  )
  .get("/dashboard", authenticate, viewDashboardPage)
  .get("/profile", authenticate, viewProfilePage)
  .get("/logout", ActionLogout)
  .get("/forget", viewForgetPage);

//? GET REQUESTS
router
  .get("/getAdminDetails/:id", getAdminHelper)
  .get("/getUserDetails/:id", getUserHelper)
  .get("/getProductDetails/:id", getProductHelper);

//? UPDATE REQUESTS
router
  .patch("/modifyUser/:id", modifyUserHelper)
  .patch(
    "/updateProductDetails/:id",
    productRules(),
    productValidator,
    updateProductHelper
  )
  // todo: validate admin input
  .patch("/updateAdmin/:id", updateAdminHelper);

//? DELETE REQUESTS
router
  .delete("/deleteProduct/:id", deleteProductHelper)

  .delete("/deleteUser/:id", deleteUserHelper);

//? POST REQUESTS
router.post("/admin", loginHelper);
router.post("/signup", handleSignup);
router.post("/forget", forgetPwdHelper);
// todo: validate new product details
router.post("/listNewProduct", newProductHelper);
