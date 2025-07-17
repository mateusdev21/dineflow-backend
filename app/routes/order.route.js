module.exports = (app) => {
    const orders = require('../controllers/order.controller');
    const router = require('express').Router();
    const verifyToken = require('../middlewares/auth.middleware');

    router.route('/').get(verifyToken, orders.findAll);
    router.route('/:id').get(verifyToken, orders.findOne);
    router.route('/').post(verifyToken, orders.create);
    router.route('/:id').put(verifyToken, orders.update);

    app.use('/api/orders', router);
}