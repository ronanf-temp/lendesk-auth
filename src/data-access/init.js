const redis = require('redis');

let client;

function getDbClient() {
  if (!client) {
    client = redis.createClient();

    client.on('error', function (error) {
      console.error(error);
    });
  }

  return client;
}

module.exports = getDbClient;
