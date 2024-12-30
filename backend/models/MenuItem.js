
const mongoose = require('mongoose');
const Company = require('./Company');

const menuItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    availabilityStatus: { type: String, required: true },
    allergens: { type: String, required: true },
    imageUrl: { type: String, required: true },
    dateAdded: { type: Date, default: Date.now, required: true },

    companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true }
});

const MenuItem = mongoose.model('MenuItem', menuItemSchema);
module.exports = MenuItem;