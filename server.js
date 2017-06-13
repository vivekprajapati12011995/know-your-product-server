var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var Product = require('./models/product');

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

productsRoute.post(function (req, res) {
  var product = new Product();

  // Set the product properties that came from the POST data
  product.p_name = req.body.p_name;
  product.p_quanty = req.body.p_quanty;
  product.p_quanty = req.body.p_quanty;
  product.price = req.body.price;
  product.image = req.body.image;


  // Save the product and check for errors
  product.save(function (err) {
    if (err)
      res.send(err);

    res.json({ message: 'product added', data: product });
  })
});

productsRoute.get(function(req,res){
  Product.find(function(err,products){
    if(err){
      res.send(err);
    }
    res.json(products);
  })
})

var productRoute = router.route('/products/:id');

// Create endpoint /api/products/:product_id for GET
productRoute.get(function(req, res) {
  // Use the product model to find a specific product
  Product.findById(req.params.id, function(err, product) {
    if (err)
      res.send(err);

    res.json(product);
  });
});

productRoute.put(function(req, res) {
  // Use the product model to find a specific product
  Product.findById(req.params.id, function(err, product) {
    if (err)
      res.send(err);

    // Update the existing product quantity
    product.p_name = req.body.p_name;
    product.p_quanty = req.body.p_quanty;
    product.price = req.body.price;
    product.image = req.body.image;

    // Save the product and check for errors
    product.save(function(err) {
      if (err)
        res.send(err);

      res.json(product);
    });
  });
});

productRoute.delete(function(req, res) {
  // Use the product model to find a specific product and remove it
  Product.findByIdAndRemove(req.params.id, function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'product removed from DB' });
  });
});

// Use environment defined port or 3000
var port = process.env.PORT || 3000;

// Create our Express router


mongoose.connect('mongodb://localhost:27017/shoppingmart');
// Initial dummy route for testing
// http://localhost:3000/api


// Start the server
app.listen(port);
console.log('Insert product on port ' + port);