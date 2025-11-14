
//. extrnal modules 
const express =require('express')
const authRouter=express.Router();

//local MOdules
const authControllers = require("../controllers/authControllers");


authRouter.get("/login",authControllers.getLogin);
authRouter.post("/login",authControllers.postLogin);
authRouter.post("/logout",authControllers.postlogout);
authRouter.get("/signup",authControllers.getsignup);
authRouter.post("/signup",authControllers.postsignup);

module.exports=authRouter 