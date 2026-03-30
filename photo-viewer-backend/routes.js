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
const getPhoto = require('./api/photo/getPhoto');
const getAllPhotos = require('./api/photo/getAllPhotos');

const crypto = require('crypto');

// Multipart form data helper
// Used for uploading photos
const multer = require('multer');
const deletePhoto = require('./api/photo/deletePhoto');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    // Get the original extension
    let extHelper = file.originalname.split('.');
    let extension = extHelper[extHelper.length - 1];

    // Generate a unique name for the file
    let base = file.originalname + "-" + Date.now();

    let hashed = crypto.hash("sha1", base);
    cb(null, hashed + "." + extension);
  }

});

const upload = multer({storage: storage});

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

router.post('/api/photo', tokenFunctions.requireAuth, upload.single('photo'), postPhoto);
router.get('/api/photo/all', getAllPhotos);
router.get('/api/photo/:photoId', getPhoto);
router.delete('/api/photo/:photoId', tokenFunctions.requireAuth, deletePhoto);