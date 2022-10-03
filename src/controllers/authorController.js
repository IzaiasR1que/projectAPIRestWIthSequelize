//Importação da instância do model das autores
const author = require("../models").author;

class authorController {

    // Controller de consulta de todos os autores
    async index(request, response) {
        const authors = await author.findAll();

        if (authors.length === 0) 
            return response.status(404)
            .json({message: 'Não há autores cadastrados.'})
        
        return response.status(200)
        .json(authors);
    }

    //Controller de consulta de autor por ID
    async findByID (request, response) {
        const { id } = request.params;

        const authorFiltred = await author.findByPk(id);

        if (!authorFiltred) 
            return response.status(404)
            .json({message: 'Nenhum autor encontrado.'})

        return response.status(200)
        .json(authorFiltred);
    }

    //Controller de armazenamento de autor
    async store(request, response) {
        const { name } = request.body;

        if(!!!name) 
            return response.status(400)
            .json({ message: 'Alguns parâmetros estão ausentes.' })

        const newEdit = await author.create({ name });

        if (!newEdit) 
            return response.status(500)
            .json({ message: 'Falha ao cadastrar.' });

        return response.status(200)
        .json({ message: 'Cadastro realizado com sucesso!' });
    }

    //Controller de atualização de autor
    async update(request, response) {
        const { id } = request.params;
        const { name } = request.body;

        const findAuthor = await author.findByPk(id);

        if(!findAuthor) return response.status(404)
        .json({ message: 'O ID informado não existe.' });

        if(!!!name) 
            return response.status(400)
            .json({ message: 'Alguns parâmetros estão ausentes.' });

        const authorUpdated = await author.update(
            { name },
            { where: { id } }
        )

        if(!authorUpdated) 
            return response.status(500)
            .json({ message: 'Falha ao atualizar.'});

        return response.status(200)
        .json({ message: 'Atualização realizada com sucesso!'})
    }

    //Controller de exclusão de autor
    async delete(request, response) {
        const { id } = request.params;

        const findAuthor = await author.findByPk(id);

        if(!findAuthor) return response.status(404)
        .json({ message: 'O ID informado não existe.' });

        try {
            await author.destroy({
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

module.exports = new authorController();