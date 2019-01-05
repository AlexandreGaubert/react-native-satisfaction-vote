const axios = require("axios");
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var port = 80;
var mongoDB = 'mongodb://127.0.0.1:27017/ourme-tools';

process.argv.forEach(function (val, index, array) {
  if (val === "-db") mongoDB = array[index + 1];
  if (val === "-port") port = array[index + 1]
});

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Mongo connexion
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//Mongo Models
var Event = require("./models/eventModel");

io.on('connection', function(socket) {
  socket.on('initVote', function(data) {
    var event = new Event();
    console.log(data);
    event.titre = data.name;
    event.type = data.type;
    event.voteUp = 0;
    event.voteDown = 0;
    event.voteSoso = 0;
    event.votes = 0;
    event.date = new Date();

    event.save((err, event) => {
      if (err) console.log(err);
      socket.emit('event-id', event._id)
    })
  })

  socket.on('vote', function(data) {
    const { vote, eventID } = data;

    Event.findOne({_id: eventID}, (err, event) => {
      event.votes += 1;
      if (vote === 'up') event.voteUp += 1
      else if (vote === 'down') event.voteDown += 1

      event.save((err, event) => {
        if (err) return console.log(err);
        console.log("vote has been saved");
      })

    });

  })
})

http.listen(port, function() {
    console.log(`server is listening on port ${port}.`)
})
