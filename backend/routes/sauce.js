const express = require('express');
const sauceController = require('../controllers/sauce');

const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const User = require('../models/User');


router.get('/sauces', auth, sauceController.getSauces);
router.get('/sauces/:id', auth, multer, sauceController.getOneSauce);
router.post('/sauces', auth, multer, sauceController.createSauce);
router.post('/sauces/:id/like', auth, multer, sauceController.likeSauce);
router.put('/sauces/:id', auth, multer, sauceController.updateSauce);
router.delete('/sauces/:id', auth, multer, sauceController.deleteSauce);





module.exports = router;