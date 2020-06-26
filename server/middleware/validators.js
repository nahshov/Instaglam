const { check } = require('express-validator');

const signupValidator = () => [
  check('email', 'Please include a valid email address').isEmail(),
  check(
    'password',
    'Please enter a password with 6 or more characters'
  ).isLength({ min: 6 }),
  check('fullName', 'Full name is required').not().isEmpty(),
  check('username', 'Username is required').not().isEmpty()
];

const loginValidator = () => [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').isLength({ min: 6 })
];

module.exports = {
  signupValidator,
  loginValidator
};
