// core modules 
const path =require('path');


// external modules
const express =require('express')
const hostRouters = express.Router()

// local modulese
const rootDir = require("../utils/pathUtil")

hostRouters.get("/add-home",(req,res,next)=>{
  res.sendFile(path.join(rootDir ,'views', 'add-home.html'))
})

const registerHome=[]

hostRouters.post("/add-home",(req,res,next)=>{
  // console.log(req.body)
  console.log("home registration sucessful for:",req.body,req.body.housename);
  registerHome.push({houseName:req.body.housename})
  res.sendFile(path.join(rootDir ,'views', 'home_add.html'))
})


exports.hostRouter =hostRouters;
exports.registerHome=registerHome
