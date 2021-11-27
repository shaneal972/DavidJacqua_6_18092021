const express = require('express');
const userController = require('../controllers/user');
const { check, validationResult } = require('express-validator');
const validator = require('../middleware/validator/user');

const router = express.Router();


router.post('/signup', validator.userSignUp, userController.signup);
router.post('/login', userController.login);
    


module.exports = router;