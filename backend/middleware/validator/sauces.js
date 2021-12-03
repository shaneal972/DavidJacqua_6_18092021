const { body, validationResult } = require("express-validator");


exports.saucesCheck = [
    body('name')
        .exists()
        .isLength({ min: 5 }).withMessage('name should not be empty, should be more than 3 character'),
    function (req, res, next) {
        console.log('test');
        const errorValidation = validationResult(req);
        if (errorValidation.isEmpty()) {
            return res.status(500).json({
                title: 'an error occured',
                error: errorValidation.array()
            });
        }
        next()
    }
];