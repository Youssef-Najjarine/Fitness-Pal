const jwt = require('jsonwebtoken');

function authorizationMiddleware(req, res, next) {
  const xAccessToken = req.headers['x-access-token'];
  if (!xAccessToken) {
    return next();
  }
  const payload = jwt.verify(xAccessToken, process.env.TOKEN_SECRET);
  req.user = payload;
  next();
}

module.exports = authorizationMiddleware;
