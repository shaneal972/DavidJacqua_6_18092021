const express = require('express');
const userController = require('../controllers/user');
const { userValidate, validate } = require('../middleware/validator');

const router = express.Router();


router.post('/signup', userController.signup);
router.post('/login', userController.login);


module.exports = router;