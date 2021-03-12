const chalk = require("chalk");
module.exports = function user_logout(req, res) {
  // Destroys the session and will unset the req.session property. Once complete, the callback will be invoked. - source express-session npm documentation
  req.session.destroy(function (err) {
    if (err) {
      throw err;
    }
    console.log(chalk.red(">>> Session Destroyed...."));
    res.redirect("/user");
  });
};
