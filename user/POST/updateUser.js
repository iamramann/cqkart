const { userModel } = require("../../models/export");
module.exports = function updateUser(req, res) {
  const { userId } = req.params;
  const filter = { userId: userId };
  const update = { ...req.body };
  let query = userModel.findOneAndUpdate(filter, update);
  try {
    let response = query.exec();
    res.send("user profile updated").status(200);
  } catch (error) {
    res.send("something went wrong").status(500);
  }
};
