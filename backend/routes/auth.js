
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const User = require('../models/User');
const UserData = require('../models/Employee');

const router = express.Router();

const authenticateJWT = (req, res, next) => {
    const token = req.cookies.auth_token;
    console.log(token);
    if(!token) return res.sendStatus(403);

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

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

        res.cookie('auth_token', token, {
            httpOnly: true,
            maxAge: 360000,
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
    res.status(200).json({ message: 'Logged out' });
});

router.get('/protected', authenticateJWT, async (req, res) => {
    console.log(req);
    const userProfile = await User.findById(req.user.id);
    console.log(userProfile);
    return res.json( {user: userProfile });
});


module.exports = router;