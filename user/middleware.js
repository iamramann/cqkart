//no-cache function- disable cached for the protected route so user can't acess it after logging-out
module.exports.disablePageCache = function (req, res, next) {
  res.set("Cache-Control", "no-store");
  next();
};

//if session-var is true send the file otherwise access denied
module.exports.checkUserAuth = function (req, res, next) {
  if (req.session.isUserLoggedIn) {
    next();
  } else {
    res.redirect("/user");
  }
};

//middleware for pagination api
module.exports.paginatedResults = function (model) {
  return (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const start_index = (page - 1) * limit;
    const end_index = page * limit;
    const results = {};

    if (end_index < model.length) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }
    if (start_index > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }
    results.result = model.slice(start_index, end_index);
    res.results = results;
    next();
  };
};
