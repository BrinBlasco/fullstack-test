
const mongoose = require('mongoose');
const Address = require('./Address');
const Employee = require('./Employee');

const companySchema = new mongoose.Schema({
    name: { type: String, required: true },
    registrationDate: { type: Date, required: true },
    contactInfo: { type: Object, required: true },
    operatingHours: { type: Object, required: true },

    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true }, 
    addressID: { type: mongoose.Schema.Types.ObjectId, ref: 'Address', required: true },
    parentCompanyID: { type: mongoose.Schema.Types.ObjectId, ref: 'Company'}
});
const Company = mongoose.model('Company', companySchema);
module.exports = Company;
