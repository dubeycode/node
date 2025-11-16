const express = require('express');
const authRouter = express.Router();
const authControllers = require("../controllers/authControllers");

authRouter.get("/login", authControllers.getLogin);
authRouter.post("/login", authControllers.postLogin);

authRouter.get("/signup", authControllers.getsignup);
authRouter.post("/signup", authControllers.postsignup);

authRouter.post("/logout", authControllers.postlogout);

module.exports = authRouter;
