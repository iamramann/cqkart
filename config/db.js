// const drop_collection = require("./controllers/drop_collection");
// const localUrl =
//   "mongodb://5f6c411a9a5ba507a8ea5402:c22osqlokird778rc22osqlokird778s@128.199.17.119:3002/c22osqlokird778m?authSource=admin";
const mongoose = require("mongoose");
const { MONGOURL } = require("./keys");
const connectionParams = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

module.exports = function () {
  mongoose
    .connect(MONGOURL, connectionParams)
    .then(() => {
      console.log(">>> Connected to database ");
    })
    .catch((err) => {
      console.error(`Error connecting to the database. \n${err}`);
    });

  mongoose.connection.on("connected", () => {
    console.log(">>> Mongoose default connection is open");
  });
  mongoose.connection.on("disconnected", () => {
    console.log("Mongoose default connection is disconnected ");
  });
  process.on("SIGINT", function () {
    mongoose.connection.close(function () {
      console.log(
        "Mongoose default connection is disconnected due to application termination"
      );
      process.exit(0);
    });
  });
};

// drop_collection("");
