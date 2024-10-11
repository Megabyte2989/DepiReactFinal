const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);



const rentSchema = new mongoose.Schema({
    rentId: { type: Number, unique: true },
    customerName: { type: String, required: true },
    phone: { type: String, required: true },
    nationalId: { type: String, required: true },
    carId: { type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true }, // Change to ObjectId
    carPlate: { type: String, required: true },
    carName: { type: String, required: true },
    kilosBeforeRent: { type: Number, required: true },
    rentDate: { type: Date, required: true, default: Date.now },
    returnDate: { type: Date, required: true }, // Date of return
    signedTrust: { type: Boolean, required: true, default: false },
    totalPrice: { type: Number, required: true },
    paid: { type: Number, required: true },
    remaining: { type: Number },
    status: { type: String, enum: ['ongoing', 'completed'], default: 'ongoing' },
});


rentSchema.pre('save', function (next) {
    this.remaining = this.totalPrice - this.paid;
    next();
});

rentSchema.plugin(AutoIncrement, { inc_field: 'rentId', start_seq: 1 });


const Rent = mongoose.model('Rent', rentSchema);
module.exports = Rent;