const db = require('../models/');
const User = db.users;

exports.findAll = (req, res) => {
    User.find()
        .then((result) => {
            res.send(result);
        }).catch((err) => {
            res.status(500).send({
                message: err.message || 'Some error while retrieve users'
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    User.findById(id)
        .then((result) => {
            res.send(result);
        }).catch((err) => {
            res.status(409).send({
                message: err.message || 'Some error while find users'
            });
        });
};

exports.create = (req, res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password,
        level: req.body.level,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
    });

    user.save(user)
        .then((result) => {
            res.send(result);
        }).catch((err) => {
            res.status(409).send({
                message: err.message || 'Some error while create users'
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    User.findOneAndUpdate(id, req.body)
        .then((result) => {
            result ? res.send({ message: "User was updated" }) : res.status(404).send({ message: "User not found" });
        }).catch((err) => {
            res.status(409).send({
                message: err.message || 'Some error while update users'
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    User.findByIdAndRemove(id)
        .then((result) => {
            result ? res.send({ message: "User was deleted" }) : res.status(404).send({ message: "User not found" });
        }).catch((err) => {
            res.status(409).send({
                message: err.message || 'Some error while delete users'
            });
        });
};