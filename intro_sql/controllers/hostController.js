
const Home =require("../models/home")

// add home logic 
exports.getAddHome=(req,res,next)=>{
  res.render('host/edit-home',{pageTitle:'Add home to airbnb' ,currentPage:'Home', editing:false,});
};


exports.getEditHome=(req,res,next)=>{
  const homeId =req.params.homeId;
  const editing =req.query.edting === 'true' ;
  Home.findById(homeId,home=>{
    if(!home){
      console.log("Home not found for edit");
      return res.redirect("/host-home-list")
    }
  console.log(homeId,editing,home);
  res.render('host/edit-home',{home:home,pageTitle:'Edit your Home' ,currentPage:'host-homes',
  editing:editing,
  });
  });
};


exports.getHostHomes=(req,res,next)=>{
   Home.featchAll().then(([registeredHomes])=>{
    res.render("host/host-home-list", {
    pageTitle: "Host Home List",
    registeredHomes: registeredHomes,
    currentPage:'host-homes'
  })
  });   
};


//  post add home logic
exports.postAddHome=(req, res, next) => {
  console.log('Home Registration successful for:', req.body);
  const {housename,price,location,rating,photo}=req.body;

  const home = new Home(housename,price,location,rating,photo);

  home.save()
  res.redirect('host/host-home-list');
};


// post edit home 

exports.postEditHome=(req, res, next) => {
  console.log('Home Registration successful for:', req.body);
  const { id ,housename,price,location,rating,photo}=req.body;
  const home = new Home(housename,price,location,rating,photo);
  home.id=id;
  home.save();
  res.redirect('/host/host-home-list');
};


//delete
exports.postDeleteHome=(req,res,next)=>{
  const homeId = req.params.homeId;
  console.log("came to delete home",homeId)
  Home.deleteById(homeId,error=>{
    if(error){
      console.log("error while deleting",error);
    }
 res.redirect("/host/host-home-list");
  })
};
