var express = require('express');
var router = express.Router();
var Verify = require('../controllers/verify');
const userController = require('../controllers/userController');


router.get('/',function(){
    res.send('respond with resource');
});

router.post('/register',userController.createUser);
router.post('/login',userController.loginAction);

router.get('/logout',userController.logout);

module.exports = router;