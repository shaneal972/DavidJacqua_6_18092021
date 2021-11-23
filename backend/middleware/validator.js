const { body, validationResults, validationResult } = require('express-validator');

exports.userValidate = () => {
    return [
        // L'email doit correspondre à un email valide
        body('email').isEmail(),
        // Le mot de passe (password) doit contenir au moins 8 caractères
        body('password').isLength({ min: 8 }),
    ]
}

exports.validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }

    const getErrors = [];
    errors.array().map(err => getErrors.push({ [err.param]: err.msg }));

    return res.status(422).json({ errors: getErrors });

}