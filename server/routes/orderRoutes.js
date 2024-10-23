// routes/orderRoutes.js
const express = require('express');
const Order = require('../models/Order');
const express = require('express');
const multer = require('multer');
const cloudinary = require('../middlewares/upload'); // Import the Cloudinary configuration

const router = express.Router();

// Route to get all orders
router.get('/', async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
});

// Route to add a new order
router.post('/api/orders/add', upload.single('idPhoto'), async (req, res) => {
    try {
        // Upload the image to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path);

        // Extract required fields from the request body
        const { customerName, orderDetails, pickupDate, pickupTime, dropoffDate, dropoffTime, location, idNumber } = req.body;

        // Prepare order data with Cloudinary URL
        const orderData = {
            customerName,
            orderDetails,
            pickupDate,
            pickupTime,
            dropoffDate,
            dropoffTime,
            location,
            idNumber,
            idPhotoUrl: result.secure_url, // Store the secure URL from Cloudinary
        };

        // Create a new order
        const newOrder = new Order(orderData);
        await newOrder.save(); // Save the order to the database

        res.status(201).json(newOrder); // Send back the created order
    } catch (error) {
        console.error('Error uploading to Cloudinary:', error);
        res.status(500).json({ error: 'Failed to upload image to Cloudinary' });
    }
});

// Route to accept an order
router.put('/accept/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const order = await Order.findById(id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        order.status = 'accepted';
        await order.save();

        res.json(order);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
});

// Route to delete an order
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const order = await Order.findById(id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        await order.remove();
        res.json({ message: 'Order deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
});

module.exports = router;
