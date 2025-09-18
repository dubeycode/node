// core modules 
const path =require('path');


// external modules
const express =require('express')
const hostRouters = express.Router()

// local modulese
const rootDir = require("../utils/pathUtil")

hostRouters.get("/add-home",(req,res,next)=>{
  res.render('addhome',{pageTitle:'Add home to airbnb'})
})

const registerHome=[]

hostRouters.post("/add-home",(req,res,next)=>{
  // console.log(req.body)
  console.log("home registration sucessful for:",req.body,req.body.housename);
  registerHome.push({houseName:req.body.housename})
  res.render('home_add',{pageTitle:'home Added sucessfully'})
})


exports.hostRouter =hostRouters;
exports.registerHome=registerHome
