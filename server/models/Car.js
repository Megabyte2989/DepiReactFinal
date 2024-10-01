const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);



const carSchema = new mongoose.Schema({
  carId: { type: Number, required: true, unique: true },
  carName: { type: String, required: true },
  model: { type: String, required: true },
  brand: { type: String, required: true },
  year: { type: Number, required: true },
  carPlate: { type: String, required: true },
  rentalRate: { type: Number, required: true },
  isAvailable: { type: Boolean, default: true },
  imageUrl: { type: String },
  ownerName: { type: String, required: true }, // Owner's name
  kilosRightNow: { type: Number, required: true }, // Kilos right now
  lastOilChangeDate: { type: Date, required: true }, // Date of last oil change
});


carSchema.plugin(AutoIncrement, { inc_field: 'rentId' });

const Car = mongoose.model('Car', carSchema);
module.exports = Car;