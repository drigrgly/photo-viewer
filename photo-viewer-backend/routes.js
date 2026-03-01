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
const refreshToken = require('./api/auth/refreshToken');
const getIsAuthenticated = require('./api/auth/getIsAuthenticated');
const postPhoto = require('./api/photo/postPhoto');

module.exports = router;

// auth
router.get('/auth/valid',
  tokenFunctions.checkUserAuth,
  getValid,
);

router.post('/auth/register', postRegister);

router.post('/auth/login', postLogin);
router.get('/auth/refresh-token', refreshToken);
router.get('/auth/is-authenticated', tokenFunctions.requireAuth, getIsAuthenticated);

router.get('/auth/logout',
  tokenFunctions.requireAuth,
  getLogout
);

router.post('/api/photo', tokenFunctions.requireAuth, postPhoto)