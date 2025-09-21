
//. extrnal modules 
const express =require('express')
const storeRouter=express.Router();

//local MOdules
const homesControllers = require("../controllers/storeControllers");


storeRouter.get("/",homesControllers.getIndex);

storeRouter.get("/bookings",homesControllers.getbookings)

storeRouter.get("/homes",homesControllers.getHomes)

storeRouter.get("/favourites",homesControllers.getFavouriteList)

storeRouter.get("/homes/:homeId",homesControllers.getHomeDetails);

module.exports=storeRouter;
