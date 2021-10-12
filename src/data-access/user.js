const getDbClient = require('./init');
const client = getDbClient();

async function createUser(username, password) {
  await client.set(
    `users?username=${username}`,
    JSON.stringify({ username, password })
  );

  return {
    username,
  };
}

async function getUser(username) {
  return new Promise((res, rej) => {
    client.get(`users?username=${username}`, (err, data) => {
      if (err) {
        console.log(err);
        rej(err);
      }
      const parsed = JSON.parse(data);

      res(parsed);
    });
  });
}

async function doesUsernameExist(username) {
  const user = await getUser(username);

  const usernameExists = user && user.username && user.username === username;

  return usernameExists;
}

module.exports = {
  createUser,
  doesUsernameExist,
  getUser,
};
