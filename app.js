const express = require("express");
const app = express();
module.exports = app;
require("./config/locals");
const session = require("express-session"),
  morgan = require("morgan"),
  compression = require("compression"),
  cors = require("cors"),
  methodOverride = require("method-override"),
  user = require("./user/route"),
  admin = require("./admin/route"),
  { SESSION_SECRET_KEY, IS_SECURE } = require("./config/keys"),
  getAllCategories = require("./controllers/getAllCategories"),
  getRandomId = require("./controllers/getRandomId"),
  getstatesAndDistricts = require("./controllers/getstatesAndDistricts");
// const Insta = require("instamojo-nodejs");
// trust first proxy https://www.npmjs.com/package/express-session#cookiesecure
app.set("trust proxy", 1);
app.set("view engine", "ejs");

// * MIDDLEWARES
app.use(cors());
app.use(methodOverride("_method"));
app.use(express.static(__dirname + "/public"));
app.use(morgan("dev")); //common , combine, tiny, dev, short
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(compression());
app.use(
  session({
    secret: SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60, //1hour
      secure: IS_SECURE,
    },
  })
);

app.use("/user", user);

// GET
app.get("/", user);
app.get("/admin", admin);
app.get("/dashboard/:category", admin);
app.get("/logout", admin);

app.get("/profile", admin);
app.get("/forget", admin);
// POST
app.post("/signup", admin);
app.post("/admin", admin);
app.post("/newProduct", admin);

app.patch("/updateProductDetails/:id", admin);
// app.post("/updateProduct", admin); //* fallback

app.patch("/updateAdmin/:id", admin);
// app.post("/update", admin); //* fallback

app.delete("/deleteProduct/:id", admin);
// app.post("/deleteProduct", admin); //* fallback

app.delete("/deleteUser/:id", admin);
// app.get("/delete/user/:userId", admin); //* fallback

app.get("/getProductDetails/:id", admin);
//* fallback deleteProduct

// app.post("/forget", admin);

// end api's
app.get("/getProductId", getRandomId);
app.get("/getCategories", getAllCategories);
app.get("/states-and-districts", getstatesAndDistricts);
// new route handler
app.patch("/modifyUser/:id", admin);
app.get("/getAdminDetails/:id", admin);
app.get("/getUserDetails/:id", admin);
app.post("/listNewProduct", admin);
