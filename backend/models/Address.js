
const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    country: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip_code: { type: Number, required: true },
});
const Address = mongoose.model('Address', addressSchema);
module.exports = Address;

