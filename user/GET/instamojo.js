const Insta = require("instamojo-nodejs");
const { userModel } = require("../../models/export");
const findUser = require("../controllers/user/findUser");
module.exports = async function paymentHandler(req, res) {
  let { username } = req.session;
  let userFilter = { email: username };
  try {
    let user = await findUser(userFilter);

    if (user) {
      let total = 0;
      user.cart.forEach((item, index) => {
        if (item.discount === null) {
          total += item.price;
        } else {
          total += item.price - (item.discount / 100) * item.price;
        }
      });

      let data = new Insta.PaymentData();
      data.amount = total;
      data.name = user.name;
      data.email = user.email;
      const redirectUrl = "http://localhost:8000/success";
      data.setRedirectUrl(redirectUrl);
      data.send_email = "True";
      data.purpose = "Test"; // REQUIRED
      Insta.createPayment(data, function (error, response) {
        if (error) {
          // some error
          throw error;
        } else {
          // Payment redirection link at response.payment_request.longurl

          response = JSON.parse(response);
          res.redirect(response.payment_request.longurl);
          // res.send("Please check your email to make payment");
        }
      });
    }
  } catch (err) {
    throw err;
  }
};
