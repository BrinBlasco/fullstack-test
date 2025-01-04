
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const User = require('../models/User');
const Employee = require('../models/Employee');
const Address = require('../models/Address');
const authenticateJWT = require('./authenticateJWT');

const router = express.Router();

router.post('/signup', async (req, res) => {
    const session = await mongoose.startSession(); 

    const { username, email, password, upid, fName, lName, phone, bdate } = req.body;
    try {
        session.startTransaction();

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ 
            email: email,
            username: username,
            password: hashedPassword,
            lastLogin: null
        });
        const user = await newUser.save({ session });

        const newEmployee = new Employee({
            upid: upid,
            firstName: fName,
            lastName: lName,
            email: email,
            phone: phone,
            dateOfBirth: bdate,
            accountID: user._id
        });
        await newEmployee.save({ session });

        await session.commitTransaction();
        session.endSession();

        res.status(201).json({ message: 'User created' });

    } catch (err) {
        await session.abortTransaction();
        session.endSession();

        console.error("Transaction failed: ", err);
        res.status(500).json({ message : `Error creating user: ${err}` });
    }
});

router.post('/login', async (req, res) => {
    const { login, password } = req.body;
    try {
        const user = await User.findOne({
            $or: [
                { username: login },
                { email: login }
            ]
        });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(401).json({ message: 'Invalid password' });

        const accessToken = jwt.sign({ id: user._id }, process.env.JWT_ACC_SECRET, {expiresIn: '14h' });

        res.cookie('auth_token', accessToken, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 7,
            sameSite: 'strict', //secure: process.env.NODE_ENV === 'development'
            secure: false
        });

        user.lastLogin = Date.now();
        user.save();

        return res.status(200).json({ message: 'Logged in successfully' }); //res.json({ token });
    } catch (err) {
        return res.status(401).json({ message: 'Invalid credentials' }); // res.status(500).send('Error loggin in');
    }
});

router.get('/logout', (req, res) => {
    res.clearCookie();
    return res.status(200).json({ message: 'Logged out' });
});

router.get('/protected', authenticateJWT, async (req, res) => {
    const userProfile = await User.findById(req.user.id);
    return res.json(userProfile);
});

router.get('/protected/address', authenticateJWT, async (req, res) => {
    const employee = await Employee.findOne({ accountID: req.user.id });

    if(!employee.addressID) return res.json("No address.");
    
    const address = await Address.findById(employee._id);
    return res.json({ address: address });
});


module.exports = router;