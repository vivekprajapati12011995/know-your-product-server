var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Verify = require('../controllers/verify');


router.get('/',function(){
    res.send('respond with resource');
});

router.route('/register').post(function(req,res){
      User.register(new User({ username : req.body.username }),
                 req.body.password , function(err,user){
        if(err){
            return res.status(500).json({err: err});
        }
        passport.authenticate('local')(req,res,function(){
            return res.status(200).json({status:'registration successfull'});
        });
    });
});

router.route('/login').post(function(req,res,next){
     passport.authenticate('local',function(err,user,info){
        if(err){
            return next(err);
        }
        if(!user){
            return res.status(401).json({err:info})
        }
        req.login(user,function(err){
            if(err){
                res.status(500).json({message: 'you could not login'});
            }
            console.log("user in users "+user);
            var token = Verify.getToken(user);

            res.status(200).json({
                status:'login successfull',
                success: true,
                JWT: token
            })
        })
    })(req,res,next);
});

router.route('/logout').get(function(req,res){
    req.logout();
    res.status(200).json({
        status:'logout',
        message: 'logout successfully!'
    })
})

module.exports = router;