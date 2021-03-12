const { userModel } = require("../../models/export");
const { USER_CREATED, INTERNAL_ERROR } = require("../../message");
const hashPassword = require("../../controllers/hashPassword");
const getRandomString = require("../../controllers/getRandomString");
const getAllProducts = require("../controllers/product/getAllProducts");
module.exports = async function userSignup(req, res) {
  let products,
    user,
    display = false,
    message;
  const { email, password, name } = req.body;
  try {
    products = await getAllProducts();
    if ("validationError" in req) {
      message = req.validationError;
    } else {
      //* if user is null then create a new entry
      const hash = await hashPassword(password);
      const userId = getRandomString(10);
      const details = { ...req.body, password: hash, userId };
      await userModel.create(details);
      message = `Welcome  "<b>${name}</b>" - ${USER_CREATED}`;
    }
    res.render("index", {
      products,
      display,
      message,
    });
  } catch (err) {
    res.render("index", {
      products,
      display,
      message: INTERNAL_ERROR,
    });
  }
};
