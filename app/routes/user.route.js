module.exports = (app) => {
    const users = require('../controllers/user.controller');
    const register = require('../controllers/register.controller');
    const login = require('../controllers/login.controller');
    const verifyToken = require('../middlewares/auth.middleware');
    const router = require('express').Router();

    router.route('/').get(verifyToken, users.findAll);
    router.route('/:id').get(verifyToken, users.findOne);
    router.route('/:id').put(verifyToken, users.update);
    router.route('/:id').delete(verifyToken, users.delete);

    router.route('/register').post(register);
    router.route('/login').post(login);

    app.use('/api/users', router);
}