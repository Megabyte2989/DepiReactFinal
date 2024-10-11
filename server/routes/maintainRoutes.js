const express = require('express');
const Maintenance = require('../models/Maintain');
const router = express.Router();

// Add a new maintenance record
router.post('/add', async (req, res) => {
    const {
        carId,
        dateOfMaintenance,
        workshopName,
        notes,
        description,
        totalCost,
        paid
        // No need to include maintenanceId or remaining since they're auto-handled
    } = req.body;

    try {
        const maintain = new Maintenance({
            carId,
            dateOfMaintenance,
            workshopName,
            notes,
            description,
            totalCost,
            paid
        });

        await maintain.save();
        res.status(201).json({ message: "Maintenance added successfully", maintain });

    } catch (error) {
        res.status(500).json({ message: "Error adding maintenance", error: error.message });
    }
});

// Get all maintenance records with car details
router.get('/', async (req, res) => {
    try {
        const maintain = await Maintenance.find().populate('carId', 'carName'); // Populates car details with 'name' and 'reference' fields
        res.json(maintain);
    } catch (error) {
        res.status(500).json({ message: "Error fetching the maintenance records", error: error.message });
    }
});

// Delete a maintenance record
router.delete('/:id', async (req, res) => {
    try {
        const deletedMaintain = await Maintenance.findByIdAndDelete(req.params.id);
        if (!deletedMaintain) {
            return res.status(404).json({ message: "Maintenance record not found" });
        }
        res.json({ message: "Maintenance record deleted successfully" });

    } catch (error) {
        res.status(500).json({ message: "Error deleting maintenance", error: error.message });
    }
});

// Update a maintenance record
router.put('/update/:id', async (req, res) => {
    const {
        carId,
        dateOfMaintenance,
        workshopName,
        notes,
        description,
        totalCost,
        paid
    } = req.body;

    try {
        const updatedMaintain = await Maintenance.findByIdAndUpdate(
            req.params.id,
            {
                carId,
                dateOfMaintenance,
                workshopName,
                notes,
                description,
                totalCost,
                paid
            },
            { new: true } // Return the updated document
        );

        if (!updatedMaintain) {
            return res.status(404).json({ message: "Maintenance record not found" });
        }

        res.json({ message: "Maintenance updated successfully", updatedMaintain });

    } catch (error) {
        res.status(500).json({ message: "Error updating maintenance", error: error.message });
    }
});


module.exports = router;
