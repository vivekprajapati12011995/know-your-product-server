const express = require('express');
const bodyParser= require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const ejsLint = require('ejs-lint');
const url = require('url');
const ObjectId = require('mongodb').ObjectID;
const app = express();
var fs = require("fs");
const port = 3000;
var db;
app.set('view engine', 'ejs');



MongoClient.connect('mongodb://vivek_mongo:vivek1200@ds139761.mlab.com:39761/star_wars_db', (err, database) => {
  if (err) return console.log(err);
  db = database;
  app.listen(port, () => {
  console.log('listening on port: '+port);
  })
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

    app.get('/user', (req, res) => {
      db.collection('user').find().toArray(function(err, results) {
        console.log(results);
        res.end(JSON.stringify(results));
      })
    })

    app.get('/edit', (req, res) => {
      var url_parts = url.parse(req.url, true);
      var query = url_parts.query;
      var _id = query._id;
      db.collection('user').find({"_id": ObjectId(_id)}).toArray(function(err, results) {
        console.log(JSON.stringify(results));
        res.end(JSON.stringify(results));
      })
    })

    app.post('/user', (req, res) => {
      db.collection('user').save(req.body, (err, result) => {
      if (err) return console.log(err)
        console.log('saved to database');
        res.end('added successfully');
      })
    })

    app.post('/update', (req, res) => {
      var id = req.body._id;
      var user = req.body;
      db.collection('user').update(
        { '_id' : ObjectId(id) },
        { $set: { 'fname': req.body.fname,
        'lname': req.body.lname,
        'email':req.body.email,
        'password': req.body.password} },
        function (err, result) {
          if (err) throw err;
        })
        res.end('updated');
    })

    app.get('/delete',(req,res) => {
      var url_parts = url.parse(req.url, true);
      var query = url_parts.query;
      var id = query._id;
      var usertable = db.collection('user');
      db.collection('user').deleteOne({_id: ObjectId(id)}, function (error, daigram){
        res.end('deleted');
      });
    })
