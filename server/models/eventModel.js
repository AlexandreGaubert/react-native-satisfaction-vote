var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var eventSchema = new Schema({
  titre: String,
  date: String,
  animateur: String,
  type: String,
  votes: Number,
  voteUp: Number,
  voteDown: Number,
  voteSoso: Number,
  date: Date
});

module.exports = mongoose.model("events", eventSchema);
