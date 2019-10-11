const { validationResult } = require('express-validator');
const repository = require('../repositories/products-repository');

exports.createProduct = async (req, res) => {

    const {errors} = validationResult(req);

    if (errors.length > 0) return res.status(422).send({ message: "Erro com os dados do produto", errors });

    await repository.createProduct(req.body, (error, result) => {
        if (result) return res.status(201).send(result);
        return res.status(404).send({ erro: "Produto não criado", error })
            
    }).catch(error => { res.status(500).send({ message: 'Falha ao criar o produto', error });});
}

exports.listProducts = async (req, res) => {

    if (req.get("page")) {
        await repository.listProductsPaginated(req.get("page"), (error, result) => {
            if (result.docs.length === 0) return res.status(206).send({ message: "Nenhum Produto encontrado", result });
            if (error) return res.status(500).send({ messsage: 'Falha ao carregar os produtos', erro: error.message });
            return res.status(200).send({
                message: "Produto(s) encontrado(s)", result
            })
        }).catch(err => {
            throw new Error(err);
        });;
    }

    try {
        const data = await repository.listProduct();
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({ message: 'Falha ao carregar os produtos', e });
    }
}

// exports.listProducts = async (req, res) => {
    
//     try {
//         const data = await repository.listProduct();
//         res.status(200).send(data);
//     } catch (e) {
//         res.status(500).send({ message: 'Falha ao carregar os produtos', e });
//     }
// }

// exports.listProductsPaginated = async (req, res) => {
    
//     await repository.listProductsPaginated(req.params.page, (error, result) => {
//         if (result.docs.length === 0) return res.status(206).send({ message: "Nenhum Produto encontrado", result });
//         if (error) return res.status(500).send({ messsage: 'Falha ao carregar os produtos', erro: error.message });
//         return res.status(200).send({
//             message: "Produto(s) encontrado(s)", result
//         })
//     }).catch(err => {
//         throw new Error(err);
//     });;
// };

exports.findProductById = async (req, res) => {

    const {errors} = validationResult(req);

    if (errors.length > 0) return res.status(422).send({ message: errors });
    
    await repository.findProductById(req.params.id, (errors, result) => {

        if(result) return res.status(200).send(result);
        return res.status(404).send({ erro: "Produto não encontrado", errors })
    }).catch(error => { res.status(500).send({ message: 'Falha ao encontrar o produto', error})})
} 

exports.updateProduct = async (req, res) => {

    const { errors } = validationResult(req);

    if (errors.length > 0) return res.status(422).send({ message: errors });

    await repository.updateProduct(req.params.id, req.body, (errors, result) => {

        if (result) return res.status(200).send(result);
        return res.status(404).send({ erro: "Produto não atualizado", errors })
    }).catch(error => { res.status(500).send({ message: 'Falha ao atualizar o produto', error })});

}

exports.deleteProduct = async (req, res) => {

    const { errors } = validationResult(req);

    if (errors.length > 0) return res.status(422).send({ message: errors });

    await repository.deleteProduct(req.params.id, (errors, result) => {

        if (result) return res.status(200).send(result);
        return res.status(404).send({ erro: "Produto não apagado", errors })
    }).catch(error => { res.status(500).send({ message: 'Falha ao encontrar o produto', error }) })
}