const mongoose = require('mongoose');

const MaintainSchema = new mongoose.Schema({
    maintenanceId: { type: Number, required: true, unique: true },
    carId: { type: String, ref: 'Car', required: true },
    dateOfMaintenance: { type: Date, required: true, default: Date.now },
    workshopName: { type: String, required: true },
    notes: { type: String },
    totalCost: { type: Number, required: true },
    paid: { type: Number, required: true },
    remaining: { type: Number, required: true },

})

const Maintenance = mongoose.model('Maintenance', MaintainSchema);
module.exports = Maintenance;