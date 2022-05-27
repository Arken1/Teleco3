const { Router } = require('express');
const router = new Router();
const _ = require('underscore');

const movies = require('../samplemovies.json');

router.get('/', (req, res) => {
    res.json(movies);
});
//Metodo para publicar
router.post('/', (req, res) => {
    const id = movies.length + 1;
    const { title, director, year, rating } = req.body;
    const newMovie = { ...req.body, id };
    if (title) {
        movies.push(newMovie);
        res.json(movies);
    } else {
        res.status(500).json({error: 'There was an error.'});
    }
});
//Metodo para actualizar
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { title, director, year, rating } = req.body;
    if (id && title && director && year && rating) {
        _.each(movies, (movie, i) => {
            if (movie.id === id) {
                movie.title = title;
                movie.director = director;
                movie.year = year;
                movie.rating = rating;
            }
        });
        res.json(movies);
    } else {
        res.status(500).json({error: 'There was an error.'});
    }
});
//Metodo para borar o eliminar 
router.delete('/:id', (req, res) => {
    const {id} = req.params;
    if (id) {
        _.each(movies, (movie, i) => {
            if (movie.id == id) {
                movies.splice(i, 1);
            }
        });
        res.json(movies);
    }
});

module.exports = router;