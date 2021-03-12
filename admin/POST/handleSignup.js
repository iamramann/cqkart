const chalk = require("chalk");
const hashPassword = require("../../controllers/hashPassword");
const { adminModel } = require("../../models/export");
const { INTERNAL_ERROR } = require("../../message");

module.exports = async function handleSignup(req, res) {
  const admin_details = { ...req.body };
  const client_password = req.body.password;
  try {
    let hash = await hashPassword(client_password);
    admin_details.password = hash;
    const query = adminModel.create(admin_details);
    let response = await query.exec();
    console.log(chalk.hex("#FF8C00")(">>> new admin registered"));
    res.status(200).send(response);
  } catch (e) {
    res.status(500).send(INTERNAL_ERROR);
  }
};
