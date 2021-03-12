/*
 ! INPUT
 *  @query <object> - userId <property> - holds the userId which we want to fetch from database
 */
const { response } = require("express");
const { userModel } = require("../../models/export");
module.exports = async function userProfilePage(req, res) {
  const { userId } = req.query;
  const { isUserLoggedIn, username } = req.session;
  const filter = { userId: userId };
  const discardFields = { __v: 0, password: 0, _id: 0 };
  let query = userModel.findOne(filter, discardFields);
  let display = false;
  let data = {};
  if (isUserLoggedIn) {
    try {
      let response = await query.exec();
      data.display = !display;
      data.user = response;
      res.render("users/profile", data);
    } catch (err) {
      res.send("/user/userProfile").status(500);
    }
  } else {
    res.redirect("/");
  }
};
/*
 ! OUTPUT 
 * @profile <render> - send rendered output to client
 * @display <var> - to control visibility of sidebar menu items
 * @user <object> - hold all the details of the user
 */
