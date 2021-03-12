const { userModel } = require("../../models/export");
const hashPassword = require("../../controllers/hashPassword");
module.exports = async function changePwd(req, res) {
  if ("validationError" in req) {
    // only send one error at a time
    res.send(req.validationError[0].msg);
  } else {
    const { newPassword } = req.body;
    const { username } = req.session;
    const filter = { email: username };
    try {
      const hash = await hashPassword(newPassword);
      const update = { password: hash };
      const query = userModel.findOneAndUpdate(filter, update);
      let response = query.exec();
      console.log(`>>> Password changed!!`);
      res.send("Password successfully changed");
    } catch (err) {
      console.log(`some error occured ${err}`);
      res.send("Something went wrong, please try agian later");
    }
  }
};
