const Favourite = require("../models/favourite");
const Home = require("../models/home");

// home index
exports.getIndex = (req, res, next) => {
  Home.featchAll((homes) =>
    res.render("store/index", {
      pageTitle: "airbnb Home",
      registeredHomes: homes,
      currentPage: "index",
    })
  );
};
// get home
exports.getHomes = (req, res, next) => {
  Home.featchAll((homes) =>
    res.render("store/home-list", {
      pageTitle: "airbnb Home",
      registeredHomes: homes,
      currentPage: "Homes List",
    })
  );
};

exports.getbookings = (req, res, next) => {
  Home.featchAll((homes) =>
    res.render("store/bookings", {
      pageTitle: "My bookings",
      currentPage: "Bookings",
    })
  );
};

exports.getFavouriteList = (req, res, next) => {
  Favourite.getFavourite((favourites) => {
    Home.featchAll((homes) => {
    const  favouriteHomes = homes.filter(home=>favourites.includes(home.id));
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
  // console.log("came to add to Favourite",req.body);
  Favourite.addToFavourite(req.body.id, (error) => {
    if (error) {
      console.log("Error while marking favourite", error);
    }
    res.redirect("/favourites");
  });
};
// remove favourites 
exports.postRemoveFromFavourite = (req, res, next) => {
  const homeId =req.params.homeId;
  Favourite.deleteById(homeId,error=>{
    if(error){
      console.log("Error while removing frome favourite",error)
    } 
  })
  res.redirect("/favourites");
};

exports.getHomeDetails = (req, res, next) => {
  const homeId = req.params.homeId;
  // console.log("At home details page",homeId);
  Home.findById(homeId, (home) => {
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
