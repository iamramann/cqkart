const { productModel } = require("../../../models/export");
module.exports = async function decreaseProductQuantityFromStock(id) {
  let query = productModel.findByIdAndUpdate(id, { $inc: { quantity: -1 } });
  try {
    let response = await query.exec();
    return response;
  } catch (error) {
    return error;
  }
};
