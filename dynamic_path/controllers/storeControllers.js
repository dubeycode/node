
const Home =require("../models/home")


// home index
exports.getIndex=(req,res,next)=>{
  Home.featchAll((homes)=>res.render("store/index", {
    pageTitle: "airbnb Home",
    registeredHomes: homes,
    currentPage:'index'
  })
);   
};
// get home
exports.getHomes=(req,res,next)=>{
  Home.featchAll((homes)=>res.render("store/home-list", {
    pageTitle: "airbnb Home",
    registeredHomes: homes,
    currentPage:'Homes List'
  })
);   
};

exports.getbookings=(req,res,next)=>{
  Home.featchAll((homes)=>res.render("store/bookings", {
    pageTitle: "My bookings",
    currentPage:'Bookings'
  })
);   
};


exports.getFavouriteList=(req,res,next)=>{
  Home.featchAll((homes)=>res.render("store/favourite-list", {
    registeredHomes: homes,
    pageTitle: "My Favorites",
    currentPage:'Favorites'
  })
);   
};


exports.getHomeDetails=(req,res,next)=>{
  const homeId=req.params.homeId;
  console.log("At home details page",homeId);
  res.render("store/home-detils",{
    pageTitle: "Home Details",
    currentPage:'home',
  })
};