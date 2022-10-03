//Importação da instância do model das categorias
const category = require("../models").category;

class categoryController {

    // Controller de consulta de todas as categorias
    async index(request, response) {
        const categories = await category.findAll();

        if (categories.length === 0) 
            return response.status(404)
            .json({message: 'Não há categorias cadastradas.'})
        
        return response.status(200)
        .json(categories);
    }

    //Controller de consulta de categoria por ID
    async findByID (request, response) {
        const { id } = request.params;

        const categoryFiltred = await category.findByPk(id);

        if (!categoryFiltred) 
            return response.status(404)
            .json({message: 'Nenhuma categoria encontrada.'})

        return response.status(200)
        .json(categoryFiltred);
    }

    //Controller de armazenamento de categoria
    async store(request, response) {
        const { description } = request.body;

        if(!!!description) 
            return response.status(400)
            .json({ message: 'Alguns parâmetros estão ausentes.' })

        const newEdit = await category.create({ description });

        if (!newEdit) 
            return response.status(500)
            .json({ message: 'Falha ao cadastrar.' });

        return response.status(200)
        .json({ message: 'Cadastro realizado com sucesso!' });
    }

    //Controller de atualização de categoria
    async update(request, response) {
        const { id } = request.params;
        const { description } = request.body;

        const findCategory = await category.findByPk(id);

        if(!findCategory) return response.status(404)
        .json({ message: 'O ID informado não existe.' });

        if(!!!description) 
            return response.status(400)
            .json({ message: 'Alguns parâmetros estão ausentes.' });

        const categoryUpdated = await category.update(
            { description },
            { where: { id } }
        )

        if(!categoryUpdated) 
            return response.status(500)
            .json({ message: 'Falha ao atualizar.'});

        return response.status(200)
        .json({ message: 'Atualização realizada com sucesso!'})
    }

    //Controller de exclusão de categoria
    async delete(request, response) {
        const { id } = request.params;

        const findCategory = await category.findByPk(id);

        if(!findCategory) return response.status(404)
        .json({ message: 'O ID informado não existe.' });

        try {
            await category.destroy({
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

module.exports = new categoryController();