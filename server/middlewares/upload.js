const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

require('dotenv').config();

// Configure Cloudinary
cloudinary.config({
    cloud_name: 'dw6zenhpu', // Your Cloudinary cloud name
    api_key: '512191954655949',       // Your Cloudinary API key
    api_secret: 'PhoHuKzw1xou7G0viIbXiBk2jXo'  // Your Cloudinary API secret
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