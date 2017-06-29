const productController = require('../controllers/productController');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const passport = require('passport');
const Verify = require('./controllers/verify');

module.exports = function(app,router){

    // Register all our routes with /api
app.use('/api', router);


// Create endpoint handlers for /products
router.route('/products')
  .post(Verify.verifyOrdinaryUser,productController.postProduct)
  .get(Verify.verifyOrdinaryUser,productController.getProducts);

// Create endpoint handlers for /products/:id
router.route('/products/:id')
  .get(Verify.verifyOrdinaryUser,productController.getProduct)
  .put(Verify.verifyOrdinaryUser, productController.updateProduct)
  .delete(Verify.verifyOrdinaryUser, productController.deleteProduct);

//Create endpoint handlers for /users
router.route('/users')
  .get(Verify.verifyOrdinaryUser,userController.getUsers)
  .post(userController.postUser);

router.route('users/login').post(userController.login);

router.route('users/logout').get(userController.logout);

router.get('/', function (req, res) {
  res.json({ message: 'invalid request' });
});


}