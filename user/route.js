const express = require("express");
const router = express.Router();
module.exports = router;
const Insta = require("instamojo-nodejs");
const uploader = require("../multer");
// const { API_KEY, AUTH_KEY } = require("../config/keys");
const { body, validationResult } = require("express-validator");
// Insta.setKeys(API_KEY, AUTH_KEY);
// Insta.isSandboxMode(true);
// GET
const {
  productList,
  handleUserLogout,
  serveUserHomePage,
  productDetailsPage,
  serverUserProfilePage,
  removeItemCart,
  getUserSetting,
  // paymentHandler,
} = require("./GET/userGetApi");

// POST
const {
  handleUserLogin,
  handleUserSignup,
  handleChangePwd,
  handleUserUpdate,
  addNewAddress,
  userAddCart,
} = require("./POST/userPostApi");

// const { userValidationRules, validate } = require("./validator");
const { userValidationRules, validate } = require("./validator/signup");
const changePwd = require("./validator/changePwd");
// const userLoginHandler = require("./handlers/POST/userLoginHandler");
// const login = require("./validator/login");
// const

// middlewares
const {
  checkUserAuth,
  disablePageCache,
  paginatedResults,
} = require("./middleware");
const userCartHandler = require("./GET/userCartHandler");
const viewHomePage = require("./GET/viewHomePage");
// router.get("/pay", paymentHandler);
// GET
router.get("/", viewHomePage);
router.get("/home", disablePageCache, checkUserAuth, viewHomePage);
router.get("/getList/:category", productList);
router.get("/logout", checkUserAuth, handleUserLogout);
router.get("/viewDescription", productDetailsPage);
router.get("/profile", serverUserProfilePage);
router.get("/BuySection", checkUserAuth, disablePageCache, serveUserHomePage);
router.get("/removeItem", checkUserAuth, removeItemCart);
router.get("/userCart", checkUserAuth, userCartHandler);
router.get("/settings", getUserSetting);
router.post("/login", handleUserLogin);
router.post("/newUser", userValidationRules(), validate, handleUserSignup);
router.post(
  "/changePassword",
  changePwd.userValidationRules(),
  changePwd.validate,
  handleChangePwd
);
router.post("/update/:userId", handleUserUpdate);
router.post("/new-address/:userId", addNewAddress);
router.post("/addToCart", userAddCart);
