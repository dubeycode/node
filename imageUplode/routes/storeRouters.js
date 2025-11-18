
//. extrnal modules 
const express =require('express')
const storeRouter=express.Router();

//local MOdules
const storeControllers = require("../controllers/storeControllers");


storeRouter.get("/",storeControllers.getIndex);

storeRouter.get("/bookings",storeControllers.getbookings)

storeRouter.get("/homes",storeControllers.getHomes);

storeRouter.get("/favourites",storeControllers.getFavouriteList);

storeRouter.get("/homes/:homeId",storeControllers.getHomeDetails);

storeRouter.post("/favourites",storeControllers.postAddToFavourite);

storeRouter.post("/faourites/delete/:homeId",storeControllers.postRemoveFromFavourite)


module.exports=storeRouter;
