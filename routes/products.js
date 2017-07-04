var express = require('express');
var router = express.Router();

const productController = require('../controllers/productController');
const Verify = require('../controllers/verify');

router.use(Verify.verifyOrdinaryUser);



router.route('/')
  .post(productController.postProduct)
  .get(productController.getProducts);

// Create endpoint handlers for /products/:id
router.route('/:id')
  .get(productController.getProduct)
  .put(productController.updateProduct)
  .delete( productController.deleteProduct);

module.exports = router;