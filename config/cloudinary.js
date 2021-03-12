const cloudinary = require("cloudinary");
const { CLOUD_NAME, CLOUD_API_ID, CLOUD_API_SECRET } = require("./keys");
cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUD_API_ID,
  api_secret: CLOUD_API_SECRET,
});
