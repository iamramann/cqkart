//if admin is already logged in just go to admin control panel
module.exports = function viewLoginPage(req, res) {
  if (req.session.isLoggedIn) {
    res.redirect("/admin");
  } else {
    res.render("adminx/login", {
      message: null,
    });
  }
};
