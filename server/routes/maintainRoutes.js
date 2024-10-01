// @ts-nocheck
const express = require('express')
const Maintenance = require('../models/Maintain'); //
const router = express.Router()



router.post('/add', async (req, res) => {
    const { maintenanceId,
        carId,
        dateOfMaintenance,
        workshopName,
        notes,
        totalCost,
        paid,
        remaining } = req.body;

    try {
        const maintain = new Maintenance({
            maintenanceId,
            carId,
            dateOfMaintenance,
            workshopName,
            notes,
            totalCost,
            paid,
            remaining
        })

        await maintain.save();
        res.status(201).json({ message: "Maintenance added successfully" })

    } catch (error) {
        res.status(500).json({ message: "Error adding Maintenance", error })
    }
})


router.get('/', async (req, res) => {
    try {
        const maintain = await Maintenance.find()
        res.json(maintain)
    } catch (error) {
        res.status(500).json({ message: "Error fetching the maintenance", error })
    }
})



router.delete('/:id', async (req, res) => {
    try {
        const deletedMaintain = await Maintenance.findByIdAndDelete(req.params.id);
        if (!deletedMaintain) {
            return res.status(404).json({ message: "Maintenance record not found" })
        }
        res.json({ message: "Maintenance record deleted successfully" })

    } catch (error) {
        res.status(500).json({ message: "Error deleting Mainenance ", error })
    }
});


module.exports = router;