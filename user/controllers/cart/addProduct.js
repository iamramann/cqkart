const { userModel } = require("../../../models/export");
module.exports = async function updateUserCart(filter, product) {
  let query = userModel.updateOne(filter, {
    $push: { cart: product },
  });
  try {
    let response = await query.exec();
    return response;
  } catch (error) {
    return error;
  }
};
