
const Home =require("../models/home")

// add home logic 
exports.getAddHome=(req,res,next)=>{
  res.render('addhome',{pageTitle:'Add home to airbnb' ,currentPage:'Home'});
};

//  addhome logic
exports.postAddHome=(req, res, next) => {
  console.log('Home Registration successful for:', req.body);
  const {housename,price,location,rating,photo}=req.body;

  const home = new Home(housename,price,location,rating,photo);

  home.save()
  res.render('home_Add', {pageTitle: 'Home Added Successfully', currentPage: 'homeAdded'});
};

// home page logic
exports.getHomes=(req,res,next)=>{
  Home.featchAll((homes)=>res.render("home", {
    pageTitle: "airbnb Home",
    registeredHomes: homes,
    currentPage:'Home'
  })
);   
};


