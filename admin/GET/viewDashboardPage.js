const { productModel, userModel } = require("../../models/export");
const { INTERNAL_ERROR } = require("../../message");
// const findProduct = require("../controllers/findProduct");
const getAllProducts = require("../controllers/getAllProducts");
const getAllUsers = require("../controllers/getAllUsers");
module.exports = async function viewDashboardPage(req, res) {
  try {
    let users = await getAllUsers({});
    let newList = await getAllProducts({});
    let message = "Nothing is available here";
    res.render("adminx/dashboard", {
      users,
      newList,
      message,
    });
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }

  // const { category } = req.params;
  // const userQueryParams = {
  //   excludFields: { __v: 0 },
  //   sortBy: { sort: "title" },
  //   filterBy: {},
  // };
  // const filterProducts =
  //   category === "All" || category == "all" ? {} : { category: category };
  // const { excludFields, sort, filterBy } = userQueryParams;
  // /*
  //  * Post.find({}, null, {sort: { field : 'asc' }}), function(err, docs) { ... });
  //  * Post.find({}, null, {sort: { field : 'ascending' }}), function(err, docs) { ... });
  //  * Post.find({}, null, {sort: { field : 1 }}), function(err, docs) { ... });
  //  */
  // // sort by title name
  // const productQuery = productModel.find(
  //   filterProducts,
  //   { __v: 0 },
  //   {
  //     sort: { title: 1 },
  //   }
  // );
  // const userQuery = userModel.find(filterBy, excludFields, sort);
  // try {
  //   const users = await userQuery.exec();
  //   const newList = await productQuery.exec();
  //   res.render("adminx/dashboard", {
  //     users: users,
  //     newList: newList,
  //     message: "Nothing is available here",
  //   });
  // } catch (err) {
  //   console.log(err);
  //   res.render("adminx/adminLogin", {
  //     message: INTERNAL_ERROR,
  //   });
  // }
};
