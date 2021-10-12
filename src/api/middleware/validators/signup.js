const { body } = require('express-validator');
const { doesUsernameExist } = require('../../../data-access');

function createSignUpValidator() {
  const PASSWORD_REGEX = new RegExp(
    '^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[#?!@$%^&*\\-_]).{8,}$'
  );

  return [
    body('username', 'username is required').exists(),
    body('username', 'username must be at least 5 characters')
      .isLength({
        min: 5,
      })
      .trim()
      .escape(),
    body('username').custom(_isUsernameAvailable),
    body('password', 'password is required').exists(),
    body(
      'password',
      'password must be at least 8 characters and include at least 1 upper case letter, 1 number and one special character'
    )
      .isLength({
        min: 8,
      })
      .bail()
      .matches(PASSWORD_REGEX),
  ];
}

async function _isUsernameAvailable(value) {
  const usernameExists = await doesUsernameExist(value);

  if (usernameExists) {
    throw Error('Username already in use');
  }

  return true;
}

module.exports = createSignUpValidator;
