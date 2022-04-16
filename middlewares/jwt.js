const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, 'secretkey');
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 90000,
        });
        req.token = token;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'You are not authorized!' });
    }
}

module.exports = verifyToken;
