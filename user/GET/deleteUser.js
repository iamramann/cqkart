const { userModel } = require("../../models/export");
module.exports = async function deleteUser(req, res) {
  const { userId } = req.params;
  const filter = { userId };
  const update = { status: "deleted" };
  let query = userModel.findOne(filter);
  try {
    let user = await query.exec();
    if (user) {
      let deleteUser = userModel.findOneAndUpdate(filter, update);
      let response = await deleteUser.exec();
      console.log("here");
      req.session.destroy(function (err) {
        if (err) {
          throw err;
        }
        console.log(">>> Session Destroyed....");
        res.redirect("/user");
      });
      // res.send("user successfully deleted").status(200);
    }
  } catch (err) {
    res.send("something went wrong").status(500);
  }
};
