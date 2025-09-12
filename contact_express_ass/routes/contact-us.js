// core modules
const path = require('path')

// extrnal modulese
const express = require('express')
const contactHandler = express.Router()

//local modulese

const rootDir =require('../utils/path')

contactHandler.get("/contact-us", (req, res, next) => {
  console.log("Handlinng /for get ", req.url, req.method);
  res.sendFile(path.join(rootDir ,'views','contact.html'));
});

contactHandler.post("/contact-us",(req,res,next)=>{
  console.log("handling /contact for post ",req.url,req.method);
  res.sendFile(path.join(rootDir , 'views' , 'contactSubmit.html'))
})

module.exports = contactHandler;