const nodemailer = require("nodemailer");
const { MY_EMAIL, MY_EMAIL_PASSWORD } = require("../config/keys");
module.exports = async function sendEmail(response, emailBody) {
  let { text, subject, html } = emailBody;
  // / async..await is not allowed in global scope, must use a wrapper

  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  try {
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: MY_EMAIL, // generated ethereal user
        pass: MY_EMAIL_PASSWORD, // generated ethereal password
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: MY_EMAIL, // sender address
      // to: response.email, // list of receivers //! actual email
      to: "holol14541@heroulo.com", //! dummy email
      subject: subject, // Subject line
      text: text, // plain text body
      html: html, // html body
    });

    return true;
  } catch (error) {
    throw error;
  }
};
