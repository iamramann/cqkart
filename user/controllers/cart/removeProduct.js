const { userModel } = require("../../../models/export");
module.exports = async function updataUser(filter, productId) {
  let query = userModel.updateOne(
    filter,
    {
      $pull: { cart: { productId: productId } },
    },
    { safe: true, multi: true }
  );
  try {
    let response = await query.exec();
    return response;
  } catch (error) {
    throw error;
    // return error;
  }
};
