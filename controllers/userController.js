var User = require('../models/user');
var bcrypt = require('bcrypt-nodejs');

exports.postUser = function (req, res) {
    // console.log("body: "+JSON.stringify(req.body));
    var user = new User({

        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        password: req.body.password

    });

    user.save(function (err) {
        if (err) {
            return res.send(err)
        }
        res.json({ message: "new user is added successfully !!" });
    })
};

exports.getUsers = function (req, res) {
    User.find(function (err, users) {
        if (err) {
            return res.send(err);
        }
        res.json(users);
    });
};

exports.getUser = function (req, res) {
    User.findOne({ username: req.body.username }, function (err, user) {
        if (!user) {
            res.json({ "meassge": "no user is found" });
        } else {
            bcrypt.compare(req.body.password, user.password, function (err, isMatch) {
                if (err)  res.json({ "meassge": "password is not correct" }); 
                if(isMatch){
                     req.session.user = user;
                     res.json({ "message": "welcome to homepage" });
                }  
            });
        }
    })
}