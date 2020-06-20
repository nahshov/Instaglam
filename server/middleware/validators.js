const { check } = require('express-validator');

const signupValidator = () => [
  check('email', 'Please include a valid email address').isEmail(),
  check('email', 'Email is already used').exists(),
  check(
    'password',
    'Please enter a password with 6 or more characters'
  ).isLength({ min: 6 }),
  check('fullName', 'Full name is required').not().isEmpty(),
  check('userName', 'Username is required').not().isEmpty(),
  check('userName', 'Username already exists').exists()
];

const loginValidator = () => [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists()
];

module.exports = {
  signupValidator,
  loginValidator
};
