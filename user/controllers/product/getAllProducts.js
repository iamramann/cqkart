const { productModel } = require("../../../models/export");
// filter is an object
// Async functions always return a promise, whether you use await or not. That promise resolves with whatever the async function returns, or rejects with whatever the async function throws
module.exports = async function findProduct() {
  let query = productModel.find({});
  try {
    let response = await query.exec();
    return response;
  } catch (error) {
    return error;
  }
};
