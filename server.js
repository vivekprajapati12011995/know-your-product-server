var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var productController= require('./controllers/productController');
var userController= require('./controllers/userController');
var authController = require('./controllers/authController');


// Create our Express application
var app = express();

app.use(function(req, res, next) {  
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

mongoose.Promise = require('bluebird');

var router = express.Router();

app.use(bodyParser.urlencoded({
  extended: true
}));


// Create endpoint handlers for /products
router.route('/products')
  .post(productController.postProduct)
  .get(productController.getProducts);

// Create endpoint handlers for /products/:id
router.route('/products/:id')
  .get(productController.getProduct)
  .put(authController.isAuthenticated,productController.updateProduct)
  .delete(authController.isAuthenticated,productController.deleteProduct);

//Create endpoint handlers for /users
router.route('/users')
.get(userController.getUsers)
.post(userController.postUser);


router.get('/', function (req, res) {
  res.json({ message: 'invalid request' });
});

// Register all our routes with /api
app.use('/api', router);

var productsRoute = router.route('/products');
var productRoute = router.route('/products/:id');


// Use environment defined port or 3000
var port = process.env.PORT || 3000;

// Create our Express router


mongoose.connect('mongodb://localhost:27017/shoppingmart');



// Start the server
app.listen(port);
console.log('Insert product on port ' + port);