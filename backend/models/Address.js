
const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    country: { type: String, required: true },
    address: { type: String, required: true },
    //state: { type: String },
    city: { type: String, required: true },
    zip_code: { type: Number, required: true },
});
const Address = mongoose.model('Address', addressSchema);
module.exports = Address;

