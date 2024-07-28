const express = require("express");
const connection = require ("./config/db");
// const MovieModel = require ("./model/movie.model");
const movieRouter = require("./routes/movie.route");

const app = express();
const port = 3000;

app.use (express.json());
app.use ("/movie", movieRouter);

app.get("/", async(req, res) => {
    try {
      await res.send("Server Running fine");
    } catch (error) {
      res.send(`error occured ${error}`);
    }
  });

app.listen(port, async() => {
    try {
        await connection;
        console.log(`server is running on port ${port} and connected to DB `)
    } catch (error) {
        console.log(`error connected to server or DB ${error}`) 
    }
});
