const { validationResult } = require('express-validator');
const repository = require('../repositories/skus-repository');

exports.createSku = async (req, res) => {

    const { errors } = validationResult(req);

    if (errors.length > 0) return res.status(422).send({ message: errors });

    await repository.createSku(req.params.id, req.body, (error, result) => {

        if (result) return res.status(201).send(result);
        return res.status(404).send({ erro: "Sku não criada", error })

    }).catch(error => { res.status(500).send({ message: 'Falha ao criar a sku', error }) });

}

exports.updateSku = async (req, res) => {

    const { errors } = validationResult(req);

    if (errors.length > 0) return res.status(422).send({ message: errors });

    await repository.updateSku(req.params.id, req.body, (errors, result) => {

        if (result) return res.status(200).send(result);
        return res.status(404).send({ erro: "Sku não atualizada", errors })
    }).catch(error => { res.status(500).send({ message: 'Falha ao atualizar a sku', error }) })

}

exports.deleteSku = async (req, res) => {

    const { errors } = validationResult(req);

    if (errors.length > 0) return res.status(422).send({ message: errors });

    await repository.deleteSku(req.params.id, (errors, result) => {

        if (result) return res.status(200).send(result);
        return res.status(404).send({ erro: "Sku não apagada", errors })
    }).catch(error => { res.status(500).send({ message: 'Falha ao encontrar a sku', error }) })
}