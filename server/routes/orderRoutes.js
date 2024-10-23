// routes/orderRoutes.js
const express = require('express');
const Order = require('../models/Order');
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
router.post('/add', async (req, res) => {
    const { customerName, orderDetails } = req.body;
    try {
        const newOrder = new Order({
            customerName,
            orderDetails,
        });
        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(400).json({ message: 'Failed to create order', error });
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