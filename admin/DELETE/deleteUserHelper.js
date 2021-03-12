const modifyUser = require("../controllers/modifyUser");
const isValidMongoId = require("../controllers/isValidMongoId");
module.exports = async function deleteUserHelper(req, res) {
  const { id } = req.params;
  const filter = { _id: id };
  const update = { status: "deleted" };
  // console.log(filter);
  try {
    let response = isValidMongoId(id) ? await modifyUser(filter, update) : null;
    response !== null
      ? res.sendStatus(204)
      : res.status(400).json({ msg: "Invalid user id" });
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
};
