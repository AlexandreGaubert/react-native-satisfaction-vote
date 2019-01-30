var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var roomSchema = new Schema({
    genres: Array,
    owner_id: String,
    movies: [{id: Number, disliked_by: Array, liked_by: Array}]
});

module.exports = mongoose.model("room", roomSchema);
