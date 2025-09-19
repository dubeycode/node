// external modules
const express =require('express')
const hostRouters = express.Router()

// local modulese
const homesController = require("../controllers/home");



hostRouters.get("/add-home",homesController.getAddHome);

hostRouters.post("/add-home",homesController.postAddHome)


exports.hostRouter =hostRouters;

