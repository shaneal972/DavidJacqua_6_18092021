const express = require('express');
const bodyParser = require('body-parser');
const userController = require('../controllers/user');
const { check, validationResult } = require('express-validator');

const router = express.Router();
const urlencodeParser = bodyParser.urlencoded({ extended: false });


router.post('/signup',
    urlencodeParser,
    [
        check('email', "L'email n'est pas valide")
            .isEmail(),
        check('password', "Le mot de passe doit avoir au moins 5 caractères!")
            .isLength({ min: 5 })
        
    ], (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json(errors.array());
        } else {
            next();
        }
    },
    userController.signup
);
router.post('/login', userController.login);
    


module.exports = router;