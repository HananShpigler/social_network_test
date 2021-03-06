var express = require("express");
var path = require("path");
var mongo = require("mongoose");
var bodyParser = require('body-parser');
var morgan = require("morgan");
var db = require("./config.js");
const https = require("https");

var app = express();
var port = process.env.port || 3000;
var srcpath = path.join(__dirname, '/public');
app.use(express.static('public'));
app.use(bodyParser.json({
    limit: '5mb'
}));
app.use(bodyParser.urlencoded({
    extended: true,
    limit: '5mb'
}));


var mongoose = require('mongoose');
const { nextTick } = require("process");
var Schema = mongoose.Schema;
var userSchema = new Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    post: {
        type: String
    },
    follow: {
        type: String
    }
}, {
    versionKey: false
});


var model = mongoose.model('user', userSchema, 'users');

//api for get data from database  
app.post("/api/getData", function (req, res) {
    const username = req.body.username;
    const password = req.body.password;
    model.findOne({
        username: username,
        password: password
    }, function (err, foundUser) {
        if (foundUser != null) {
            res.send({data: "Ok"});
        } else {
            res.send({data: "Wrong username or password"});
        }
    });
});

app.post("/api/getFollower", function (req, res) {
    const username = req.body.username;
    model.findOne({
        username: username
    }, function (err, foundFollower) {
        if (foundFollower != null) {
            res.send({data: foundFollower.follow});
        } else {
            console.log(err);
        }
    });
});

app.post("/api/getPost", function (req, res) {
    const username = req.body.username;
    model.findOne({
        username: username
    }, function (err, foundPost) {
        if (foundPost != null) {
            res.send({data: foundPost.post});
        } else {
            res.send(err);
        }
    });
});

//api for Update data from database  
app.post("/api/UpdatePost", function (req, res) {
    const username = req.body.username;
    const post = req.body.post;

    model.updateOne({username: username}, {$set:{post: post}}, function (err) {
        if (err) {
            res.send(err);
            return;
        }
        res.send({
            data: "Record has been Updated..!!"
        });
    });
})


//api for Insert data from database  
app.post("/api/saveData", function (req, res) {

    var mod = new model(req.body);
    mod.save(function (err, data) {
        if (err) {
            res.send(err);
        } else {
            res.send({
                data: "Record has been Inserted..!!"
            });
        }
    });
})

//server stat on given port  
app.listen(port, function () {
    console.log("server start on port " + port);
})