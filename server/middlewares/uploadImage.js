// upload.js

const dotenv = require('dotenv');

const multer = require('multer');
const cloudinary = require('cloudinary').v2;

dotenv.config()
// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_APIKEY,
    api_secret: process.env.CLOUD_APISECRET,
});

// Use memory storage for multer to upload files directly to Cloudinary
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

module.exports = upload;