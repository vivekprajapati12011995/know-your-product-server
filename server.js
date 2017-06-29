'use strict';

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const winston = require('winston');
const util = require('util');
const fs = require('fs');
const passport = require('passport');
const logDir = 'log';
const router = express.Router();
const config = require('./config.js');
const LocalStrategy = require('passport-local').Strategy;
var User = require('./models/user');



// Create our Express application
var app = express();
app.use(require('cookie-parser')());
app.use(bodyParser.json())
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(passport.initialize());
passport.use(new LocalStrategy(User.authenticate));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

mongoose.connect(config.get('database.host'), function () {
  console.log("database connected on " + config.get('database.host'));
});


app.use(cors());
app.use(bodyParser.urlencoded({
  extended: true
}));

require('./routes/route.js')(app, router);
app.listen(config.get('port'), config.get('ip'));
console.log("App listening on port " + config.get('port'));

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









