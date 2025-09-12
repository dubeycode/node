// core modules 
const path =require('path');

//. extrnal modules 
const express =require('express')
const userRouter=express.Router();

//local MOdules
const rootDir = require("../utils/pathUtil")


userRouter.get("/",(req,res,next)=>{
  res.sendFile(path.join(rootDir, 'views', 'home.html'));
})


module.exports=userRouter;
