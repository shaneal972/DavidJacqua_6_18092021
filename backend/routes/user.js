import express from 'express';
import userController from '../controllers/user';

const router = express.Router();
// const userController = require('../controllers/user');





router.post('/', userController.createUser);



module.exports = router;