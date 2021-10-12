const signin = require('./signin');
const signup = require('./signup');

module.exports = {
  createSigninValidator: signin,
  createSignupValidator: signup,
};
