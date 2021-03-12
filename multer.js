const multer = require("multer");
const productImagesPath = "/uploads/products";
//config multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (req.url === "/change_admin_avatar") {
      cb(null, __dirname + "/public/uploads/admin");
    } else if (req.url === "/newProduct") {
      req.myPath = productImagesPath;
      cb(null, __dirname + `/public${productImagesPath}`);
    } else if (req.url === "/update_user_avatar") {
      cb(null, __dirname + "/public/uploads/user");
    } else if (req.url === "/test") {
      cb(null, __dirname + "/public/uploads/products");
    } else {
      console.log("here");
    }
  },

  filename: function (req, file, cb) {
    const fileName = file.originalname;
    const fileExtension = getFileExtension(fileName);
    const customFileName = `IMG_${req.body.productId.toUpperCase()}.${fileExtension}`;
    req.body.image = req.myPath + "/" + customFileName;
    cb(null, customFileName);
  },
});

function getFileExtension(fileName) {
  const x = fileName.lastIndexOf(".");
  return fileName.substr(x + 1);
}
const uploader = multer({ storage: storage });
module.exports = uploader;
