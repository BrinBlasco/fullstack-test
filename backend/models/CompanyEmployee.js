
const mongoose = require('mongoose');
const Company = require('./Company');
const Employee = require('./Employee');

const companyEmplyeeSchema = new mongoose.Schema({
    employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
    company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
    
    salary: { type: Number, required: true },
    hireDate: { type: Date, required: true },
    terminationDate: { type: Date },
    employmentStatus: { type: String, required: true }
});

companyEmplyeeSchema.index({ employee: 1, company: 1 }, { unique: true })
const CompanyEmployee = mongoose.model('CompanyEmployee', companyEmplyeeSchema);
module.exports = CompanyEmployee;