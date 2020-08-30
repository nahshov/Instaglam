const jwt = require('jsonwebtoken');
const { tokenSecret, cookieSecret } = require('../config/index');
const { setAuthCookie } = require('../services/auth-services');
const { verifyToken } = require('../services/user-services');

const TEN_MINUTES = 1000 * 60 * 10;

async function verifyUser(req, res, next) {
  try {
    if (req.cookies.token) {
      const decoded = jwt.verify(req.cookies.token, cookieSecret);
      if (Date.now() - new Date(decoded.created) > TEN_MINUTES) {
        const user = await verifyToken(decoded);
        const { cookieToken } = await setAuthCookie(user);
        res.cookie('token', cookieToken, {
          httpOnly: true,
          maxAge: 60 * 60 * 24 * 30
        });
        next();
      } else {
        req.user = decoded;
        next();
      }
    } else if (req.headers.authorization) {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = await jwt.verify(token, tokenSecret);
      req.user = decoded;
      next();
    } else {
      throw new Error('Invalid token');
    }
  } catch (e) {
    return res.status(401).json({ message: 'you are not authorized' }).end();
  }
}

module.exports = verifyUser;
