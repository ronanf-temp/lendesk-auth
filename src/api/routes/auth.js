const { Router } = require('express');
const { getValidationRules, validate } = require('../middleware');
const { userService } = require('../../services');
const { formatResponse } = require('../../utils');

const route = Router();

module.exports = (app) => {
  app.use('/auth', route);

  route.post('/signup', getValidationRules('signup'), validate, handleSignup);
  route.post('/signin', getValidationRules('signin'), validate, handleSignin);
};

async function handleSignup(req, res) {
  const { username, password } = req.body;
  try {
    const user = await userService.signup(username, password);

    return formatResponse({
      res,
      status: 200,
      data: user,
    });
  } catch (e) {
    console.error(e);
    return formatResponse({
      res,
      status: 500,
      errors: ['Something went wrong'],
    });
  }
}

async function handleSignin(req, res) {
  const { username, password } = req.body;
  try {
    const couldSignIn = await userService.signin(username, password);

    if (couldSignIn) {
      return formatResponse({
        res,
        status: 200,
        data: 'Successfully signed in',
      });
    }

    return formatResponse({
      res,
      status: 401,
      errors: ['Invalid credentials provided'],
    });
  } catch (e) {
    console.error(e);
    return formatResponse({
      res,
      status: 500,
      errors: ['Something went wrong'],
    });
  }
}
