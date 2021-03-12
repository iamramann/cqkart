const findProduct = require("../controllers/findProduct");
const isValidMongoId = require("../controllers/isValidMongoId");
module.exports = async function getAdminHelper(req, res) {
  const { id } = req.params;
  const filter = { _id: id };
  try {
    let response = isValidMongoId(id) ? await findProduct(filter) : null;
    response !== null
      ? res.status(200).json(response)
      : res.status(400).send({ msg: "Requested product doesn't exist" });
  } catch (error) {
    res.status(500).send({ msg: "Internal server error" });
  }
};
