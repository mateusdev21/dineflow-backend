const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return res.status(403).json({ message: 'Please login!' });
    }

    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        req.user = decoded;
        next();
    });
};

module.exports = verifyToken;