// @ts-nocheck
const express = require('express');
const Rent = require('../models/Rent'); // Assuming you have a Rent model
const validateJWT = require('../middlewares/validateJWT');
const User = require('../models/User');
const Car = require('../models/Car')
const mongoose = require('mongoose')

const router = express.Router();

// Get all rents
router.get("/", async (req, res) => {
    try {
        const rents = await Rent.find().populate('carId') // Fetch all rents directly
        res.status(200).json(rents);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching rents', error });
    }
});

// Get rents by user ID
router.get("/getUserRents", validateJWT, async (req, res) => {
    const userId = req.user._id;
    try {
        const rents = await Rent.find({ userId }); // Fetch rents by user ID directly
        res.status(200).json(rents);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user rents', error });
    }
});

// Create a rent
// router.post("/add", validateJWT, async (req, res) => {
// const userId = req.user._id;
// const renterName = ${req.user.firstName} 
// Assuming you have already imported the necessary modules and defined the Rent and Car models
router.post("/add", async (req, res) => {
    const rentData = req.body;
    console.log("Received rent data:", rentData);

    try {
        // Check if the carId exists in the Car collection
        const carId = new mongoose.Types.ObjectId(req.body.carId);
        const car = await Car.findById(carId);

        if (!car) {
            return res.status(400).json({ message: "Car not found" });
        }

        // Create a new Rent object
        const rent = new Rent({
            ...rentData,
            carName: car.carName, // Optionally, include carName if you want to store it with the rent
        });

        // Save the new rent
        await rent.save();
        res.status(201).json({ message: "Rent added successfully", data: rent });
    } catch (error) {
        console.error("Error adding rent:", error); // Log the error for debugging
        res.status(500).json({ message: "Error adding rent", error: error.message });
    }
});


// Update rent
router.put("/update/:id", async (req, res) => {
    const rentId = req.params.id;
    const rentData = req.body;

    try {
        const updatedRent = await Rent.findByIdAndUpdate(rentId, rentData, { new: true }); // Update directly
        if (!updatedRent) {
            return res.status(404).json({ message: "Rent record not found" });
        }
        res.status(200).json({ message: "Rent updated successfully", data: updatedRent });
    } catch (error) {
        res.status(500).json({ message: "Error updating rent", error: error.message });
    }
});

router.put("/updateStatus/:id", async (req, res) => {
    const rentId = req.params.id;
    const { status } = req.body;

    try {
        const updatedRent = await Rent.findByIdAndUpdate(rentId, { status }, { new: true });
        if (!updatedRent) {
            return res.status(404).json({ message: "Rent not found" });
        }
        res.status(200).json(updatedRent);
    } catch (error) {
        res.status(500).json({ message: "Error updating rent status", error: error.message });
    }
});


// Delete rent
router.delete("/delete/:id", async (req, res) => {
    const rentId = req.params.id;

    try {
        const deletedRent = await Rent.findByIdAndDelete(rentId); // Delete directly
        if (!deletedRent) {
            return res.status(404).json({ message: "Rent record not found" });
        }
        res.status(200).json({ message: "Rent record deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting rent", error: error.message });
    }
});

module.exports = router;
