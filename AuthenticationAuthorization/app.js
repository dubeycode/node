// core modules
const path = require('path');

// external modules
const express = require('express');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

// Dbpath
const DB_PATH = "mongodb+srv://dubey_dbuser:backendPassword@completairbnb.idrzuwa.mongodb.net/airbnb?retryWrites=true&w=majority&appName=completairbnb"

// local modules
const storeRouter = require("./routes/storeRouters");
const hostRouter = require("./routes/hostRouters");
const authRouter = require("./routes/authRouters");
const rootDir = require("./utils/pathUtil");
const errorController = require("./controllers/errors");
const mongoose = require('mongoose');

// App
const app = express();

// Middlewares
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

// view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Session store
const store = new MongoDBStore({
  uri: DB_PATH,
  collection: 'sessions'
});

// Session
app.use(session({
  secret: "DarkRoom",
  resave: false,
  saveUninitialized: false,
  store: store,
}));

// Set login info
app.use((req, res, next) => {
  req.isLoggedIn = req.session.isLoggedin;
  next();
});

// Public Routes
app.use(authRouter);
app.use(storeRouter);

// Protect Host Routes
app.use("/host", (req, res, next) => {
  if (req.isLoggedIn) {
    next();
  } else {
    return res.redirect("/login");
  }
});

// ✔ Now Use Host Router
app.use("/host", hostRouter);

// 404
app.use(errorController.pagenotfound);

// Start Server
const port = 3000;
mongoose.connect(DB_PATH)
  .then(() => {
    console.log('Connected to Mongo');
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  })
  .catch(err => {
    console.log('Error connecting to Mongo:', err);
  });
