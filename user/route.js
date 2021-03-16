const express = require("express");
const router = express.Router();
module.exports = router;
const Insta = require("instamojo-nodejs");
const uploader = require("../multer");
// const { API_KEY, AUTH_KEY } = require("../config/keys");
const { body, validationResult } = require("express-validator");
const { STRIPE_SECRET_KEY } = require("../config/keys");
const stripe = require("stripe")(STRIPE_SECRET_KEY);

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
  getUserCart,
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
const { userModel } = require("../models/export");
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
// const getUserCart = require("./GET/getUserCart");
const viewHomePage = require("./GET/viewHomePage");
const deleteUser = require("./GET/deleteUser");
const getUserCartOnly = require("./controllers/getUserCartItems");
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
router.get("/userCart", checkUserAuth, getUserCart);
router.get("/settings", getUserSetting);
router.post("/login", handleUserLogin);
router.post("/newUser", userValidationRules(), validate, handleUserSignup);
router.post(
  "/changePassword",
  changePwd.userValidationRules(),
  changePwd.validate,
  handleChangePwd
);
router.get("/delete/:userId", deleteUser);

// todo: validate user profile input
router.post("/update/:userId", handleUserUpdate);

// todo: validate user address input
router.post("/new-address/:userId", addNewAddress);
router.post("/addToCart", userAddCart);
router.post("/payment", async (req, res) => {
  console.log(req.body.stripeTokenId);
  try {
    let myCart = await getUserCartOnly({ _id: req.session.MongoId });
    let totalAmt = 0;
    let { cart } = myCart;
    cart.forEach((item) => {
      totalAmt += item.price - (item.price / 100) * item.discount;
    });
    if (Number(req.body.total) === totalAmt) {
      stripe.customers
        .create({
          source: req.body.stripeTokenId,
          email: req.body.email,
          name: req.body.name,
          address: {
            line1: "23 New delhi",
            postal_code: 134003,
            city: "west delhi",
            state: "delhi",
            country: "INDIA",
          },
        })
        .then((customer) => {
          return stripe.charges
            .create({
              amount: parseInt(totalAmt, 10) * 100,
              currency: "inr",
              customer: customer.id,
              description: "sample description",
            })
            .then(function (charge) {
              userModel.findByIdAndUpdate(
                { _id: req.session.MongoId },
                { $set: { cart: [] } },
                (err, data) => {
                  if (err) {
                    console.log(err);
                    res.send(err);
                  } else {
                    console.log(data);
                    res.json("successfully item purchased");
                  }
                }
              );
            })
            .catch(function (error) {
              console.log(error);
              res.status(500).json("error");
            });
        });
    } else {
      res.send("not done");
    }
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
});
