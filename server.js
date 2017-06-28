'use strict';

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const winston = require('winston');
const util = require('util');
const fs = require('fs');
const logDir = 'log';
const router = express.Router();
const config = require('./config.js');


// Create our Express application
var app = express();
mongoose.connect(config.get('database.host'));


app.use(cors());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', function(req, res){
   if(req.session.page_views){
      req.session.page_views++;
      res.send("You visited this page " + req.session.page_views + " times");
   } else {
      req.session.page_views = 1;
      res.send("Welcome to this page for the first time!");
   }
});

 require('./routes/route.js')(app, router);
app.listen(config.get('port'), config.get('ip'));
console.log("App listening on port " + config.get('port'));









