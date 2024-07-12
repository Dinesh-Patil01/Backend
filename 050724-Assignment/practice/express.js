const express = require("express")
const server = express()
PORT =  3001

server.get ("/home",(req,res)=>{
    res.send("Welcome To Home Page")
})

server.listen(  PORT,()=>{
    console.log(`server is running on ${PORT}`)
})