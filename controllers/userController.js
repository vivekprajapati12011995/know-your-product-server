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
        res.status(201).json({
            "message": "user added successfully",
            "data": user,           
        });

      
    })
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

exports.getUser = function (req, res) {
    User.findOne({ username: req.body.username }, function (err, user) {
        if (!user) {
            res.json({ "meassge": "no user is found" });
        } else {
            bcrypt.compare(req.body.password, user.password, function (err, isMatch) {
                if (err) res.json({ "meassge": "password is not correct" });
                if (isMatch) {
                    req.session.user = user;
                    res.json({
                        "statusCode": 200,
                        "message": "login successfull",
                        "data": user,
                        "error": false
                    });
                }
            });
        }
    })
}