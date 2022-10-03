const { Router } = require('express');

const pubCompanyController = require('../controllers/pubCompanyController');

const pubCompanyRoute = Router();

pubCompanyRoute.get('/', pubCompanyController.index);
pubCompanyRoute.get('/:id', pubCompanyController.findByID);
pubCompanyRoute.post('/', pubCompanyController.store);
pubCompanyRoute.put('/:id', pubCompanyController.update);
pubCompanyRoute.delete('/:id', pubCompanyController.delete);

module.exports = pubCompanyRoute;