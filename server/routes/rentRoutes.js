// @ts-nocheck
const express = require('express');
const Rent = require('../models/Rent'); // Assuming you have a Rent model
const validateJWT = require('../middlewares/validateJWT');
const User = require('../models/User');
const Car = require('../models/Car')
const mongoose = require('mongoose')

const router = express.Router();


/**
 * @swagger
 * /api/rents/:
 *   get:
 *     summary: Get all rent records
 *     description: Retrieves all rent records from the system, including the associated car details.
 *     tags:
 *      - rent
 *     responses:
 *       200:
 *         description: List of rent records fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   rentId:
 *                     type: number
 *                     description: The unique identifier for the rent
 *                   customerName:
 *                     type: string
 *                   phone:
 *                     type: string
 *                   nationalId:
 *                     type: string
 *                   carId:
 *                     type: object
 *                     description: The car object (populated)
 *                     properties:
 *                       carId:
 *                         type: string
 *                       carName:
 *                         type: string
 *                       carPlate:
 *                         type: string
 *                   carPlate:
 *                     type: string
 *                   carName:
 *                     type: string
 *                   kilosBeforeRent:
 *                     type: number
 *                   rentDate:
 *                     type: string
 *                     format: date-time
 *                   returnDate:
 *                     type: string
 *                     format: date-time
 *                   signedTrust:
 *                     type: boolean
 *                   totalPrice:
 *                     type: number
 *                   paid:
 *                     type: number
 *                   remaining:
 *                     type: number
 *                   status:
 *                     type: string
 *                     enum: ['ongoing', 'completed']
 *       500:
 *         description: Error fetching rents
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error fetching rents
 *                 error:
 *                   type: string
 */

// Get all rents
router.get("/", async (req, res) => {
    try {
        const rents = await Rent.find().populate('carId') // Fetch all rents directly
        res.status(200).json(rents);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching rents', error });
    }
});

/**
 * @swagger
 * /api/rents/getUserRents:
 *   get:
 *     summary: Get rents by user ID
 *     description: Retrieves all rent records associated with the logged-in user.
 *     tags:
 *      - rent
 *     security:
 *       - bearerAuth: []  # Requires JWT authentication
 *     responses:
 *       200:
 *         description: List of rent records for the user fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   rentId:
 *                     type: number
 *                     description: The unique identifier for the rent
 *                   customerName:
 *                     type: string
 *                   phone:
 *                     type: string
 *                   nationalId:
 *                     type: string
 *                   carId:
 *                     type: string
 *                     description: The car ID associated with the rent
 *                   carPlate:
 *                     type: string
 *                   carName:
 *                     type: string
 *                   kilosBeforeRent:
 *                     type: number
 *                   rentDate:
 *                     type: string
 *                     format: date-time
 *                   returnDate:
 *                     type: string
 *                     format: date-time
 *                   signedTrust:
 *                     type: boolean
 *                   totalPrice:
 *                     type: number
 *                   paid:
 *                     type: number
 *                   remaining:
 *                     type: number
 *                   status:
 *                     type: string
 *                     enum: ['ongoing', 'completed']
 *       500:
 *         description: Error fetching user rents
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error fetching user rents
 *                 error:
 *                   type: string
 */


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


/**
 * @swagger
 * /api/rents/add:
 *   post:
 *     summary: Add a new rent
 *     description: Adds a new rent record for a car, including car and rent details.
 *     tags:
 *       - rent
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customerName:
 *                 type: string
 *                 description: Name of the customer renting the car
 *                 example: "John Doe"
 *               phone:
 *                 type: string
 *                 description: Customer's phone number
 *                 example: "+123456789"
 *               nationalId:
 *                 type: string
 *                 description: Customer's national ID number
 *                 example: "9876543210"
 *               carId:
 *                 type: string
 *                 description: The ID of the car being rented
 *                 example: "60f5f67abc5e63001b8d45d3"
 *               carPlate:
 *                 type: string
 *                 description: The car's license plate
 *                 example: "XYZ1234"
 *               kilosBeforeRent:
 *                 type: number
 *                 description: Kilometers on the car before the rent
 *                 example: 5000
 *               rentDate:
 *                 type: string
 *                 format: date
 *                 description: Date when the rent starts
 *                 example: "2024-10-14"
 *               returnDate:
 *                 type: string
 *                 format: date
 *                 description: Date when the car is expected to be returned
 *                 example: "2024-10-21"
 *               signedTrust:
 *                 type: boolean
 *                 description: Whether a trust document has been signed
 *                 example: true
 *               totalPrice:
 *                 type: number
 *                 description: Total price for the rent
 *                 example: 300.0
 *               paid:
 *                 type: number
 *                 description: Amount paid for the rent
 *                 example: 200.0
 *               remaining:
 *                 type: number
 *                 description: Remaining balance to be paid
 *                 example: 100.0
 *     responses:
 *       201:
 *         description: Rent added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Rent added successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     customerName:
 *                       type: string
 *                     phone:
 *                       type: string
 *                     nationalId:
 *                       type: string
 *                     carId:
 *                       type: string
 *                     carPlate:
 *                       type: string
 *                     carName:
 *                       type: string
 *                     kilosBeforeRent:
 *                       type: number
 *                     rentDate:
 *                       type: string
 *                       format: date
 *                     returnDate:
 *                       type: string
 *                       format: date
 *                     signedTrust:
 *                       type: boolean
 *                     totalPrice:
 *                       type: number
 *                     paid:
 *                       type: number
 *                     remaining:
 *                       type: number
 *       400:
 *         description: Car not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Car not found
 *       500:
 *         description: Error adding rent
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error adding rent
 *                 error:
 *                   type: string
 */


