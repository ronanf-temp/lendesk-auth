const bcrypt = require('bcrypt');
const { createUser, getUser } = require('../data-access');

const SALT_ROUNDS = 10;

async function signup(username, password) {
  const hashedPass = await _getHashedPass(password);
  const user = await createUser(username, hashedPass);

  return user;
}

async function signin(username, password) {
  const user = await getUser(username);

  if (!user) return false;

  const isPasswordCorrect = _comparePasswords(password, user.password);

  return isPasswordCorrect;
}

async function _comparePasswords(provided, hashed) {
  return await bcrypt.compare(provided, hashed);
}

async function _getHashedPass(password) {
  return await bcrypt.hash(password, SALT_ROUNDS);
}

module.exports = {
  signup,
  signin,
};
