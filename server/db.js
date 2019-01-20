const settings = require('./settings.js');

const db = mongoose => {
  mongoose.connect(
    settings.mongo.url,
    { useNewUrlParser: true }
  );

  mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
  });

  mongoose.connection.on('error', err => {
    console.log('Mongoose default connection error: ' + err);
  });
};

module.exports = db;