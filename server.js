const chalk = require("chalk");
const { DEV_PORT } = require("./config/keys");
const PORT = process.env.PORT || DEV_PORT;
const app = require("./app");
const db = require("./config/db");
class Server {
  constructor() {
    this.initDB();
    this.start();
  }

  initDB() {
    db();
  }

  start() {
    app.listen(PORT, function () {
      console.log(chalk.magentaBright(`>>> Server is running on port ${PORT}`));
    });
  }
}
new Server();
