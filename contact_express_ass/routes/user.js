const path =require('path');


const express = require('express');
const user=express.Router()

const rootDir =require('../utils/path')

user.get("/", (req, res, next) => {
 
  res.sendFile(path.join(rootDir,'views' ,'home.html'));

});

module.exports=user;