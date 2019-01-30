const axios = require("axios");
const express = require('express');
const session = require('express-session');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();
const port = 8080;

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({secret: "shhhh"}))



//Mongo connexion
var mongoDB = 'mongodb://localhost:27017/swipe-my-movie';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//MongoDB Models
var Room = require("./models/roomModel");


var sess;
app.get('/initSession', function(req, res) {
    sess = req.session;
    sess._id = '_' + Math.random().toString(36).substr(2, 9);
    res.send(200, {_id: sess._id});
})

app.post('/room/create', function(req, res) {
    const { genres, movies_ids } = req.body;
    var room = new Room({
        genres: genres,
        owner_id: "moi"
    })

    movies_ids.map((movie_id) => {
        room.movies.push({id: movie_id, disliked_by: [], liked_by: []})
    })

    room.save(function(err) {
        if (err) {
            return res.send(500, "internal server error");
        }
        else return res.send(200, room)
    })
})

app.listen(port, function() {
    console.log(`server is listening on port ${port}.`)
})