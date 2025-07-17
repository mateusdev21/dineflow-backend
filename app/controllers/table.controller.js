const db = require('../models/');
const tableValidation = require('../validations/table.validation');
const Table = db.tables;

exports.create = (req, res) => {
    const { error } = tableValidation(req.body);
    if (error) return res.status(400).send({ message: `${error.details[0].context.label} is required !` });

    let table = new Table({
        table_number: req.body.table_number,
        capacity: req.body.capacity,
        avability: req.body.avability,
    });

    table.save(table)
        .then((result) => {
            res.status(201).json({ message: "Table created successfully", success: true, data: result });
        }).catch((err) => {
            res.status(409).send({
                message: err.message || 'Some error while create table'
            });
        });
};

exports.findAll = (req, res) => {
    Table.find()
        .then((result) => {
            res.status(200).json({ message: "Tables retrieved successfully", success: true, data: result });
        }).catch((err) => {
            res.status(500).send({
                message: err.message || 'Some error while retrieve tables'
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Table.findById(id)
        .then((result) => {
            if (!result) {
                res.status(200).json({ message: "Table not found", success: false });
            }
            res.status(200).json({ message: "Table found", success: true, data: result });
        }).catch((err) => {
            res.status(409).send({
                message: err.message || 'Some error while find table'
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    // Validate the ID
    if (!db.mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ message: "Invalid Table ID" });
    }

    const { avability, orderId } = req.body;

    Table.findOneAndUpdate(id, { avability, current_order: orderId }, { new: true })
        .then((result) => {
            result ? res.status(200).send({ message: "Table was updated" }) : res.status(404).send({ message: "Table not found" });
        }).catch((err) => {
            res.status(409).send({
                message: err.message || 'Some error while update users'
            });
        });
};