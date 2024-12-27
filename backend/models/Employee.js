
const mongoose = require('mongoose');
const Address = require('./Address')

const employeeSchema = new mongoose.Schema({
    upid: { type: Number, required: true, unique: true },
    firstName: { type: String, required: true }, 
    lastName: { type: String, required: true },
    email: {type: String, required: true, unique: true },
    phone: {type: String, required: true },
    dateOfBirth: {type: Date, required: true },

    addressID: { type: mongoose.Schema.Types.ObjectId, ref: 'Address' }
});
const Employee = mongoose.model('Employee', employeeSchema);
module.exports = Employee;