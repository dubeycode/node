const Favourite = require("../models/favourite");
const Home = require("../models/home");

// home index
exports.getIndex = (req, res, next) => {
  // console.log("session Value",req.session);
  Home.find().then(registeredHomes=>{
      res.render("store/index", {
      pageTitle: "airbnb Home",
      registeredHomes: registeredHomes,
      currentPage: "index",
      isLoggedIn:req.isLoggedIn
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
      isLoggedIn:req.isLoggedIn
    })
  });
};

exports.getbookings = (req, res, next) => { 
    res.render("store/bookings", {
      pageTitle: "My bookings",
      currentPage: "Bookings",
      isLoggedIn:req.isLoggedIn
    })
};

exports.getFavouriteList = (req, res, next) => {
  Favourite.find()
  .populate('houseId')
  .then(favourites => {
    const favouriteHomes = favourites.map((fav)=>fav.houseId);
      res.render("store/favourite-list", {     
        favouriteHomes: favouriteHomes,
        pageTitle: "My Favorites",
        currentPage: "Favorites",
        isLoggedIn:req.isLoggedIn
      })
   });
};


// add favourites
exports.postAddToFavourite = (req, res, next) => {
  const homeId = req.body.id;
  Favourite.findOne({houseId: homeId}).then((fav) => {
    if (fav) {
      console.log("Already marked as favourite");
    } else {
      fav = new Favourite({houseId: homeId});
      fav.save().then((result) => {
        console.log("Fav added: ", result);
      });
    }
    res.redirect("/favourites");
  }).catch(err => {
    console.log("Error while marking favourite: ", err);
  });
};



// remove favourites 
exports.postRemoveFromFavourite = (req, res, next) => {
  const homeId =req.params.homeId;
  Favourite.findOneAndDelete({houseId:homeId})
  .then(result=>{
    console.log('Fav remove:',result);
  }).catch(err =>{
     console.log("Error while removing  favourite", err);
  }).finally(()=>{
      res.redirect("/favourites");
  });
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
        isLoggedIn:req.isLoggedIn
      });
    }
  });
};
