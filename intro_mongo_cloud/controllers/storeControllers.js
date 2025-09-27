const Favourite = require("../models/favourite");
const Home = require("../models/home");

// home index
exports.getIndex = (req, res, next) => {
  Home.featchAll().then(registeredHomes=>{
      res.render("store/index", {
      pageTitle: "airbnb Home",
      registeredHomes: registeredHomes,
      currentPage: "index",
    })
  })
};

// get home
exports.getHomes = (req, res, next) => {
  Home.featchAll().then(registeredHomes=>{
    res.render("store/home-list", {
      pageTitle: "airbnb Home",
      registeredHomes: registeredHomes,
      currentPage: "Homes List",
    })
  });
};

exports.getbookings = (req, res, next) => { 
    res.render("store/bookings", {
      pageTitle: "My bookings",
      currentPage: "Bookings",
    })
};

exports.getFavouriteList = (req, res, next) => {
  Favourite.getFavourite().then(favourites => {
    favourites=favourites.map(fav => fav.houseId);
    Home.featchAll().then(registeredHomes=>{
      console.log(favourites,registeredHomes);
    const  favouriteHomes = registeredHomes.filter(home=>favourites.includes(home._id.toString()));
      res.render("store/favourite-list", {     
        favouriteHomes: favouriteHomes,
        pageTitle: "My Favorites",
        currentPage: "Favorites",
      })
   });
  });
};


// add favourites
exports.postAddToFavourite = (req, res, next) => {
  const homeId = req.body.id;
  const fav = new Favourite(homeId)
  fav.save().then(result=>{
    console.log('Fav added:',result);
  }).catch(err =>{
     console.log("Error while marking favourite", err);
  }).finally(()=>{
      res.redirect("/favourites");
  })
};
// remove favourites 
exports.postRemoveFromFavourite = (req, res, next) => {
  const homeId =req.params.homeId;
  Favourite.deleteById(homeId)
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
      });
    }
  });
};
