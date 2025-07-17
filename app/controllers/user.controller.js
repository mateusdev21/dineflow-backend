const db = require('../models/');
const User = db.users;

exports.findAll = (req, res) => {
    User.find()
        .then((result) => {
            res.status(200).json({ message: "User retrieved successfully", success: true, data: result });
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
            if (!result) {
                res.status(200).json({ message: "User not found", success: false });
            }
            const { password, ...userWithoutPassword } = result.toObject();
            res.status(200).json({ message: "User found", success: true, data: userWithoutPassword });
        }).catch((err) => {
            res.status(409).send({
                message: err.message || 'Some error while find users'
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    User.findOneAndUpdate(id, req.body)
        .then((result) => {
            result ? res.status(200).send({ message: "User was updated" }) : res.status(404).send({ message: "User not found" });
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