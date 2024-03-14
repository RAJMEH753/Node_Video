const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const movieSchema = new Schema({
    _id: Number
})

module.exports = mongoose.model('movieData', movieSchema, 'movie');