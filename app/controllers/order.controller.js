const db = require('../models');
const Order = db.orders;
const orderValidation = require('../validations/order.validation');

exports.create = (req, res) => {
    const { error } = orderValidation(req.body);
    if (error) return res.status(400).send({ message: `${error.details[0].context.label} is required !` });

    let order = new Order({
        customer_details: req.body.customer_details,
        order_status: req.body.order_status,
        order_date: req.body.order_date,
        billing: req.body.billing,
        items: req.body.items,
    });

    order.save(order)
        .then((result) => {
            res.status(201).json({ message: "Order created successfully", success: true, data: result });
        }).catch((err) => {
            res.status(409).send({
                message: err.message || 'Some error while create order'
            });
        });
};

exports.findAll = (req, res) => {
    Order.find()
        .then((result) => {
            res.status(200).json({ message: "Orders retrieved successfully", success: true, data: result });
        }).catch((err) => {
            res.status(500).send({
                message: err.message || 'Some error while retrieve orders'
            });
        });
};

exports.findOne = (req, res) => {
    let id = req.params.id;

    Order.findById(id)
        .then((result) => {
            if (!result) {
                res.status(200).json({ message: "Order not found", success: false });
            }
            res.status(200).json({ message: "Order found", success: true, data: result });
        }).catch((err) => {
            res.status(409).send({
                message: err.message || 'Some error while find order'
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Order.findOneAndUpdate(id, req.body)
        .then((result) => {
            result ? res.send({ message: "Order was updated" }) : res.status(404).send({ message: "Order not found" });
        }).catch((err) => {
            res.status(409).send({
                message: err.message || 'Some error while update order'
            });
        });
};

// exports.delete = (req, res) => {
//     const id = req.params.id;

//     Book.findByIdAndRemove(id)
//         .then((result) => {
//             result ? res.send({ message: "Book was deleted" }) : res.status(404).send({ message: "Book not found" });
//         }).catch((err) => {
//             res.status(409).send({
//                 message: err.message || 'Some error while delete books'
//             });
//         });
// };