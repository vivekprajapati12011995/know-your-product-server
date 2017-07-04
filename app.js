'use strict';
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const util = require('util');
const path = require('path');
const passport = require('passport');
const config = require('./config.js');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user');

// import routes file
var usersRoute = require('./routes/users');
var productsRoute = require('./routes/products');

// Create our Express application and passport support added
var app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));                                                                                                                                                                                                                  
app.use(cookieParser());
app.use(passport.initialize());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

mongoose.connect(config.get('database.host'), function () {
  console.log("database connected on " + config.get('database.host'));
});

// routes are 
app.use('/api/product', productsRoute);
app.use('/api/user', usersRoute);


//handle development errors
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });
}

// production error handler
//no stack traces are provided to the end-user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {}
  })
})

module.exports = app;









