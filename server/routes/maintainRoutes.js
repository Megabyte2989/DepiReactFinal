// @ts-nocheck
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
        totalCost,
        paid,
        remaining
    } = req.body;

    try {
        const maintain = new Maintenance({
            carId,
            dateOfMaintenance,
            workshopName,
            notes,
            totalCost,
            paid,
            remaining
            // No need to include maintenanceId since it's auto-incremented
        });

        await maintain.save();
        res.status(201).json({ message: "Maintenance added successfully", maintain });

    } catch (error) {
        res.status(500).json({ message: "Error adding Maintenance", error: error.message });
    }
});

// Get all maintenance records
router.get('/', async (req, res) => {
    try {
        const maintain = await Maintenance.find();
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
        res.status(500).json({ message: "Error deleting Maintenance", error: error.message });
    }
});

module.exports = router;
