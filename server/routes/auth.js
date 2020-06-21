const { setUserToken } = require('../services/user-services');
const jwt = require('jsonwebtoken');
const { tokenSecret, refreshTokenSecret } = require('../config');
const {
  verifyPassword,
  getUser,
  createUser
} = require('../services/user-services');

const { verifyUser } = require('../services/auth-services');

function getTokens(user) {
  const created = new Date().toJSON();
  //jwt.sign creates a jwt token
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
    access_token: accessToken,
    refresh_token: refreshToken
  };
}

module.exports = function (app) {
  app.post('/api/login', async function (req, res) {
    const { email, password } = req.body || {};

    try {
      const user = await getUser(email);
      if (!(user && verifyPassword(user, password))) {
        res.status(401).json({ message: 'Invalid email or password' }).end();
      }
      res
        .status(200)
        .json({ payload: getTokens(user) })
        .end();
    } catch (e) {
      res
        .status(500)
        .json({ message: 'Internal server error when trying to login' })
        .end();
    }
  });

  app.post('/api/register', async (req, res) => {
    if (!req.body) {
      return res.status(400).json({ message: `request is invalid` }).end();
    }

    try {
      const user = await createUser(req.body);
      res
        .status(200)
        .json({ payload: getTokens(user) })
        .end();
    } catch (e) {
      res
        .status(500)
        .json({ message: `internal error while trying to create user` })
        .end();
    }
  });

  app.post('/api/logout', verifyUser, async (req, res) => {
    try {
      const user = await getUser(req.user.email);
      user.refreshTokenIdentifier = '';
      user.save();
      res.status(200).json({ message: 'Succesfully logged out' }).end();
    } catch (error) {
      res
        .status(500)
        .json({ message: `internal error while trying to logout` })
        .end();
    }
  });

  app.post('/api/token/refresh', async function (req, res) {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(' ')[1];

      try {
        const { email, created } = await jwt.verify(token, refreshTokenSecret);
        const user = await getUser(email);
        if (created === user.refreshTokenIdentifier) {
          res
            .status(200)
            .json({ payload: getTokens(user) })
            .end();
        }
      } catch (e) {
        res.status(500).json({ message: 'Internal server error' }).end();
      }
    }
    res.status(401).json({ message: 'Unauthorized' }).end();
  });
};
