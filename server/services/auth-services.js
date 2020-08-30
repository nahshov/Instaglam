const jwt = require('jsonwebtoken');
const { tokenSecret, refreshTokenSecret, cookieSecret } = require('../config/index');
const { setUserToken } = require('./user-services');

async function setAuthCookie(user) {
  const created = Date.now();
  const cookieToken = jwt.sign(
    {
      sub: user._id,
      email: user.email,
      created
    },
    cookieSecret,
    { expiresIn: '30d' }
  );

  await setUserToken(user, created);

  return { cookieToken };
}

function getTokens(user) {
  const created = new Date().toJSON();

  const accessToken = jwt.sign(
    {
      sub: user._id,
      email: user.email
    },
    tokenSecret,
    { expiresIn: '1h' }
  );

  const refreshToken = jwt.sign(
    {
      sub: user._id,
      email: user.email,
      created
    },
    refreshTokenSecret,
    { expiresIn: '30d' }
  );

  setUserToken(user, created);

  return {
    accessToken,
    refreshToken
  };
}

module.exports = {
  getTokens,
  setAuthCookie
};
