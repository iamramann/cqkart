const express = require("express");
const app = express();
module.exports = app;
require("./config/locals");
const session = require("express-session"),
  morgan = require("morgan"),
  compression = require("compression"),
  cors = require("cors"),
  methodOverride = require("method-override"),
  admin = require("./admin/route"),
  user = require("./user/route"),
  { SESSION_SECRET_KEY, IS_SECURE } = require("./config/keys"),
  getAllCategories = require("./controllers/getAllCategories"),
  getRandomId = require("./controllers/getRandomId"),
  getstatesAndDistricts = require("./controllers/getstatesAndDistricts");

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
app.get("/dashboard", admin);
app.get("/getCategories", getAllCategories);
app.get("/forget", admin);
app.post("/forget", admin);
app.patch("/updateProductDetails/:id", admin);
app.patch("/updateAdmin/:id", admin);
app.delete("/deleteProduct/:id", admin);
app.delete("/deleteUser/:id", admin);
app.get("/getProductDetails/:id", admin);
app.get("/getProductId", getRandomId);
app.get("/states-and-districts", getstatesAndDistricts);
app.patch("/modifyUser/:id", admin);
app.get("/getAdminDetails/:id", admin);
app.get("/getUserDetails/:id", admin);
app.post("/listNewProduct", admin);
app.get("/logout", admin);
app.get("/profile", admin);

// POSTMAN
app.post("/admin", admin);
app.post("/signup", admin);
app.post("/newProduct", admin);

// 404 route
app.get("*", function (req, res) {
  res.sendFile(__dirname + "/views/404.html");
});


app.get("/contact", function (req, res) {
  res.sendFile(__dirname + "/views/contact.html");
});

// app.post("/updateProduct", admin); //* fallback
// app.post("/update", admin); //* fallback
// app.post("/deleteProduct", admin); //* fallback
// app.get("/delete/user/:userId", admin); //* fallback
//* fallback deleteProduct

// app.get("/test", (req, res) => {
//   res.render("admin/login");
// });

// COMMENTS
// app.get("/send", sendEmail, (req, res) => {
//   res.send("!");
// });
// app.get("/dashboard/:category", admin);

// app.post("/register", (req, res) => {
//   adminModel.create(req.body, (err, data) => {
//     if (err) {
//       res.send(err);
//     } else {
//       let token = jwt.sign({ id: data._id }, "some secret", {
//         expiresIn: 86400,
//       });
//       // res.setHeader();
//       res.header("auth-token", token);
//       res.status(200).send({ auth: true, token: token });
//     }
//   });
// });

// app.get("/me", function (req, res) {
//   console.log(req.header);
//   var token = req.header("auth-token");
//   if (!token)
//     return res.status(401).send({ auth: false, message: "No token provided." });

//   jwt.verify(token, "some secret", function (err, decoded) {
//     if (err)
//       return res
//         .status(500)
//         .send({ auth: false, message: "Failed to authenticate token." });

//     res.status(200).send(decoded);
//   });
// });

// // POST
