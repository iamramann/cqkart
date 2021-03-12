const deleteProduct = require("../controllers/deleteProduct");
module.exports = async function deleteProductHelper(req, res) {
  const filter = { _id: req.params.id };
  try {
    let response = await deleteProduct(filter);
    response !== null
      ? res.sendStatus(204) //No content
      : res.status(400).json({ msg: "Requested product does not exist" });
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
};
