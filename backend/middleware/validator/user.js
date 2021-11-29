const { check, validationResult } = require("express-validator");


exports.userSignUp = [
        check('email', "L'email n'est pas valide")
            .isEmail(),
        check('password', "Le mot de passe doit avoir au moins 5 caractères!")
            .isLength({ min: 5 })
        
    ], (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).jsonp(errors.array());
        } else {
            next();
        }
    }