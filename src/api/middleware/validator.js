const { validationResult } = require('express-validator');
const { formatResponse } = require('../../utils');
const {
  createSignupValidator,
  createSigninValidator,
} = require('./validators');

function getValidationRules(route) {
  switch (route) {
    case 'signup':
      return createSignupValidator();

    case 'signin':
      return createSigninValidator();

    default:
      throw Error(`No validator for provided route: ${route}`);
  }
}

function validate(req, res, next) {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors = errors
    .array()
    .map((err) => ({ [err.param]: err.msg }));

  return formatResponse({
    res,
    message: 'sign up failed',
    status: 422,
    errors: extractedErrors,
  });
}

module.exports = { getValidationRules, validate };
