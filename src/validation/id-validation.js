const { check } = require('express-validator');

class IdValidator {

    static validateId() {

        return[
            check('id').isLength({min: 24, max: 24}).withMessage("Id precisa ter 24 caracteres")
        ]
    }    
}

module.exports = IdValidator;
