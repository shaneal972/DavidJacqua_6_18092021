const { check, validationResult } = require("express-validator");

/**
 * Permet la validation d'un sauce niveau backend
 */
exports.saucesCheck = [
    check('name')
        .isLength({ min: 5 }).withMessage('name should be more than 5 characters'),
    check('manufacturer')
        .isLength({ min: 3 }).withMessage('manufacturer should be more than 5 characters'),
    check('description')
        .exists().withMessage("description should don't be empty"),
    check('mainPepper')
        .isLength({ min: 5 }).withMessage('mainPepper should be more than 5 characters'),
    check('heatValue')
        .isInt().withMessage('heatValue should be an integer')
],
(req, res, next) => {
    const errorValidation = validationResult(req);
    if (errorValidation.isEmpty()) {
        return res.status(500).json({
            title: 'an error occured',
            error: errorValidation.array()
        });
    }
    next()
};