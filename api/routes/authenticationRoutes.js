const express = require('express');
const router = express.Router();
// const authenticationValidator = require('../validations/authenticationValidator');
// const loginValidator = require('../validations/authenticationValidator');
// const [authenticationValidator, loginValidator] = require('../validations/authenticationValidator');
const {createAccount,login} = require('../controller/authenticationController')

router.post('/signup', createAccount);
router.post('/login', login);

module.exports = router;