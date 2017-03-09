// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const expressSession = require('express-session');
const LocalStrategy = require('passport-local').Strategy;

mongoose.connect('mongodb://localhost/mean-app');

const User = require("./server/UserModel");
// Get our API routes
const api = require('./server/routes/api');

const app = express();

app.use(expressSession({secret: 'mySecretKey'}));
app.use(passport.initialize());
app.use(passport.session());

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static('node_modules'));

//We want to send the client only username and id
passport.serializeUser(function (user, done) {
  user = {
    username: user.username,
    _id: user._id
  };

  done(null, user);
});

passport.deserializeUser(function (user, done) {
  user = {
    username: user.username,
    _id: user._id
  };

  done(null, user);
});

//register new user
passport.use('register', new LocalStrategy(function (username, password, done) {
  User.findOne({ 'username': username }, function (err, user) {
    // In case of any error return
    if (err) {
      console.log('Error in SignUp: ' + err);
      return done(err);
    }

    // already exists
    if (user) {
      console.log('User already exists');
      return done(null, false);
    } else {
      // if there is no user with that matches
      // create the user
      var newUser = new User();

      // set the user's local credentials
      newUser.username = username;
      newUser.password = password;    // Note: Should create a hash out of this plain password!
      console.log(newUser.username + ' ' + newUser.password);
      // save the user
      newUser.save(function (err) {
        if (err) {
          console.log('Error in Saving user: ' + err);
          throw err;
        }

        console.log('User Registration successful');
        return done(null, newUser);
      });
    }
  });
}));

//Authenticate middleware for login
passport.use('login', new LocalStrategy(function (username, password, done) {
  User.findOne({ 'username': username, 'password': password }, function (err, user) {
    if (err) {
      return done(err); 
    }

    if (!user) { 
      return done(null, false); 
    }

    return done(null, user);
  });
}));

//New User registration
app.post('/register', passport.authenticate('register'), function (req, res) {
  console.log("register requested " + req.body);
  res.json(req.user);
});

//listen to /login post requests
app.post('/login', passport.authenticate('login'), function (req, res) {
  console.log("login requested " + req.body);
  res.json(req.user);
});

// Set our api routes
app.use('/api', api);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));