// Create a rent

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


/**
 * @swagger
 * /api/rents/update/{id}:
 *   put:
 *     summary: Update a rent record
 *     description: Updates an existing rent record by its ID.
 *     tags:
 *       - rent
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the rent to update
 *         example: "60f5f67abc5e63001b8d45d3"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customerName:
 *                 type: string
 *                 description: Name of the customer renting the car
 *                 example: "John Doe"
 *               phone:
 *                 type: string
 *                 description: Customer's phone number
 *                 example: "+123456789"
 *               nationalId:
 *                 type: string
 *                 description: Customer's national ID number
 *                 example: "9876543210"
 *               carId:
 *                 type: string
 *                 description: The ID of the car being rented
 *                 example: "60f5f67abc5e63001b8d45d3"
 *               carPlate:
 *                 type: string
 *                 description: The car's license plate
 *                 example: "XYZ1234"
 *               kilosBeforeRent:
 *                 type: number
 *                 description: Kilometers on the car before the rent
 *                 example: 5000
 *               rentDate:
 *                 type: string
 *                 format: date
 *                 description: Date when the rent starts
 *                 example: "2024-10-14"
 *               returnDate:
 *                 type: string
 *                 format: date
 *                 description: Date when the car is expected to be returned
 *                 example: "2024-10-21"
 *               signedTrust:
 *                 type: boolean
 *                 description: Whether a trust document has been signed
 *                 example: true
 *               totalPrice:
 *                 type: number
 *                 description: Total price for the rent
 *                 example: 300.0
 *               paid:
 *                 type: number
 *                 description: Amount paid for the rent
 *                 example: 200.0
 *               remaining:
 *                 type: number
 *                 description: Remaining balance to be paid
 *                 example: 100.0
 *               status:
 *                 type: string
 *                 enum: [ongoing, completed]
 *                 description: Status of the rent
 *                 example: "ongoing"
 *     responses:
 *       200:
 *         description: Rent updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Rent updated successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     customerName:
 *                       type: string
 *                     phone:
 *                       type: string
 *                     nationalId:
 *                       type: string
 *                     carId:
 *                       type: string
 *                     carPlate:
 *                       type: string
 *                     carName:
 *                       type: string
 *                     kilosBeforeRent:
 *                       type: number
 *                     rentDate:
 *                       type: string
 *                       format: date
 *                     returnDate:
 *                       type: string
 *                       format: date
 *                     signedTrust:
 *                       type: boolean
 *                     totalPrice:
 *                       type: number
 *                     paid:
 *                       type: number
 *                     remaining:
 *                       type: number
 *                     status:
 *                       type: string
 *       404:
 *         description: Rent record not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Rent record not found
 *       500:
 *         description: Error updating rent
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error updating rent
 *                 error:
 *                   type: string
 */



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


/**
 * @swagger
 * /api/rents/updateStatus/{id}:
 *   put:
 *     summary: Update rent status
 *     description: Updates the status of a rent by its ID.
 *     tags:
 *      - rent
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the rent to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: ['ongoing', 'completed']
 *                 example: 'completed'
 *     responses:
 *       200:
 *         description: Rent status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 carId:
 *                   type: string
 *                   example: "60d5f67abf5e63001c8d45a7"
 *                 status:
 *                   type: string
 *                   example: "completed"
 *       404:
 *         description: Rent not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Rent not found
 *       500:
 *         description: Error updating rent status
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error updating rent status
 *                 error:
 *                   type: string
 */


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



/**
 * @swagger
 * /api/rents/delete/{id}:
 *   delete:
 *     summary: Delete a rent
 *     description: Deletes a rent record by its ID.
 *     tags:
 *      - rent
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the rent to delete
 *     responses:
 *       200:
 *         description: Rent record deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Rent record deleted successfully
 *       404:
 *         description: Rent record not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Rent record not found
 *       500:
 *         description: Error deleting rent
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error deleting rent
 *                 error:
 *                   type: string
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
// Route to update the order status to 'Called'
router.patch('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        // Update the order by ID and set the status to 'Called'
        const updatedOrder = await Order.findByIdAndUpdate(
            id,
            { status: 'Called' }, // Update fields here
            { new: true, runValidators: true } // Return the updated document and run validators
        );

        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.json(updatedOrder); // Respond with the updated order
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
});


module.exports = router;
