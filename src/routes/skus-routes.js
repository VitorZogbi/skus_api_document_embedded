const express = require('express');
const router = express.Router();
const skusController = require('../controllers/skus-controller');
const SkuValidation = require('../validation/skus-validator');
const IdValidation = require('../validation/id-validation');

router.post('/:id', IdValidation.validateId(), SkuValidation.skuValidation(), skusController.createSku);

router.put('/:id', IdValidation.validateId(), SkuValidation.skuValidation(), skusController.updateSku);

router.delete('/:id', IdValidation.validateId(), skusController.deleteSku);

module.exports = router;