var user = require('../models/user');
var jwt = require('jsonwebtoken');
var config = require('../config.js');

exports.getToken = function(user){
    return jwt.sign(user,config.get('secretKey'),{
        expiresIn:3600
    });
};

exports.verifyOrdinaryUser = function(req,res,next){
    // check headers or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    console.log(config.get('secretKey'));
    if(token){
        jwt.verify(token,config.get('secretKey'),function(err,decoded){
            if(err){
                var err = new Error('you are not authenticated');
                err.status = 401;
                return next(err);
            }else{                          //if everything ok  means token is valid then
                req.decoded = decoded;
                next();
            }
        })
    }else{
        var err = new Error('no token provided');
        err.status = 403;
        return next(err);
    }
}