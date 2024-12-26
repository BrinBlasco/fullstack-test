
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const router = express.Router();

router.post('/signup', async (req, res) => {
    const { email, username, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, username, password: hashedPassword});
        await newUser.save();
        res.status(201).send('User created');

    } catch (err) {
        res.status(500).send(`Error creating user: ${err}`);
    }
});

router.post('/login', async (req, res) => {
    const { login, password } = req.body;
    try {
        const user = await User.findOne({ username: login });
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



