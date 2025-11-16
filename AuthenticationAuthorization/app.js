//core modules 
const path =require('path');

// extrnal modules
const express = require('express');
const session = require('express-session');
const MongoDBStore =require('connect-mongodb-session')(session);
// Dbpath 
const DB_PATH ="mongodb+srv://dubey_dbuser:backendPassword@completairbnb.idrzuwa.mongodb.net/airbnb?retryWrites=true&w=majority&appName=completairbnb"

//local modules
const storeRouter = require("./routes/storeRouters")

const hostRouter = require("./routes/hostRouters")

const authRouter = require("./routes/authRouters")

const rootDir = require("./utils/pathUtil");

const errorController = require("./controllers/errors");
const { default: mongoose } = require('mongoose');



const app = express();
app.use(express.static("public"));
// set the view engine
app.set("view engine", "ejs");

// set views folder path
app.set("views", path.join(__dirname, "views"));

const store = new MongoDBStore({
  uri:DB_PATH,
  collection:'sessions'
});


app.use(express.urlencoded());

app.use(session({
  // encrypt session data
  secret:"DarkRoom",
  // forces session not modified
  resave:false,
  //unitialzed to be save
  saveUninitialized: true,
  // session save to Db
  store:store,

}));

app.use((req,res,next)=>{
  // console.log('cookie cheek middleware',req.get('cookie'));
  req.isLoggedIn = req.session.isLoggedin;
  next();
})


app.use(authRouter);
app.use(storeRouter);
app.use("/host",(req,res,next)=>{
  if(req.isLooggedIn){
    next();
  }else{
    res.redirect("/login");
  }
});
app.use(express.static(path.join(rootDir,'public')));

app.use(express.urlencoded({ extended: false }));



app.use(errorController.pagenotfound)

const port =3000;


mongoose.connect(DB_PATH).then(()=>{
  console.log('connected to Mongo');
  app.listen(port,()=>{
  console.log(`server is runing on http://localhost:${port}`);
  });
  }).catch(err=>{
  console.log('Error while connectig to Mongo',err);
})