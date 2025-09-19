
//. extrnal modules 
const express =require('express')
const userRouter=express.Router();

//local MOdules
const homesController = require("../controllers/home");


userRouter.get("/",homesController.getHomes);


module.exports=userRouter;
