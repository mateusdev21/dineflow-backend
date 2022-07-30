const db = require('../models');
const User = db.users;
const crypto = require('crypto');
const registerValidation = require('../validations/register.validation');
const key = process.env.HASH_KEY;

module.exports = async (req, res) => {

    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const emailExist = await User.findOne({ email: req.body.email });
    const usernameExist = await User.findOne({ username: req.body.username });

    if (emailExist) {
        return res.status(400).send('Email telah terdaftar');
    };

    if (usernameExist) {
        return res.status(400).send('Username telah terdaftar');
    };

    const passwordHash = crypto.createHmac('sha256', key).update(req.body.password).digest('hex');

    const user = new User({
        username: req.body.username,
        password: passwordHash,
        email: req.body.email,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        level: req.body.level
    });

    try {
        await user.save();
        res.send('Akun berhasil dibuat');
    } catch (error) {
        res.status(400).send(error)
    };
};