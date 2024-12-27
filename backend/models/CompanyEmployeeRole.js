
const mongoose = require('mongoose');
const CompanyEmployee = require('./CompanyEmployee');

const companyEmployeeRoleSchema = new mongoose.Schema({

    companyEmployeeID: { type: mongoose.Schema.Types.ObjectId, ref: 'CompanyEmployee', required: true },
    roleID: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
    assigmentDate: { type: date, required: true }
});

const CopmanyEmployeeRole = mongoose.model('CompanyEmployeeRole', companyEmployeeRoleSchema);
module.exports = CopmanyEmployeeRole;