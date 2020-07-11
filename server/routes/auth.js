const verifyUser = require('../middleware/verifyUser');
const { signupValidator, loginValidator } = require('../middleware/validators');
const {
  login, register, logout, refresh
} = require('../controllers/auth');

module.exports = app => {
  app
    .post('/api/login', loginValidator(), login)
    .post('/api/register', signupValidator(), register)
    .post('/api/logout', verifyUser, logout)
    .post('/api/token/refresh', refresh);
};
