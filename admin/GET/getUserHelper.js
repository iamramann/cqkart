const findUserProfile = require("../controllers/findUserProfile");
const isValidMongoId = require("../controllers/isValidMongoId");
module.exports = async function getAdminHelper(req, res) {
  const { id } = req.params;
  const filter = { _id: id };
  try {
    let response = isValidMongoId(id) ? await findUserProfile(filter) : null;
    response !== null
      ? res.status(200).json(response)
      : res.status(400).send({ msg: "Not a valid MongoId" });
  } catch (error) {
    res.status(500).send({ msg: "Internal server error" });
  }
};
