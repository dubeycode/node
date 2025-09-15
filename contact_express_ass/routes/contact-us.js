// core modules
const path = require('path')

// extrnal modulese
const express = require('express')
const contactHandler = express.Router()

//local modulese

const rootDir =require('../utils/path')

contactHandler.get("/contact-us", (req, res, next) => {
  res.sendFile(path.join(rootDir ,'views','contact.html'));
});

contactHandler.post("/contact-us",(req,res,next)=>{
  console.log(req.body);
  res.sendFile(path.join(rootDir , 'views' , 'contactSubmit.html'))
})

module.exports = contactHandler;