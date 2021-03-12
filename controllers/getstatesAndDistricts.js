const fs = require("fs");
module.exports = function getstatesAndDistricts(req, res) {
  fs.readFile("list.json", "utf-8", (err, data) => {
    if (err) {
      res.send(err).status(500);
    } else {
      res.send(JSON.parse(data)).status(200);
    }
  });
};
