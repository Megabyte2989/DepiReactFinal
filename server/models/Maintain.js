const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);


const MaintainSchema = new mongoose.Schema({
    maintenanceId: { type: Number, unique: true },
    carId: { type: mongoose.Types.ObjectId, ref: 'Car', required: true },
    dateOfMaintenance: { type: Date, required: true, default: Date.now },
    description: { type: String },
    workshopName: { type: String, required: true },
    notes: { type: String },
    totalCost: { type: Number, required: true },
    paid: { type: Number, required: true },
    remaining: { type: Number },

})

MaintainSchema.plugin(AutoIncrement, { inc_field: 'maintenanceId', start_seq: 1 });

MaintainSchema.pre('save', function (next) {
    this.remaining = this.totalCost - this.paid;
    next();
});

const Maintenance = mongoose.model('Maintenance', MaintainSchema);
module.exports = Maintenance;