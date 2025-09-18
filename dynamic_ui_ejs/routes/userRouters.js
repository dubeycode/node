// core modules 
const path =require('path');

//. extrnal modules 
const express =require('express')
const userRouter=express.Router();

//local MOdules
const rootDir = require("../utils/pathUtil");
const { registerHome } = require('./hostRouters');


userRouter.get("/",(req,res,next)=>{
  console.log(registerHome)
  // res.sendFile(path.join(rootDir, 'views', 'home.html'));
  res.render('home',{registerHome:registerHome,pageTitle:'airbnb Home'});
});


module.exports=userRouter;
