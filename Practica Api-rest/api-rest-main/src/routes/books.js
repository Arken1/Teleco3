const { Router } = require('express');
const router = new Router();
const _ = require('underscore');

const books = require('../sampleBooks.json');

router.get('/', (req, res) => {
    res.json(books);
});

router.post('/', (req, res) => {
    const id = `${books.length + 1}`;
    const { title, author, description } = req.body;
    const newMovie = { id,...req.body };
    if (id && title && author && description) {
        books.push(newMovie);
        res.json(books);
    } else {
        res.status(500).json({error: 'There was an error.'});
    }
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { title, author, description } = req.body;
    if (id && title && author && description) {
        _.each(books, (book, i) => {
            if (book.id === id) {
                book.title = title;
                book.author = author;
                book.description = description;
            }
        });
        res.json(books);
    } else {
        res.status(500).json({error: 'Aqui tenemos un error grave.'});
    }
});

router.delete('/:id', (req, res) => {
    const {id} = req.params;
    if (id) {
        _.each(books, (book, i) => {
            if (book.id == id) {
                books.splice(i, 1);
            }
        });
        res.json(books);
    }
});

module.exports = router;