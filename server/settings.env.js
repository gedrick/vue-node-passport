const nodeVars = process.env;

const twitch = {
  clientId: nodeVars.TWITCH_CLIENT_ID,
  secret: nodeVars.TWITCH_SECRET,
  scopes: ['user_read']
};

const login = {
  sessionSecret: nodeVars.LOGIN_SESSION_SECRET,
  encryptionSalt: nodeVars.LOGIN_ENCRYPTION_SALT,
  callback: nodeVars.LOGIN_CALLBACK
};

const mongo = {
  db: nodeVars.MONGO_DB,
  host: nodeVars.MONGO_HOST,
  port: parseInt(nodeVars.MONGO_PORT),
  username: nodeVars.MONGO_USERNAME,
  password: nodeVars.MONGO_PASSWORD,
  collection: nodeVars.MONGO_COLLECTION,
  url: nodeVars.MONGO_URL
};

module.exports = {
  twitch,
  login,
  mongo
};