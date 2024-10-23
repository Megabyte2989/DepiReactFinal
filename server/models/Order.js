const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customerName: {
        type: String,
        required: true,
        trim: true
    },
    orderDetails: {
        type: String,
        required: true,
        trim: true
    },
    idNumber: { // Add the new ID number field
        type: Number, // Use Number type for ID number
        required: true, // Make it required if necessary
    },
    status: {
        type: String,
        enum: ['pending', 'accepted'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update the updatedAt field before saving the document
orderSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
