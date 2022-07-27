module.exports = (app) => {
    const books = require('../controllers/book.controller');
    const router = require('express').Router();

    router.get('/', books.findAll);
    router.get('/:id', books.findOne);
    router.post('/', books.create);
    router.put('/:id', books.update);
    router.delete('/:id', books.delete);

    app.use('/api/books', router);
}