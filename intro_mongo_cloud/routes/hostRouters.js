// external modules
const express =require('express')
const hostRouters = express.Router()

// local modulese
const hostController = require("../controllers/hostController");



hostRouters.get("/add-home",hostController.getAddHome);

hostRouters.post("/add-home",hostController.postAddHome)

hostRouters.get("/host-home-list",hostController.getHostHomes)

hostRouters.get("/edit-home/:homeId",hostController.getEditHome);

hostRouters.post("/edit-home", hostController.postEditHome);

hostRouters.post("/delet-home/:homeId",hostController.postDeleteHome);


module.exports=hostRouters;
