var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');

var productController = require('./controllers/productController');
var userController = require('./controllers/userController');
var authController = require('./controllers/authController');

// Use environment defined port or 3000
var port = process.env.PORT || 3000;

// Create our Express application
var app = express();

app.use(cors());

mongoose.Promise = require('bluebird');

var router = express.Router();

app.use(bodyParser.urlencoded({
  extended: true
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


router.get('/', function (req, res) {
  res.json({ message: 'invalid request' });
});

mongoose.connect('mongodb://localhost:27017/shoppingmart', function () {
  console.log("mongodb connected !!!");
});

// Start the server
app.listen(port, function () {
  console.log('Insert product on port ' + port);
});







