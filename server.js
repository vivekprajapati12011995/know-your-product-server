'use strict';

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');
mongoose.Promise = require('bluebird');
var session = require('client-sessions');
var winston = require('winston');

var config = require('./config.js');
var productController = require('./controllers/productController');
var userController = require('./controllers/userController');
var authController = require('./controllers/authController');

// Use environment defined port or 3000
var port = process.env.PORT || 3000;

// Create our Express application
var app = express();

const fs = require('fs');
const logDir = 'log';

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const tsformt = () => (new Date()).toLocaleTimeString();
const logger = new (winston.Logger)({
  transports: [
    new (winston.transports.File)({
      name: 'debug-file',
      filename: 'log/results-debug.log',
      timestamp: tsformt,
      json: false,
      level: 'debug'
    }),
    new (winston.transports.File)({
      name: 'info-file',
      filename: 'log/results-info.log',
      timestamp: tsformt,
      json: false,
      level: 'info'
    })
  ]
});

logger.info('hello logger!!');
logger.debug('debbuugggggg');

app.use(cors());

var router = express.Router()

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(session({
  cookieName: 'session',
  secret: 'random_string_goes_here',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
}));

// Register all our routes with /api
app.use('/api', router);


// Create endpoint handlers for /products
router.route('/products')
  .post(productController.postProduct)
  .get(productController.getProducts);

// Create endpoint handlers for /products/:id
router.route('/products/:id')
  .get(productController.getProduct)
  .put(authController.isAuthenticated, productController.updateProduct)
  .delete(authController.isAuthenticated, productController.deleteProduct);

//Create endpoint handlers for /users
router.route('/users')
  .get(userController.getUsers)
  .post(userController.postUser);

router.route('/login').post(userController.getUser);

router.get('/', function (req, res) {
  res.json({ message: 'invalid request' });
});


  mongoose.connect(config.get('database.host'), function () {
    console.log("mongo connected on "+config.get('database.host'));
  });


  app.listen(
    config.get('port'),
    config.get('ip'),() => console.log("server started on port "+config.get('port'))
  );








