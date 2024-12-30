
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const User = require('../models/User');
const UserData = require('../models/Employee');

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

        const newUserData = new UserData({
            upid: upid,
            firstName: fName,
            lastName: lName,
            email: email,
            phone: phone,
            dateOfBirth: bdate,
            accountID: user._id
        });
        await newUserData.save({ session });

        await session.commitTransaction();
        session.endSession();

        res.status(201).send('User created');

    } catch (err) {
        await session.abortTransaction();
        session.endSession();

        console.error("Transaction failed: ", err);
        res.status(500).send(`Error creating user: ${err}`);
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
        if (!user) return res.status(404).send('User not found');

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(401).send('Invalid password');

        const token = jwt.sign({ id: user._id, uname: user.username}, process.env.JWT_SECRET, {expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        res.status(500).send('Error loggin in');
    }
});

router.get('/protected', (req, res) => {
    const token = req.headers['authorization'].split(' ')[1];
    if (!token) return res.status(403).send('No token provided');

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(500).send(`Failed to authenticate token, ${err}`);
        res.status(200).send(`Welcome, ${decoded.uname}!`);
    });
});

module.exports = router;