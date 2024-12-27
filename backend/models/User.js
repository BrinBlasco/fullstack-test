
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    lastLogin: { type: Date, required: true, default: Date.now },
    isActive: { type: Boolean, required: true },
});
const User = mongoose.model('User', userSchema);
module.exports = User;
