//Importação da instância do model das livros
const book = require("../models").book;

//Importação do método de validação das requisições
const validateRequest = require("../utils/validateRequest");

class bookController {

    // Controller de consulta de todos os livros
    async index(request, response) {
        const books = await book.findAll();

        if (books.length === 0) 
            return response.status(404)
            .json({message: 'Não há livros cadastrados.'})
        
        return response.status(200)
        .json(books);
    }

    //Controller de consulta de livro por ID
    async findByID (request, response) {
        const { id } = request.params;

        const bookFiltred = await book.findByPk(id);

        if (!bookFiltred) 
            return response.status(404)
            .json({message: 'Nenhum livro encontrado.'})

        return response.status(200)
        .json(bookFiltred);
    }

    //Controller de armazenamento de livro
    async store(request, response) {
        const { title, authorID, categoryID, pubCompanyID } = request.body;

        try {
            //Array para especificar quais propriedades são obrigatórias na validação
            const propertyArr = ['title', 'authorID', 'categoryID', 'pubCompanyID']

            //Validação das propriedades recebidas pela requisição
            if(!validateRequest(request.body, propertyArr))
                throw new Error("Alguns parâmetros estão ausentes ou incorretos.");

            await book.create({
                title,
                fk_publishingCompany: pubCompanyID,
                fk_author: authorID,
                fk_category: categoryID
            });
        } catch (e) {
            if(e.message === "Alguns parâmetros estão ausentes.")
                return response.status(400).json({ message: `${e.message} Propriedades obrigatórias: title, categoryID, authorID, pubCompanyID`})

            return response.status(500)
            .json({ 
                message: 'Falha ao cadastrar, verifique se as propriedades foram inseridas corretamente ' +
                'ou se as IDs existem no banco de dados.'});
        } 
        return response.status(200)
        .json({ message: 'Cadastro realizado com sucesso!' });
    }

    //Controller de atualização de livro
    async update(request, response) {
        const { id } = request.params;
        const { title, authorID, categoryID, pubCompanyID} = request.body;

        const findBook = await book.findByPk(id);

        if(!findBook) return response.status(404)
        .json({ message: 'O ID informado não existe.' });

        try {
            //Array para especificar quais propriedades são obrigatórias na validação
            const propertyArr = ['title', 'authorID', 'categoryID', 'pubCompanyID']

            //Validação das propriedades recebidas pela requisição
            if(!validateRequest(request.body, propertyArr))
                throw new Error("Alguns parâmetros estão ausentes ou incorretos.");

            await book.update({ 
                title, 
                fk_publishingCompany: pubCompanyID,
                fk_author: authorID,
                fk_category: categoryID,
            },{ where: { id } });
        } catch (e) {
            if(e.message === "Alguns parâmetros estão ausentes.")
                return response.status(400).json({ message: `${e.message} Propriedades obrigatórias: title, categoryID, authorID, pubCompanyID`})

            return response.status(500)
            .json({ 
                message: 'Falha ao cadastrar, verifique se as propriedades foram inseridas corretamente ' +
                'ou se as IDs existem no banco de dados.'});
        } 
        return response.status(200)
        .json({ message: 'Atualização realizada com sucesso!'})
    }

    //Controller de exclusão de livro
    async delete(request, response) {
        const { id } = request.params;

        const findBook = await book.findByPk(id);

        if(!findBook) return response.status(404)
        .json({ message: 'O ID informado não existe.' });

        try {
            await book.destroy({
                where: { id }
            })
        } catch {
            return response.status(500)
            .json({ message: 'Não foi possível realizar a exclusão.' });
        }

        return response.status(200)
        .json({ message: 'Exclusão realizada com sucesso!' });
    }
}

module.exports = new bookController();