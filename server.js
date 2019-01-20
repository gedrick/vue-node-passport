const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');
const twitchStrategy = require('passport-twitch').Strategy;
const bodyParser = require('body-parser');

let settings;
if (process.env.NODE_ENV === 'production') {
  settings = require('./server/settings.env');
} else {
  settings = require('./server/settings');
}
const host = process.env.HOST || 'http://localhost:8080';

// Set up Mongo.
const mongoose = require('mongoose');
mongoose.Promise = Promise;
require('./server/db')(mongoose);
const User = require('./server/models/user.js');

/**
 * Setup for Login with Twitch.
 * Most of this is setting up `express-sessions` to store data in a
 * Mongo database.
 */
const server = express();
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({
  extended: true
}));
server.use(session({
  secret: settings.login.sessionSecret,
  resave: false,
  saveUninitialized: false,
  store: new MongoStore(settings.mongo)
}));
server.use(express.static('./public'));
server.use(passport.initialize());
server.use(passport.session());

// Set up Passport.
// This is Twitch specific. Different services require their own strategies.
/**
 * Set up Passport.
 * This is Twitch specific. Different services require their own strategies.
 * Go here to find one for the service you want: http://www.passportjs.org/packages/
 */
passport.use(new twitchStrategy({
  clientID: settings.twitch.clientId,
  clientSecret: settings.twitch.secret,
  callbackURL: settings.login.callback,
  scope: settings.twitch.scopes
}, (accessToken, refreshToken, profile, done) => {
  User.findOrCreate({
    id: profile.id,
  }, {
    id: profile.id,
    username: profile.displayName,
    email: profile.email,
    avatar: profile._json.logo,
    access_token: accessToken,
    refresh_token: refreshToken
  }).then((result) => {
    return done(null, result);
  });
}));

/**
 * serializeUser determines which data of the user object should be stored in the session
 */
passport.serializeUser(function (user, done) {
  // Only store the user id.
  // Whatever is passed as the second param is stored in req.session.passport.user.
  done(null, user.doc._id);
});

/**
 * The first argument of deserializeUser corresponds to the key of the user
 * object that was given to the done function. Typically this users the user
 * ID to match a record in a User database. User.findById does just this.
 */
passport.deserializeUser(function (id, done) {
  // Retrieve user by stored user id.
  User.findById(id, (err, user) => {
    if (err) {
      console.log('deserializeUser error:', err);
    }
    done(null, user);
  });
});

// Set up middleware.
function loginRequiredCheck(req, res, next) {
  if (!req.user) {
    return res.status(200).send({
      code: 401,
      message: 'Not logged in'
    });
  }

  return next();
}

// Set up routes which are caught from the requests/callback at Login.vue and after
// signing into Twitch.
server.get('/auth/twitch', passport.authenticate('twitch'));
server.get('/auth/callback', passport.authenticate('twitch', {
  failureRedirect: '/'
}), (req, res) => {
  res.redirect(`${host}/#/dashboard`);
});
server.get('/logout', (req, res) => {
  req.logout();
  res.redirect(`${host}/#/`);
})

const lockedRoutes = express.Router();
lockedRoutes.use(loginRequiredCheck);
lockedRoutes.get('/me', (req, res) => {
  res.json({
    user: req.user
  });
});
server.use('/api', lockedRoutes);

// Start the server.
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`server operating on port ${port}`);
});