const express = require('express');
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');
const sauceController = require('../controllers/sauce');
const validate = require('../middleware/validator/sauces');

const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const urlencodeParser = bodyParser.urlencoded({ extended: false });

router.post('/sauces',
    urlencodeParser,
    validate.saucesCheck,
    auth,
    multer,
    sauceController.createSauce
);
router.get('/sauces', auth, sauceController.getSauces);
router.get('/sauces/:id',
    auth,
    multer,
    sauceController.getOneSauce
);
router.post('/sauces/:id/like', auth, multer, sauceController.likeSauce);
router.put('/sauces/:id', auth, multer, sauceController.updateSauce);
router.delete('/sauces/:id', auth, multer, sauceController.deleteSauce);





module.exports = router;