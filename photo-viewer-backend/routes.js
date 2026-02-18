require('dotenv').config()

const express = require('express');
const router = express.Router();

// common
const tokenFunctions = require('./api/common/tokenHelper')

// auth
const postLogin = require('./api/auth/postLogin');
const postRegister = require('./api/auth/postRegister');
const getValid = require('./api/auth/getValid');
const getLogout = require('./api/auth/getLogout');

module.exports = router;

// auth
router.get('/auth/valid',
  tokenFunctions.checkUserAuth,
  getValid,
);

router.post('/auth/register', postRegister);

router.post('/auth/login', postLogin);

router.get('/auth/logout',
  tokenFunctions.requireAuth,
  getLogout
);