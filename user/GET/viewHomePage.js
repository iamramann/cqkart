const getAllProducts = require("../controllers/getAllProducts");
module.exports = async function viewHomePage(req, res) {
  try {
    let data = await getAllProducts({});
    res.render("index", {
      products: data,
      display: false,
      message: null,
      user: null,
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
