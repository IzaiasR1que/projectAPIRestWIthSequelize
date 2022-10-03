const { Router } = require('express');

//Importação do controller da subrota
const categoryController = require('../controllers/categoryController');

//Criando instância da subrota
const categoryRoute = Router();

//Atribuindo o caminho das subrotas
categoryRoute.get('/', categoryController.index);
categoryRoute.get('/:id', categoryController.findByID);
categoryRoute.post('/', categoryController.store);
categoryRoute.put('/:id', categoryController.update);
categoryRoute.delete('/:id', categoryController.delete);

module.exports = categoryRoute;