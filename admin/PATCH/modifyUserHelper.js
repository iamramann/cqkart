require("../../config/cloudinary");
const cloudinary = require("cloudinary");
const upload = require("../../mulx");
const uploader = upload.single("avatar");
const modifyUser = require("../controllers/modifyUser");
const isValidMongoId = require("../controllers/isValidMongoId");
module.exports = function modifyUserHelper(req, res) {
  const { id } = req.params;

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
};

// const { id } = req.params;
// const filter = { _id: id };
// const update = { status: "deleted" };
// try {
//   // const isValidMongoId = mongoose.Types.ObjectId.isValid(id);
//   let response = isValidMongoId(id) ? await modifyUser(filter, update) : null;
//   response !== null
//     ? res.sendStatus(204)
//     : res.status(400).json({ msg: "Invalid user id" });
// } catch (error) {
//   res.status(500).json({ msg: "Internal server error" });
// }
