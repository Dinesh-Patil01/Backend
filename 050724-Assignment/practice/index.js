const http = require("http")

const server = http.createServer((req,res)=>{
    if(req.url === "/home" ){
        res.write("Welcome to Home Page")
        res.end()
    }else if (req.url === "/cart"){
        res.write("Welcome To Cart Page")
        res.end()
    }else if (req.url === "/product"){
        res.write("Welcome To Products Page")
        res.end()
    }else{
        res.write("404 Page Not Found")
        res.end()
    }
})

server.listen(8090,()=>{
    console.log("Running on port 8090")
})