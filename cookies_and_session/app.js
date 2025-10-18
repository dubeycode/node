//core modules 
const path =require('path');

// extrnal modules
const express = require('express');


//local modules
const storeRouter = require("./routes/storeRouters")

const hostRouter = require("./routes/hostRouters")

const rootDir = require("./utils/pathUtil");

const errorController = require("./controllers/errors");
const { default: mongoose } = require('mongoose');



const app = express();
app.use(express.static("public"));
// set the view engine
app.set("view engine", "ejs");

// set views folder path
app.set("views", path.join(__dirname, "views"));


app.use(express.urlencoded());
app.use(storeRouter)
app.use("/host",hostRouter)
app.use(express.static(path.join(rootDir,'public')))



app.use(errorController.pagenotfound)

const port =3000;
const DB_PATH ="mongodb+srv://dubey_dbuser:backendPassword@completairbnb.idrzuwa.mongodb.net/airbnb?retryWrites=true&w=majority&appName=completairbnb"

mongoose.connect(DB_PATH).then(()=>{
  console.log('connected to Mongo');
  app.listen(port,()=>{
  console.log(`server is runing on http://localhost:${port}`);
  });
  }).catch(err=>{
  console,log('Error while connectig to Mongo',err);
})