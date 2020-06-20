const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const { refreshTokenSecret } = require('../config');
const {
  verifyPassword,
  getUser,
  createUser
} = require('../services/user-services');
const getTokens = require('../services/auth-services');
const response = require('../utils/response');

const login = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return response(res, 400, { errors: errors.array() });

    const { email, password } = req.body || {};
    const user = await getUser(email);

    if (!(user && verifyPassword(user, password)))
      return response(res, 401, { message: 'Invalid credentials' });

    return response(res, 200, { payload: getTokens(user) });
  } catch (e) {
    return response(res, 500, {
      message: 'Internal server error when trying to login'
    });
  }
};

const register = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return response(res, 400, { errors: errors.array() });

    const user = await createUser(req.body);

    return response(res, 200, { payload: getTokens(user) });
  } catch (e) {
    return response(res, 500, {
      message: `internal error while trying to create user`
    });
  }
};

const logout = async (req, res) => {
  try {
    const user = await getUser(req.user.email);
    user.refreshTokenIdentifier = '';
    await user.save();

    return response(res, 200, { message: 'Succesfully logged out' });
  } catch (e) {
    return response(res, 500, {
      message: `internal error while trying to logout`
    });
  }
};

const refresh = async function (req, res) {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(' ')[1];
      let decoded;

      try {
        decoded = jwt.verify(token, refreshTokenSecret);
      } catch (e) {
        return response(res, 401, { message: 'Unauthorized' });
      }

      const { email, created } = decoded;

      const user = await getUser(email);

      if (created === user.refreshTokenIdentifier)
        return response(res, 200, { payload: getTokens(user) });
    }

    return response(res, 401, { message: 'Unauthorized' });
  } catch (e) {
    return response(res, 500, { message: 'Internal server error' });
  }
};

module.exports = {
  login,
  register,
  logout,
  refresh
};
