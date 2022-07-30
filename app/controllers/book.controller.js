const db = require('../models/');
const Book = db.books;

exports.findAll = (req, res) => {
    Book.find()
        .then((result) => {
            res.send(result);
        }).catch((err) => {
            res.status(500).send({
                message: err.message || 'Some error while retrieve books'
            });
        });
};

exports.findOne = (req, res) => {
    let id = req.params.id;

    Book.findById(id)
        .then((result) => {
            res.send(result);
        }).catch((err) => {
            res.status(409).send({
                message: err.message || 'Some error while find books'
            });
        });
};

exports.create = (req, res) => {
    let book = new Book({
        kode: req.body.kode,
        judul: req.body.judul,
        penulis: req.body.penulis,
        penerbit: req.body.penerbit,
        rilis: req.body.rilis,
        kategori: req.body.kategori,
        sub_kategori: req.body.sub_kategori,
        bahasa: req.body.bahasa,
        halaman: req.body.halaman,
        stok: req.body.stok,
    });

    book.save(book)
        .then((result) => {
            res.send(result);
        }).catch((err) => {
            res.status(409).send({
                message: err.message || 'Some error while create books'
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Book.findOneAndUpdate(id, req.body)
        .then((result) => {
            result ? res.send({ message: "Book was updated" }) : res.status(404).send({ message: "Book not found" });
        }).catch((err) => {
            res.status(409).send({
                message: err.message || 'Some error while update book'
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Book.findByIdAndRemove(id)
        .then((result) => {
            result ? res.send({ message: "Book was deleted" }) : res.status(404).send({ message: "Book not found" });
        }).catch((err) => {
            res.status(409).send({
                message: err.message || 'Some error while delete books'
            });
        });
};