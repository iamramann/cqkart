const { userModel } = require("../../../models/export");
// filter is an object
// Async functions always return a promise, whether you use await or not. That promise resolves with whatever the async function returns, or rejects with whatever the async function throws
module.exports = async function findUser(filter) {
  let query = userModel.findOne(filter);
  try {
    let response = await query.exec();
    // console.log(response);
    return response;
  } catch (error) {
    return error;
  }
};
