const { Router } = require('express');

const authorController = require('../controllers/authorController');

const authorRoute = Router();

authorRoute.get('/', authorController.index);
authorRoute.get('/:id', authorController.findByID);
authorRoute.post('/', authorController.store);
authorRoute.put('/:id', authorController.update);
authorRoute.delete('/:id', authorController.delete);

module.exports = authorRoute;