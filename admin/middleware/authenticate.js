module.exports = function authenticateUser(req, res, next) {
  req.session.isLoggedIn ? next() : res.redirect("/admin");
};
