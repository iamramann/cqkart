require("../../config/cloudinary");
const cloudinary = require("cloudinary");
const upload = require("../../mulx");
const uploader = upload.single("image");
const listNewProduct = require("../controllers/ListNewProduct");
const cryptoRandomString = require("crypto-random-string");
module.exports = async function newProductHelper(req, res) {
  uploader(req, res, async (err) => {
    if (err) {
      //415 - unsupported media type
      res.status(415).json({ msg: "File format not supported" });
    } else {
      try {
        if (!req.file) {
          res.json({ msg: "Please upload a file" });
        } else {
          const response = await cloudinary.v2.uploader.upload(req.file.path, {
            folder: "products",
          });
          req.body.image = response.secure_url;
          req.body.productId = cryptoRandomString({
            length: 12,
            type: "alphanumeric",
          });
          const details = { ...req.body };
          let product = await listNewProduct(details);
          res.status(201).json({ msg: "New product added", product });
        }
      } catch (err) {
        // console.log(err);
        res.status(500).json({ msg: err.message });
      }
    }
  });
};
