const mongoose = require("mongoose")

const movieSchema = mongoose.Schema({
    title: String,
    genre: String, 
    director: String ,
    releaseDate: String, 
    duration: Number, 
    rating: Number, 
    description: String
})

const MovieModel = mongoose.model("movie", movieSchema)

module.exports = MovieModel



