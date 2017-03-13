const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const expressSession = require('express-session');
const LocalStrategy = require('passport-local').Strategy;

mongoose.connect('mongodb://localhost/mean-app');

const User = require("../UserModel");

router.use(expressSession({secret: 'mySecretKey'}));
router.use(passport.initialize());
router.use(passport.session());

// Parsers for POST data
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

//We want to send the client only username and id
// passport.serializeUser(function (user, done) {
//   user = {
//     username: user.username,
//     _id: user._id
//   };

//   done(null, user);
// });

// passport.deserializeUser(function (user, done) {
//   user = {
//     username: user.username,
//     _id: user._id
//   };

//   done(null, user);
// });

/* GET api listing. */
router.get('/', (req, res) => {
  console.log('api request');
  res.json('api works');
});

//register new user
passport.use('register', new LocalStrategy(function (username, password, done) {
  console.log('register middle');
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
      newUser.password = password; // Note: Should create a hash out of this plain password! 
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
  console.log('login middle');
  User.findOne({ 'username': username, 'password': password }, function (err, user) {
    if (err) {
      console.log(err);
      return done(err); 
    }

    if (!user) { 
      console.log("user not found");
      return done(null, false); 
    }
    console.log("succesful login")
    return done(null, user);
  });
}));

//New User registration
router.post('/register', passport.authenticate('register'), function (req, res) {
  console.log("register");
  res.json(req.user);
});

//listen to login post requests
router.post('/login', passport.authenticate('login'), function (req, res) {
  console.log('login');
  res.json(req.user);
});

module.exports = router;