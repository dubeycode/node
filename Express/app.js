
// External modules
const express = require('express');

// local module
const requestHandler =require('./user');

const app = express()

app.post("/",(req,res,next)=>{
  console.log("came first middleware",req.url,req.method);
  res.send("<p>Came from first middleware</p>")
  next();

});


app.get("/submit-details",(req,res,next)=>{
  console.log("came second middleware",req.url,req.method);
  res.send("<p>Welcome to  nodejs serise</p>");
});


app.use("/",(req,res,next)=>{
  console.log("came another middleware",req.url,req.method);
  res.send("<p>came from another middleware </p>");
});




const port = 3000

app.listen(port, () => {
  console.log(`server running onn address http://localhost:${port}`)
})
