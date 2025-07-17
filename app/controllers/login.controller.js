const db = require('../models');
const User = db.users;
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const loginValidation = require('../validations/login.validation');
const key = process.env.HASH_KEY;
const secret = process.env.TOKEN_SECRET;
const environment = process.env.NODE_ENV || 'development';

module.exports = async (req, res) => {

    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(404).send('Username / Password salah');

    const passwordHash = crypto.createHmac('sha256', key).update(req.body.password).digest('hex');
    if (passwordHash != user.password) return res.status(400).send('Username / Password salah');

    const token = jwt.sign({ _id: user._id }, secret);

    const { password, ...userWithoutPassword } = user.toObject();
    
    res.cookie("token", token, {
        maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
        httpOnly: true,
        secure: environment === 'production', // Use secure cookies in production
        sameSite: 'strict', // Prevent CSRF attacks
    });

    res.status(200).json({ message: "Login successful", data: userWithoutPassword });
};