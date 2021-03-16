const findAdmin = require("../controllers/findAdmin");
const sendEmail = require("../../config/nodemailer");
module.exports = async function forgetPwdHelper(req, res) {
  console.log("here");
  let filter = { email: req.body.email };
  try {
    let response = await findAdmin(filter); //check for admin profile

    if (response !== null) {
      let emailBody = {
        subject: "test",
        text: "test",
        html: "<b>test</b>",
      };
      let emailResponse = await sendEmail(response, emailBody); // returns true for success
      res.status(200).json({
        flag: emailResponse,
        msg: "Please check your email",
        email: req.body.email,
      });
    } else {
      res.status(200).json({
        flag: false,
        msg: "Entered email is not a valid email",
        email: req.body.email,
        filter,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
};
