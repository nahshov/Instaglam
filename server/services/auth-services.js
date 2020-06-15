const jwt = require('jsonwebtoken');
const { tokenSecret } = require('../config');

module.exports = async function verifyUser(req, res, next) {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1];

    try {
      const decoded = await jwt.verify(token, tokenSecret);
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({ message: 'you are not authorized' }).end();
    }
  } else {
    return res.status(401).json({ message: 'you are not authorized' }).end();
  }
};
