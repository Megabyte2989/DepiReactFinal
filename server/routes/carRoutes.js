// @ts-nocheck
const express = require('express');
const Car = require('../models/Car');
const upload = require('../middlewares/uploadImage'); // Import the upload instance
const path = require('path');
const router = express.Router();
const fs = require('fs');

// Serve static images
router.use("/images", express.static(path.join(__dirname, "../upload/images")));



router.get('/', async (req, res) => {
    try {
        const cars = await Car.find(); // Fetch all rents directly
        res.status(200).json(cars);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching cars', error });
    }
})


// Add a new car
router.post('/add', upload.single('carImage'), async (req, res) => {
    const { carName, carPlate, model, brand, year, rentalRate, isAvailable, ownerName, kilosRightNow, lastOilChangeDate } = req.body;
    const imageUrl = req.file ? req.file.filename : null;

    try {
        // No need to include carId since it's auto-incremented
        const car = new Car({
            carName,
            carPlate,
            model,
            brand,
            year,
            rentalRate,
            isAvailable,
            imageUrl, // Optional
            ownerName,
            kilosRightNow,
            lastOilChangeDate,
        });

        await car.save();
        res.status(201).json({ message: "Car added successfully", car });
    } catch (error) {
        res.status(500).json({ message: "Error adding car", error: error.message });
    }
});

// Update a car
router.put('/update/:id', upload.single('carImage'), async (req, res) => {
    const carId = req.params.id;
    const { carName, model, brand, year, rentalRate, isAvailable, ownerName, kilosRightNow, lastOilChangeDate } = req.body;
    const imageUrl = req.file ? req.file.filename : null; // Get image URL from the uploaded file (optional)

    try {
        // Create an object to hold the updated data
        const updateData = {
            carName,
            model,
            brand,
            year,
            rentalRate,
            isAvailable,
            ownerName,
            kilosRightNow,
            lastOilChangeDate,
        };

        // Only update imageUrl if it is provided
        if (imageUrl) {
            updateData.imageUrl = imageUrl; // Update imageUrl only if an image is uploaded
        }

        const updatedCar = await Car.findByIdAndUpdate(carId, updateData, { new: true });

        if (!updatedCar) {
            return res.status(404).json({ message: "Car not found" });
        }

        res.status(200).json({ message: "Car updated successfully", updatedCar });
    } catch (error) {
        res.status(500).json({ message: "Error updating car", error: error.message });
    }
});

// Delete a car
router.delete('/:id', async (req, res) => {
    try {
        const deletedCar = await Car.findByIdAndDelete(req.params.id);
        if (!deletedCar) {
            return res.status(404).json({ message: "Car record not found" });
        }

        // Delete the image file from the server if it exists
        if (deletedCar.imageUrl) {
            const imagePath = path.join(__dirname, '../../my-app/src/media', path.basename(deletedCar.imageUrl)); // Correct the path to match the new storage location
            fs.unlink(imagePath, (err) => {
                if (err) {
                    console.error("Error deleting the image:", err);
                }
            });
        }

        res.json({ message: "Car record and image deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting Car", error });
    }
});

module.exports = router;
