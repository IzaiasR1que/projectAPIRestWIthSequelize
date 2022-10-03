module.exports = function validateRequest(requestProperties, targetProperties) {
    if (typeof requestProperties !== "object" || typeof targetProperties !== "object")
        throw new Error('Os parâmetros informados não são de um tipo válido.')

    for (let i = 0; i < targetProperties.length; i++) {
        //Array contendo as chaves das propriedades recebidas pela requisição
        const objKeys = Object.keys(requestProperties);

        //Array contendo os valores das propriedades recebidas pela requisição
        const objValues = Object.values(requestProperties);

        //Retorna o index da chave do objeto que seja igual ao valor da atual posição do index no targetProperties
        const findIndex = objKeys.indexOf(targetProperties[i]);

        if (findIndex === -1 || !!!objValues[i]) 
            return false
    }
    return true
}