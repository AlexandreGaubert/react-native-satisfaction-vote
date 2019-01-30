const axios = require("axios");
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

const port = 80;

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Mongo connexion
var mongoDB = 'mongodb://127.0.0.1:27017/ourme-tools';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var Event = require("./models/eventModel");

//MongoDB Models

io.on('connection', function(socket) {
  console.log("user connected");

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
      else if (vote === 'soso') event.voteSoso += 1
      else if (vote === 'down') event.voteDown += 1

      event.save((err, event) => {
        if (err) return console.log(err);
        console.log("vote has been saved");
      })

    });
  })

  socket.on('resetVote', function(data) {
    console.log('(vote is being reseted)', data.eventID);

    const { eventID } = data;

    Event.findOne({_id: eventID}, (err, event) => {

      event.votes = 0;
      event.voteUp = 0;
      event.voteDown = 0;
      event.voteSoso = 0;

      event.save((err, event) => {
        if (err) return console.log(err);
        console.log("vote has been saved");
      })

    });
  })
})

app.post('/api/v1/getAnimationByYear', function(req, res) {
  Event.find({}, (err, events) => {
    if (err) console.log(err);

    var results = [];

    for (var i = 0; i < events.length; i++) {
       if (events[i].date.getFullYear() === req.body.year) {
         results.push(events[i]);
       }
    }

    res.send(200, results)
  })
})

app.post('/api/v1/getAnimationByMonth', function(req, res) {
  Event.find({}, (err, events) => {
    if (err) console.log(err);

    var results = [];

    for (var i = 0; i < events.length; i++) {
       if (events[i].type === req.body.type &&
          events[i].date.getMonth() === req.body.month &&
           events[i].date.getFullYear() === req.body.year) {
         results.push(events[i]);
       }
    }

    res.send(200, results)
  })
})

http.listen(port, function() {
    console.clear();
    console.log(`server is listening on port ${port}.`)
})

function normalizeAnim(anims) {
  anims.map(anim => anim.date = new Date(anim.date))

  anims.map(anim => {
    var nw = new Event(anim);
    nw.save((err, saved) => {
      if (err) console.log(err);
      console.log(saved);
    })
  })
}
