const { body } = require('express-validator');

function createSignInValidator() {
  return [
    body('username', 'username is required').exists(),
    body('password', 'password is required').exists(),
  ];
}

module.exports = createSignInValidator;
