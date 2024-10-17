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

/**
 * @swagger
 * /api/maintain/add:
 *   post:
 *     summary: Add a new maintenance record
 *     description: Creates a new maintenance record for a car.
 *     tags:
 *       - maintain
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               carId:
 *                 type: string
 *                 description: The ID of the car
 *                 example: "60f5f67abc5e63001b8d45d3"
 *               dateOfMaintenance:
 *                 type: string
 *                 format: date
 *                 description: Date of maintenance
 *                 example: "2024-10-14"
 *               workshopName:
 *                 type: string
 *                 description: Name of the workshop where maintenance was performed
 *                 example: "QuickFix Garage"
 *               notes:
 *                 type: string
 *                 description: Additional notes on the maintenance work
 *                 example: "Changed oil filter"
 *               description:
 *                 type: string
 *                 description: Description of the maintenance work
 *                 example: "Oil change and tire rotation"
 *               totalCost:
 *                 type: number
 *                 description: Total cost of maintenance
 *                 example: 150.0
 *               paid:
 *                 type: number
 *                 description: Amount paid for the maintenance
 *                 example: 100.0
 *     responses:
 *       201:
 *         description: Maintenance added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Maintenance added successfully"
 *                 maintain:
 *                   type: object
 *                   properties:
 *                     maintenanceId:
 *                       type: number
 *                       description: The unique identifier for the maintenance record
 *                       example: 1
 *                     carId:
 *                       type: string
 *                       description: The ID of the car associated with the maintenance
 *                       example: "60f5f67abc5e63001b8d45d3"
 *                     dateOfMaintenance:
 *                       type: string
 *                       format: date
 *                       description: Date of maintenance
 *                       example: "2024-10-14"
 *                     workshopName:
 *                       type: string
 *                       description: Name of the workshop where maintenance was performed
 *                       example: "QuickFix Garage"
 *                     notes:
 *                       type: string
 *                       description: Additional notes on the maintenance work
 *                       example: "Changed oil filter"
 *                     description:
 *                       type: string
 *                       description: Description of the maintenance work
 *                       example: "Oil change and tire rotation"
 *                     totalCost:
 *                       type: number
 *                       description: Total cost of maintenance
 *                       example: 150.0
 *                     paid:
 *                       type: number
 *                       description: Amount paid for the maintenance
 *                       example: 100.0
 *                     remaining:
 *                       type: number
 *                       description: Remaining balance to be paid (if any)
 *                       example: 50.0
 *       500:
 *         description: Error adding maintenance
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error adding maintenance"
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
 */

router.post("/add", async (req, res) => {
    const {
        carId,
        dateOfMaintenance,
        workshopName,
        notes,
        description,
        totalCost,
        paid,
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
            paid,
        });

        await maintain.save();
        res
            .status(201)
            .json({ message: "Maintenance added successfully", maintain });
    } catch (error) {
        res
            .status(500)
            .json({ message: "Error adding maintenance", error: error.message });
    }
});

// Get all maintenance records with car details

/**
 * @swagger
 * /api/maintain/:
 *   get:
 *     summary: Get all maintenance records with car details
 *     description: Fetches all maintenance records and populates the related car details (car name).
 *     tags:
 *      - maintain
 *     responses:
 *       200:
 *         description: A list of maintenance records with car details
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: Maintenance record ID
 *                     example: "64d5f67e8d3f93001b8d55e3"
 *                   carId:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: Car ID
 *                         example: "60f5f67abc5e63001b8d45d3"
 *                       carName:
 *                         type: string
 *                         description: Car name
 *                         example: "Toyota Corolla"
 *                   dateOfMaintenance:
 *                     type: string
 *                     format: date
 *                     description: Date of maintenance
 *                     example: "2024-10-14"
 *                   workshopName:
 *                     type: string
 *                     description: Name of the workshop
 *                     example: "QuickFix Garage"
 *                   description:
 *                     type: string
 *                     description: Description of the maintenance work
 *                     example: "Oil change"
 *                   totalCost:
 *                     type: number
 *                     description: Total cost of maintenance
 *                     example: 150.0
 *       500:
 *         description: Error fetching the maintenance records
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error fetching the maintenance records
 *                 error:
 *                   type: string
 */

// Get all maintenance records with car details
router.get('/', async (req, res) => {
    try {
        const maintain = await Maintenance.find().populate('carId', 'carName'); // Populates car details with 'name' and 'reference' fields
        res.json(maintain);
    } catch (error) {
        res.status(500).json({ message: "Error fetching the maintenance records", error: error.message });
    }
});

/**
 * @swagger
 * /api/maintain/{id}:
 *   delete:
 *     summary: Delete a maintenance record
 *     description: Deletes a specific maintenance record by ID.
 *     tags:
 *       - maintain
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the maintenance record to delete
 *         schema:
 *           type: string
 *           example: "60f5f67abc5e63001b8d45d3"
 *     responses:
 *       200:
 *         description: Maintenance record deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Maintenance record deleted successfully"
 *       404:
 *         description: Maintenance record not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Maintenance record not found"
 *       500:
 *         description: Error deleting maintenance
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error deleting maintenance"
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
 */

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


/**
 * @swagger
 * /api/maintain/update/{id}:
 *   put:
 *     summary: Update a maintenance record
 *     description: Updates a specific maintenance record by ID.
 *     tags:
 *       - maintain
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the maintenance record to update
 *         schema:
 *           type: string
 *           example: "60f5f67abc5e63001b8d45d3"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               carId:
 *                 type: string
 *                 description: The ID of the car
 *                 example: "60f5f67abc5e63001b8d45d3"
 *               dateOfMaintenance:
 *                 type: string
 *                 format: date
 *                 description: Date of maintenance
 *                 example: "2024-10-14"
 *               workshopName:
 *                 type: string
 *                 description: Name of the workshop where maintenance was performed
 *                 example: "QuickFix Garage"
 *               notes:
 *                 type: string
 *                 description: Additional notes on the maintenance work
 *                 example: "Changed oil filter"
 *               description:
 *                 type: string
 *                 description: Description of the maintenance work
 *                 example: "Oil change and tire rotation"
 *               totalCost:
 *                 type: number
 *                 description: Total cost of maintenance
 *                 example: 150.0
 *               paid:
 *                 type: number
 *                 description: Amount paid for the maintenance
 *                 example: 100.0
 *     responses:
 *       200:
 *         description: Maintenance updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Maintenance updated successfully"
 *                 updatedMaintain:
 *                   type: object
 *                   properties:
 *                     carId:
 *                       type: string
 *                       example: "60f5f67abc5e63001b8d45d3"
 *                     dateOfMaintenance:
 *                       type: string
 *                       format: date
 *                       example: "2024-10-14"
 *                     workshopName:
 *                       type: string
 *                       example: "QuickFix Garage"
 *                     notes:
 *                       type: string
 *                       example: "Changed oil filter"
 *                     description:
 *                       type: string
 *                       example: "Oil change and tire rotation"
 *                     totalCost:
 *                       type: number
 *                       example: 150.0
 *                     paid:
 *                       type: number
 *                       example: 100.0
 *       404:
 *         description: Maintenance record not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Maintenance record not found"
 *       500:
 *         description: Error updating maintenance
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error updating maintenance"
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
 */

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
