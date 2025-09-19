//core modules 
const path =require('path');

// extrnal modules
const express = require('express');


//local modules
const userRouter = require("./routes/userRouters")
const {hostRouter} = require("./routes/hostRouters")
const rootDir = require("./utils/pathUtil");
const errorController = require("./controllers/errors");



const app = express();
app.use(express.static("public"));
// set the view engine
app.set("view engine", "ejs");

// set views folder path
app.set("views", path.join(__dirname, "views"));


app.use(express.urlencoded());
app.use(userRouter)
app.use("/host",hostRouter)
app.use(express.static(path.join(rootDir,'public')))



app.use(errorController.pagenotfound)

const port =3000;
app.listen(port,()=>{
  console.log(`server is runing on http://localhost:${port}`);
  
})