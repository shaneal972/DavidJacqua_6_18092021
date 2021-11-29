const express = require('express');
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');
const sauceController = require('../controllers/sauce');

const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const urlencodeParser = bodyParser.urlencoded({ extended: false });

router.get('/sauces', auth, sauceController.getSauces);
router.get('/sauces/:id', auth, multer, sauceController.getOneSauce);
router.post('/sauces',
    urlencodeParser,
    auth,
    [
        check('name', "Le nom de la sauce doit être supérieure à 3 caractères et doit être une string")
            .isString()
            .isLength({ min: 3 }),
        check('manufacturer', "Le fabriquant de la sauce doit être supérieure à 3 caractères et doit être une string")
            .isString()
            .isLength({ min: 3 }),
        check('description', "La description de la sauce doit être supérieure à 3 caractères et doit être une string")
            .isString()
            .isLength({ min: 3 }),
        check('mainPepper', "L'épice principal de la sauce doit être supérieure à 3 caractères et doit être une string")
            .isString()
            .isLength({ min: 3 }),
        check('heat', "La force de la sauce doit être un int")
            .isInt(),
        check('like', "Le like d'une sauce doit être un int")
            .isInt(),
        check('dislike', "Le dislike d'une sauce doit être un int")
            .isInt(),
    ],(req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).jsonp(errors.array());
        } else {
            next();
        }
    },
    multer,
    sauceController.createSauce
);
router.post('/sauces/:id/like', auth, multer, sauceController.likeSauce);
router.put('/sauces/:id', auth, multer, sauceController.updateSauce);
router.delete('/sauces/:id', auth, multer, sauceController.deleteSauce);





module.exports = router;