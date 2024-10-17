// @ts-nocheck

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path')
const cloudinary = require('cloudinary').v2; // Import Cloudinary
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerOptions = require("./swagger");




const userRoutes = require("./routes/userRoutes");
const carRoutes = require("./routes/carRoutes");
const rentRoutes = require("./routes/rentRoutes");
const maintainRoutes = require("./routes/maintainRoutes");

dotenv.config(); // load the env data


const app = express();
const swaggerDocs = swaggerJsdoc(swaggerOptions);

app.use(cors({ origin: '*' }));

app.use(express.json());  //parse JSON 


app.use('/documentation', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


app.use('/images', express.static(path.join(__dirname, '../my-app/src/media')));
app.use('/imagesStages', express.static(path.join(__dirname, '../my-app/src/media/stages')));
app.use('/Images', express.static(path.join(__dirname, 'public', 'images')));
app.use('/ImagesGallery', express.static(path.join(__dirname, '../../media')));


app.use("/api/cars", carRoutes);
app.use("/api/rents", rentRoutes);
app.use("/api/maintenance", maintainRoutes);
app.use("/api/user", userRoutes);

const uri = process.env.MONGO_URI; // Use the environment variable

mongoose.connect(uri)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
