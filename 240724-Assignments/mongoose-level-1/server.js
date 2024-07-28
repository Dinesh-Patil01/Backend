const express = require("express");
const connection = require("./config/db")
const dataRouter = require("./routes/route")
const UserModel = require("./models/user.model")


const server = express();
const port = 3000;

server.use(express.json());
server.use(dataRouter)

server.get("/", (req,res) => {
    res.send("Server is running successfully")
})

server.listen(port, async() => {
    try {
        await connection;
        console.log(`server is running on ${port}`) 
    } catch (error) {
        console.log(`error connected to server or DB ${error}`) 
    }
    
})