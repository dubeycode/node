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
   res.render("home", {
    pageTitle: "airbnb Home",
    registeredHomes: registerHome,
    currentPage:'Home'

  });
});


module.exports=userRouter;
