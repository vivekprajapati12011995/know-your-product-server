var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var productController = require('./controllers/productController');


// Create our Express application
var app = express();

var router = express.Router();

app.use(bodyParser.urlencoded({
  extended: true
}));

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
// Initial dummy route for testing
// http://localhost:3000/api


// Start the server
app.listen(port);
console.log('Insert product on port ' + port);