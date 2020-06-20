const jwt = require('jsonwebtoken');
const { tokenSecret, refreshTokenSecret } = require('../config');

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

  user.refreshTokenIdentifier = created;
  user.save();
  return {
    accessToken,
    refreshToken
  };
}

module.exports = getTokens;
