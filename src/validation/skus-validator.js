const { check } = require('express-validator');

class Sku {

    static isNumber(n) {
        return isNaN(+(n));
    }

    static skuValidation() {
        return [

            check('color').trim().isLength({ min: 1 }).withMessage("Tamanho não pode ter menos que 1 caractere"),
            check('size').trim().isLength({ min: 1 }).withMessage("Tamanho não pode ter menos que 1 caractere"),

            check('price').isFloat({ gt: 0.0 }).withMessage('Preço tem que ser maior que 0').isDecimal({ decimal_digits: '1,2' }).withMessage("Somente são aceitos números com dois digitos após a vírgula"),
            check('stockLevel').isInt({ gt: -1 }).withMessage('São aceitos somente valores inteiros positivos'),
        ]
    }
}

module.exports = Sku;