// external modules
const express =require('express')
const hostRouters = express.Router()

// local modulese
const hostController = require("../controllers/hostController");



hostRouters.get("/add-home",hostController.getAddHome);

hostRouters.post("/add-home",hostController.postAddHome)

hostRouters.get("/host-home-list",hostController.getHostHomes)


module.exports=hostRouters;
