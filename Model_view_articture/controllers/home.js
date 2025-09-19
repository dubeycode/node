

// array 
const registerHome=[]

// add home logic 
exports.getAddHome=(req,res,next)=>{
  res.render('addhome',{pageTitle:'Add home to airbnb' ,currentPage:'Home'});
};

//  addhome logic
exports.postAddHome=(req, res, next) => {
  console.log('Home Registration successful for:', req.body);
  registerHome.push(req.body);
  res.render('home_Add', {pageTitle: 'Home Added Successfully', currentPage: 'homeAdded'});
};

// home page logic
exports.getHomes=(req,res,next)=>{
  console.log(registerHome)
   res.render("home", {
    pageTitle: "airbnb Home",
    registeredHomes: registerHome,
    currentPage:'Home'

  });
}


