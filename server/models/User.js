const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);



const userSchema = new mongoose.Schema({
    // Defining schema properties with required fields
    userId: { type: Number, required: true, unique: true }, // Optional field
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
});


userSchema.plugin(AutoIncrement, { inc_field: 'userId' });

const User = mongoose.model('User', userSchema);
module.exports = User;