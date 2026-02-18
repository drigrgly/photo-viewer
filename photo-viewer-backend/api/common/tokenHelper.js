const jwt = require('jsonwebtoken');

const TokenType = {
  REFRESH: 0,
  ACCESS: 1
}

let dummyError = {
  status: -1,
  message: ''
}

exports.redirectOnAuth = function(redirectPath) {
  return function (req, res, next) {
    exports.checkUserAuth(req, res, function() {
      if (!res.locals.isAuthenticated)
        return next();
      
      res.redirect(redirectPath);
    });
  }
}

exports.redirectOnNoAuth = function(redirectPath) {
  return function (req, res, next) {
    exports.checkUserAuth(req, res, function() {
      if (res.locals.isAuthenticated)
        return next();
      
      res.redirect(redirectPath);
    });
  }
}

exports.requireAuth = function (req, res, next) {
  exports.checkUserAuth(req, res, function () {
    if (res.locals.isAuthenticated)
      return next();
    else {
      res.status(401).send('Authentication token is invalid');
      return next(error);
    }
  });
}

exports.requireRefreshToken = function(req, res, next) {
  let authObject = exports.checkTokenAuth(req, TokenType.REFRESH);

  console.log(authObject);

  if(!authObject.isAuthenticated || authObject.user == null)
    res.status(401).send({message: 'Refresh token is invalid'});
  else {
    res.locals.isAuthenticated = authObject.isAuthenticated;
    res.locals.user = authObject.user;
    next();
  }
}

exports.checkUserAuth = function(req, res, next) {
  res.locals.isAuthenticated = false;

  let authObject = exports.checkTokenAuth(req, TokenType.ACCESS);

  if(!authObject.isAuthenticated || authObject.user == null)
    next()
  else {
    res.locals.isAuthenticated = authObject.isAuthenticated;
    res.locals.user = authObject.user;
    next();
  }
}

exports.checkTokenAuth = function(req, tokenType) {
  let authObject = {
    isAuthenticated: false,
    user: null
  }

  //Get the accessToken from the cookie
  let token;
  if (tokenType == TokenType.ACCESS)
    token = req.cookies.accessToken
  else 
    token = req.cookies.refreshToken

  if (!token) return authObject;

  // Check if token is valid and not expired
  return checkToken(token, tokenType);
}

// Check if the token is correct
checkToken = function (token, tokenType) {
  let authObject;
  const secret = tokenType == TokenType.ACCESS ? process.env.JWT_TOKEN_SECRET : process.env.JWT_REFRESH_TOKEN_SECRET;
  console.log(secret);
  jwt.verify(token, secret, (err, user) => {
    if(err) authObject =  {isAuthenticated: false, user: null} 
    else authObject = {isAuthenticated: true, user: user}
  });

  return authObject;
}