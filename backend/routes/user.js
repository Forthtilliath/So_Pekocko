const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const validPassword = require('../middleware/validatorPassword');
const emailValidator = require('../middleware/validatorEmail');

router.post('/signup', emailValidator, validPassword, userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;
