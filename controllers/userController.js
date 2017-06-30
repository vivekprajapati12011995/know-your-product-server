var User = require('../models/user');
var bcrypt = require('bcrypt-nodejs');
var Verify = require('./verify');
const passport = require('passport');

exports.createUser = function (req, res) {
    User.register(new User({ firstname: req.body.firstname, lastname: req.body.lastname, username: req.body.username }),
        req.body.password, function (err, user) {
            if (err) {
                return res.status(500).json({ err: err });
            }
            passport.authenticate('local')(req, res, function () {
                return res.status(200).json({ status: 'registration successfull' });
            });
        });
};


exports.getUsers = function (req, res) {
    User.find(function (err, users) {
        if (err) {
            return res.send(err);
        }
        res.json({
            "statusCode": 200,
            "message": "user list",
            "data": users,
            "error": false
        });
    });
};

exports.loginAction = function (req, res, next) {
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
            // console.log("user in users "+user);
            var token = Verify.getToken(user);

            res.status(200).json({
                status:'login successfull',
                success: true,
                JWT: token
            })
        })
    })(req,res,next);
}

exports.logout = function (req, res) {
    req.logout();
    res.status(200).json({
        status:'logout',
        message: 'logout successfully!'
    });
};


