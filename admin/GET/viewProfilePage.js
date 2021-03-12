const { adminModel } = require("../../models/export");
module.exports = async function viewProfilePage(req, res) {
  let { username } = req.session;
  // console.log(username);
  const filter = {
    username,
  };
  let query = adminModel.findOne(filter, { __v: 0 });
  try {
    let response = await query.exec();
    res.render("adminx/profile", {
      response,
    });
  } catch (error) {
    console.log(error);
    res.send("something went wrong").status(500);
  }
};

//* @response(object) - holds the current user details
