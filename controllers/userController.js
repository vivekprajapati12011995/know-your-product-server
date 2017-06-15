var User = require('../models/user');

exports.postUser = function(req,res){
    var user = new User({
        username: req.body.username,
        password: req.body.password 
    });

    user.save(function(err){
        if(err){
            return res.send(err)
        }
        res.json({message : "new user is added"});
    })
};

exports.getUsers = function(req, res) {
  User.find(function(err, users) {
    if (err){
       return res.send(err);
    }
    res.json(users);
  });
};