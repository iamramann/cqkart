require("../../config/cloudinary");
const cloudinary = require("cloudinary");
const upload = require("../../mulx");
const uploader = upload.single("avatar");
const updateAdmin = require("../controllers/updateAdmin");
const isValidMongoId = require("../controllers/isValidMongoId");
module.exports = async function updateAdminHelper(req, res) {
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
              folder: "admin",
            }
          );
          req.body.avatar = cloduImage.secure_url;
        } else {
          console.log("No file available");
        }

        try {
          const update = { ...req.body };
          let response = await updateAdmin(filter, update);
          //? for postman
          // response !== null
          //   ? res.sendStatus(204)
          //   : res.status(400).json({ msg: "No details found" });

          // ? for web client
          response !== null
            ? res.redirect("/profile")
            : res.status(400).json({ msg: "No details found" });
          // res.redirect("/profile");
        } catch (error) {
          console.log(error);
          res.status(500).send({ msg: "Internal server error" });
        }
      }
    });
  } else {
    res.status(400).json({ msg: "Invalid Admin id" });
  }
};
