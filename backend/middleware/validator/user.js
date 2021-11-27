const { check } = require("express-validator");


exports.userSignUp = [
    check('email').isEmail(),
    check('password').isLength({min: 5})
];