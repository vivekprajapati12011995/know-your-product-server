var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
  firstname:String,
  lastname:String,
  username :String,
  password :String,
  admin:{
    type: Boolean,
    default: false
  }
});

User.plugin(passportLocalMongoose);


module.exports = mongoose.model('User', User);