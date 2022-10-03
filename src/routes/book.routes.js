const { Router } = require('express');

const bookController = require('../controllers/bookController');

const bookRoute = Router();

bookRoute.get('/', bookController.index);
bookRoute.get('/:id', bookController.findByID);
bookRoute.post('/', bookController.store);
bookRoute.put('/:id', bookController.update);
bookRoute.delete('/:id', bookController.delete);

module.exports = bookRoute;