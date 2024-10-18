const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

require('dotenv').config();

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME, // Your Cloudinary cloud name
    api_key: process.env.CLOUD_APIKEY,       // Your Cloudinary API key
    api_secret: process.env.CLOUD_APISECRET  // Your Cloudinary API secret
});

// Create multer storage with Cloudinary configuration
const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'uploads', // Specify the desired folder in Cloudinary
        allowedFormats: ['jpg', 'jpeg', 'png', 'gif'], // Limit allowed file formats
        transformation: [
            { width: 500, height: 500, crop: 'fill' } // Example transformation
        ]
    }
});

// Create multer upload middleware
const upload = multer({ storage: storage });

module.exports = upload;