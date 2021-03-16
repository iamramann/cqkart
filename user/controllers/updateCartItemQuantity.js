const { userModel } = require("../../models/export");

module.exports = function updateCartItemQuantity(productId, flag) {
  return new Promise((resolve, reject) => {
    userModel.findOneAndUpdate(
      { "cart.productId": productId },
      { $inc: { "cart.$.quantity": Number(flag) } },
      (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      }
    );
  });
  //   let query = userModel.updateOne(
  //   filter,
  //   {
  //     $pull: { cart: { productId: productId } },
  //   },
  //   { safe: true, multi: true }
  // );
  // try {
  //   let response = await query.exec();
  //   return response;
  // } catch (error) {
  //   throw error;
  //   // return error;
  // }
};
