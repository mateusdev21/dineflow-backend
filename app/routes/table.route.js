module.exports = (app) => {
    const tables = require('../controllers/table.controller');
    const verifyToken = require('../middlewares/auth.middleware');
    const router = require('express').Router();

    router.route('/').get(verifyToken, tables.findAll);
    router.route('/:id').get(verifyToken, tables.findOne);
    router.route('/').post(verifyToken, tables.create);
    router.route('/:id').put(verifyToken, tables.update);

    app.use('/api/tables', router);
}