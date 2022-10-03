const { Router } = require('express');

//Importação das rotas principais
const pubCompanyRoute = require('./pubcompany.routes')
const categoryRoute = require('./category.routes');
const authorRoute = require('./author.routes');
const bookRoute = require('./book.routes');

//Criando a instância do roteador
const router = Router();

//Atribuindo o caminho das rotas principais
router.use('/pubcompany', pubCompanyRoute);
router.use('/category', categoryRoute);
router.use('/author', authorRoute);
router.use('/book', bookRoute);

module.exports = router;