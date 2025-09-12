// core modules 
const path =require('path');

const express = require("express");


const app = express();

// local module 
const user = require('./routes/user');
const contact =require('./routes/contact-us');
const rootDir=require("./utils/path")

app.use((req, res, next) => {
   console.log("Handlinng", req.url, req.method);
  next();
});

app.use(user)
app.use(contact)

app.use((req,res,next)=>{
 res.status(404).sendFile(path.join(rootDir , 'views' ,'404.html'))
})


const port = 3000;
app.listen(port, () => {
  console.log(`server is runing on address http://localhost:${port}`);
});
