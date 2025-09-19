// core modules 
const path =require('path');


// external modules
const express =require('express')
const hostRouters = express.Router()

// local modulese
const rootDir = require("../utils/pathUtil")

hostRouters.get("/add-home",(req,res,next)=>{
  res.render('addhome',{pageTitle:'Add home to airbnb' ,currentPage:'Home'})
})

const registerHome=[]

hostRouters.post("/add-home", (req, res, next) => {
  console.log('Home Registration successful for:', req.body);
  registerHome.push(req.body);
  res.render('home_Add', {pageTitle: 'Home Added Successfully', currentPage: 'homeAdded'});
})


exports.hostRouter =hostRouters;
exports.registerHome=registerHome;
