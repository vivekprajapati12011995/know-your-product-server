var express = require('express');
var router = express.Router();

const productController = require('../controllers/productController');
const Verify = require('../controllers/verify');

router.route('/')
  .post(Verify.verifyOrdinaryUser,productController.postProduct)
  .get(productController.getProducts);

// Create endpoint handlers for /products/:id
router.route('/:id')
  .get(Verify.verifyOrdinaryUser,productController.getProduct)
  .put(Verify.verifyOrdinaryUser, productController.updateProduct)
  .delete(Verify.verifyOrdinaryUser, productController.deleteProduct);

module.exports = router;