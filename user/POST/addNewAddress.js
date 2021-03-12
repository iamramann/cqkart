const { userModel } = require("../../models/export");
module.exports = async function addNewAddress(req, res) {
  const { userId } = req.params;
  const filter = { userId: userId };
  const address = { ...req.body };
  const update = {
    $push: {
      address,
    },
  };
  let query = userModel.findOneAndUpdate(filter, update);
  try {
    let response = await query.exec();
    console.log(response);
    res.send("new address added").status(200);
  } catch (error) {
    res.send("something went wrong").status(500);
    console.log(error);
  }
};
