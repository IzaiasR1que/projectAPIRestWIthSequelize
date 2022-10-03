//Importação da instância do model das editoras
const pubCompany = require("../models").publishingCompany;

class pubCompanyController {
    
    // Controller de consulta de todas as editoras
    async index(request, response) {
        const pubCompanies = await pubCompany.findAll();

        if (pubCompanies.length === 0) 
            return response.status(404)
            .json({message: 'Não há editoras cadastradas.'})
        
        return response.status(200)
        .json(pubCompanies);
    }

    //Controller de consulta de editora por ID
    async findByID (request, response) {
        const { id } = request.params;

        const pubCompanyFiltred = await pubCompany.findByPk(id);

        if (!pubCompanyFiltred) 
            return response.status(404)
            .json({message: 'Nenhuma editora encontrada.'})

        return response.status(200)
        .json(pubCompanyFiltred);
    }

    //Controller de armazenamento de editora
    async store(request, response) {
        const { description } = request.body;

        if(!!!description) 
            return response.status(400)
            .json({ message: 'Alguns parâmetros estão ausentes.' })

        const newEdit = await pubCompany.create({ description });

        if (!newEdit) 
            return response.status(500)
            .json({ message: 'Falha ao cadastrar.' });

        return response.status(200)
        .json({ message: 'Cadastro realizado com sucesso!' });
    }

    //Controller de atualização de editora
    async update(request, response) {
        const { id } = request.params;
        const { description } = request.body;

        const findPubCompany = await pubCompany.findByPk(id);

        if(!findPubCompany) return response.status(404)
        .json({ message: 'O ID informado não existe.' });

        if(!!!description)
            return response.status(400)
            .json({ message: 'Alguns parâmetros estão ausentes.' });

        const pubCompanyUpdated = await pubCompany.update(
            { description },
            { where: { id } }
        )

        if(!pubCompanyUpdated) 
            return response.status(500)
            .json({ message: 'Falha ao atualizar.'});

        return response.status(200)
        .json({ message: 'Atualização realizada com sucesso!'})
    }

    //Controller de exclusão de editora
    async delete(request, response) {
        const { id } = request.params;

        const findPubCompany = await pubCompany.findByPk(id);

        if(!findPubCompany) return response.status(404)
        .json({ message: 'O ID informado não existe.' });


        try {
            await pubCompany.destroy({
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

module.exports = new pubCompanyController();