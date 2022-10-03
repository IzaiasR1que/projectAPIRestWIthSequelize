const app = require('express')();
const bodyParser = require('body-parser');

const router = require('./routes')

const port = 3000;

app.use(bodyParser.json());

//Importação do roteador
app.use(router);

app.listen(port, () => console.log(`😎 Servidor rodando na porta ${port}!`))