const isValidMongoId = require("../controllers/isValidMongoId");
const updateProduct = require("../controllers/updateProduct");
const findProduct = require("../controllers/findProduct");
module.exports = async function updateProductHelper(req, res) {
  const { id } = req.params;
  const filter = { _id: id };
  let product;
  if (req.validationError) {
    product = await findProduct(filter);
    res
      .status(400)
      .json({ msg: req.validationError[0].msg, product, isUpdated: false });
  } else {
    try {
      product = isValidMongoId(id)
        ? await updateProduct(filter, req.body)
        : null;

      product !== null
        ? res.status(200).json({
            msg: "Product updated successfully",
            product,
            isUpdated: true,
          })
        : res.status(400).json({ msg: "Invalid user id" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Internal server error" });
    }
  }
};
/*
  if (isValidMongoId(id)) {
    uploader(req, res, async (err) => {
      const filter = { _id: id };
      if (err) {
        //415 - unsupported media type
        res.status(415).json({ msg: "File format not supported" });
      } else {
        if (req.file) {
          const cloduImage = await cloudinary.v2.uploader.upload(
            req.file.path,
            {
              folder: "user",
            }
          );
          req.body.avatar = cloduImage.secure_url;
        } else {
          console.log("No file available");
        }

        try {
          let update = { ...req.body };
          let response = await modifyUser(filter, update);
          response !== null
            ? res.sendStatus(204)
            : res.status(400).json({ msg: "No details found" });
        } catch (error) {
          res.status(500).send({ msg: "Internal server error" });
        }
      }
    });
  } else {
    res.status(400).json({ msg: "Invalid Admin id" });
  }
 */
