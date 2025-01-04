
const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
    const token = req.cookies.auth_token;
    if(!token) return res.status(403).json({ message : 'No token' });

    jwt.verify(token, process.env.JWT_ACC_SECRET, (err, user) => {
        if(err) return res.status(403).json({ message : 'Invalid signature' });
        req.user = user;
        next();
    });
};

module.exports = authenticateJWT