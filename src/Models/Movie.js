const mongoose = require('mongoose');

const Showtimes = [{
    cinemaId: Number,
    vistaCinemaId: String,
    showtimeId: String,
    timeFilter: String,
    time: String,
    showtimeAMPM: String
}]

const Formats = [{
    showtimes: Showtimes,
    vistaId: String,
    name: String,
    isExperience: Boolean,
    segobPermission: String,
    language: String
}]

const schemaMovie = new mongoose.Schema({
    formats: Formats,
    id: {
        type:Number,
        unique: true
    },
    title: {
        type: String,
        default: "Pelicula",
        trim: true,
        required: true
    },
    key: String,
    originalTitle: String,
    rating: String,
    ratingDescription: String,
    runTime: String,
    poster: String,
    trailer: String,
    director: String,
    actors: [String],
    gender: String,
    distributor: String,
    order: {
        type:Number
    }
});

exports.Model = mongoose.model('Movie', schemaMovie);