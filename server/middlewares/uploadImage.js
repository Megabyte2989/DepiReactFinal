// Import the multer library for handling multipart/form-data requests

const multer = require('multer')
const path = require('path')


// Define a disk storage configuration for multer
const storage = multer.diskStorage({
    // Specify the destination directory for uploaded files
    destination: (req, file, cb) => {
        // Use the __dirname variable to get the current directory, and join it with the upload/images path, if error return null
        cb(null, path.join(__dirname, 'public/images')); // Saving to public/images
    },
    // Specify the filename for each uploaded file
    filename: (req, file, cb) => {
        // Use the fieldname, current timestamp, and original file extension to generate a unique filename, if error return null
        cb(
            null,
            `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
        );
    },
});

// Create a multer instance with the defined storage configuration
const upload = multer({
    storage: storage,
});

// Export the upload instance as the default export
module.exports = upload;