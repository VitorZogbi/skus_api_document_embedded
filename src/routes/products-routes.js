const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products-controller');
const ProductValidation = require('../validation/products-validator');
const IdValidation = require('../validation/id-validation');

router.post('/', ProductValidation.productValidation(), productsController.createProduct);

router.put('/:id', IdValidation.validateId(), ProductValidation.productValidation(), productsController.updateProduct);

router.get('/', productsController.listProducts);

router.get('/findproductbyid', productsController.findProductById);

router.get('/:page', productsController.listProductsPaginated);

router.delete('/:id', IdValidation.validateId(), productsController.deleteProduct);

module.exports = router;