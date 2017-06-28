var productController = require('../controllers/productController');
var userController = require('../controllers/userController');
var authController = require('../controllers/authController');

module.exports = function(app,router){

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


}