// const Favourite = require("../models/favourite");
const Home = require("../models/home");
const User = require("../models/user");
// home index
exports.getIndex = (req, res, next) => {
  // console.log("session Value",req.session);
  Home.find().then(registeredHomes=>{
      res.render("store/index", {
      pageTitle: "airbnb Home",
      registeredHomes: registeredHomes,
      currentPage: "index",
      isLoggedIn:req.isLoggedIn,
      user:req.session.user,
    })
  })
};

// get home
exports.getHomes = (req, res, next) => {
  Home.find().then(registeredHomes=>{
    res.render("store/home-list", {
      pageTitle: "airbnb Home",
      registeredHomes: registeredHomes,
      currentPage: "Homes List",
      isLoggedIn:req.isLoggedIn,
      user:req.session.user,
    })
  });
};

exports.getbookings = (req, res, next) => { 
    res.render("store/bookings", {
      pageTitle: "My bookings",
      currentPage: "Bookings",
      isLoggedIn:req.isLoggedIn,
      user:req.session.user,
    })
};

exports.getFavouriteList = async(req, res, next) => {
 const userId = req.session.user._id;
 const user = await User.findById(userId).populate('favourites');
  res.render("store/favourite-list", {     
    favouriteHomes: user.favourites,
    pageTitle: "My Favorites",
    currentPage: "Favorites",
    isLoggedIn:req.isLoggedIn,
    user:req.session.user,
  });
};

// add to favourites
exports.postAddToFavourite = async (req, res, next) => {
  try {
    const homeId = req.body.id;
    const userId = req.session.user._id;

    const user = await User.findById(userId);

    if (!user.favourites) {
      user.favourites = [];   // create array if missing
    }

    // check if already added
    if (user.favourites.includes(homeId)) {
      // console.log("Already marked as favourite");
      return res.redirect("/favourites");
    }

    user.favourites.push(homeId);

    await user.save();
    // console.log("Favourite added");
    res.redirect("/favourites");

  } catch (err) {
    console.log("Error while marking favourite:", err);
    res.redirect("/");
  }
};

// remove favourites 
exports.postRemoveFromFavourite = async(req, res, next) => {
  const homeId = req.params.homeId;
  const userId = req.session.user._id;
  const user = await User.findById(userId);
  if (user.favourites.includes(homeId)){
    user.favourites =user.favourites.filter(fav=>fav != homeId);
    await user.save();
  }
  res.redirect("/favourites");
};

exports.getHomeDetails = (req, res, next) => {
  const homeId = req.params.homeId;
  // console.log("At home details page",homeId);
  Home.findById(homeId).then(home => {
    if (!home) {
      console.log("Home not found");
      res.redirect("/homes");
    } else {
      // console.log("Home Detils Found",home);
      res.render("store/home-detils", {
        home: home,
        pageTitle: "Home Details",
        currentPage: "home",
        isLoggedIn:req.isLoggedIn,
        user:req.session.user,
      });
    }
  });
};
