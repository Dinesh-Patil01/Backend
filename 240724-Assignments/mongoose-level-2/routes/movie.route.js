const express = require("express")
const MovieModel = require("../model/movie.model")

const movieRouter = express.Router()

// ++++++++++++++++++++++++++++ for adding one movie +++++++++++++++++++++

  movieRouter.post("/add-movie", async (req,res) => {
      const {title, genre, director, releaseDate, duration, rating, description} = req.body; //destructuring of data
      try {
          const movie = new MovieModel({
            title,
            genre, 
            director, 
            releaseDate, 
            duration, 
            rating, 
            description
          })
          await movie.save()
          res.status(201).send("movie added")
      } catch (error) {
          res.status(404).send("error created due to adding")
      }
  })


//   +++++++++++++++++++++ for adding many movies at ones ++++++++++++++++++

  movieRouter.post("/add-movies", async (req,res) => {
    try {
        const movies = req.body; 
        const savedMovies = await MovieModel.insertMany(movies);
        res.status(201).send("movie added", savedMovies);
        // res.status(201).send("movie added")
    } catch (error) {
        res.status(404).send("error created due to adding")
    }
})
  

// ++++++++++++++++++++ for fetching movies ++++++++++++++

  movieRouter.get ("/get-movies", async(req,res) => {
      try {
          const {q, rating , title, sortBy, page = 1, limit = 10} = req.query;
          const filter = {};

        if (q) {
            filter.title = { $regex: q, $options: 'i' };
          }

        if (rating) {
            filter.rating = rating;
          }

        if (title) {
            filter.title = title;
          }      
        
        const movies = await MovieModel.find(filter)
            .sort(sortBy ? { [sortBy]: 1 } : {})
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        res.status(200).json({movies}) 
      } catch (error) {
          res.status(404).send("error created due to fetching data")
      }
  })

// ++++++++++++++++++++ for fetching movie ++++++++++++++

  movieRouter.get("/get-movie/:id", async(req, res) => {
    const {id} = req.params;
    try {
        const getMovie = await MovieModel.find({_id:id},req.body)
        res.status(200).json({"msg":"fetched successfully", getMovie}) 
    } catch (error) {
        res.status(404).send("error created due to fetching data")
    }
})
  
// ++++++++++++++++++++ for updating movies ++++++++++++++

  movieRouter.patch("/update-movies/:id", async(req, res) => {
      const {id} = req.params;
      try {
          const updatedMovies = await MovieModel.findByIdAndUpdate({_id:id},req.body)
          res.status(200).json({"msg":"updated successfully", updatedMovies}) 
      } catch (error) {
          res.status(404).send("error created due to updating data")
      }
  })

  
  // ++++++++++++++++++++ for deleting movies ++++++++++++++

  movieRouter.delete ("/delete-movie/:id", async(req,res) => {
      const {id} = req.params;
      try {
          const deleteMovies = await MovieModel.findByIdAndDelete({_id:id})
          res.status(200).json({"msg":"Deleted successfully", deleteMovies}) 
      } catch (error) {
          res.status(404).send("error created due to deleting data")
      }
  })

  module.exports = movieRouter