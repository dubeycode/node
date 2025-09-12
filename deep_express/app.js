// external modules
const express = require("express");
const bodyParser = require('body-parser');



const app = express();

app.use((req, res, next) => {
  console.log("came first middleware", req.url, req.method);
  next();
});

// app.use("/",(req,res,next)=>{
//   console.log("came another middleware",req.url,req.method);
// res.send('<p>this is third middleware </p>')
// })

app.get("/", (req, res, next) => {
  console.log("Handlinng /for get ", req.url, req.method);
  res.send(`<h1> welcome to coding  </h1>`);
  next();
});

app.get("/contact-us", (req, res, next) => {
  console.log("Handlinng /for get ", req.url, req.method);
  res.send(`<h1>plese give us contact detils </h1>
  <form action="/contact-us" method="POST">
          <input type="text"
          name="name" 
          placeholder=" enter name">
          <input type="email"
          name="email" 
          placeholder="enter email">
          <input type="submit">
        </form>
        `);
        next();
});

// take data for json 
app.use(bodyParser.urlencoded());

app.post("/contact-us",(req,res,next)=>{
  console.log("handling /contact for post ",req.url,req.method,req.body);
  res.send(`<h1>we will reach to you shortlly </h1>`)
})



const port = 3000;
app.listen(port, () => {
  console.log(`server is runing on address http://localhost:${port}`);
});
