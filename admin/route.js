const express = require("express");
const router = express.Router();
module.exports = router;
const { authenticateUser } = require("./middleware"),
  { productRules, productValidator } = require("./validator/product");

// VIEWS HANDLERS
const viewDashboardPage = require("./GET/viewDashboardPage"),
  viewLoginPage = require("./GET/viewLoginPage"),
  viewProfilePage = require("./GET/viewProfilePage");

// ACTIONS
const ActionLogout = require("./GET/ActionLogout");

// GET HANDLERS
const getProductHelper = require("./GET/getProductHelper"),
  getAdminHelper = require("./GET/getAdminHelper"),
  getUserHelper = require("./GET/getUserHelper");

// POST HANDLERS
const newProductHelper = require("./POST/newProductHelper"),
  loginHelper = require("./POST/loginHelper"),
  handleSignup = require("./POST/handleSignup");

// DELETE HANDLERS
const deleteProductHelper = require("./DELETE/deleteProductHelper"),
  deleteUserHelper = require("./DELETE/deleteUserHelper");

// UPDATE HANDLERS
const modifyUserHelper = require("./PATCH/modifyUserHelper"),
  updateAdminHelper = require("./PATCH/updateAdminHelper"),
  updateProductHelper = require("./PATCH/updateProductHelper");
// const updateAdmin = require("./POST/adminUpdate"); //* fallback

//? VIEWS
router
  .get("/admin", viewLoginPage)
  .get("/dashboard/:category", authenticateUser, viewDashboardPage)
  .get("/profile", authenticateUser, viewProfilePage)
  .get("/logout", ActionLogout);

//? GET REQUESTS
router
  .get("/getAdminDetails/:id", getAdminHelper)
  .get("/getUserDetails/:id", getUserHelper)
  .get("/getProductDetails/:id", getProductHelper);

//? UPDATE REQUESTS
router
  .patch("/modifyUser/:id", modifyUserHelper)
  .patch("/updateAdmin/:id", updateAdminHelper)
  .patch(
    "/updateProductDetails/:id",
    productRules(),
    productValidator,
    updateProductHelper
  );
// router.post("/update", updateAdmin);//* fallback
// router.post(
//   "/updateProduct",
//   productRules(),
//   productValidator,
//   handleUpdateProduct
// );

//? DELETE REQUESTS
router
  .delete("/deleteProduct/:id", deleteProductHelper)
  // router.post("/deleteProduct", handleDeleteProduct); //* fallback
  .delete("/deleteUser/:id", deleteUserHelper);
// router.get("/delete/user/:userId", handleDeleteUser);//* fallback

//? POST REQUESTS
router
  .post("/admin", loginHelper)
  .post("/signup", handleSignup)
  .post("/listNewProduct", newProductHelper);
//router.post("/newProduct", handleNewProduct); //* fallback
