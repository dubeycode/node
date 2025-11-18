
const Home =require("../models/home")
const fs =require("fs");

// add home logic 
exports.getAddHome=(req,res,next)=>{
  res.render('host/edit-home',{pageTitle:'Add home to airbnb' ,currentPage:'Home', editing:false,
    isLoggedIn:req.isLoggedIn,
    user:req.session.user,
  });
};


exports.getEditHome=(req,res,next)=>{
  const homeId =req.params.homeId;
  const editing =req.query.edting === 'true' ;
  Home.findById(homeId).then(home=>{
    if(!home){
      console.log("Home not found for edit");
      return res.redirect("/host/host-home-list")
    }
  console.log(homeId,editing,home);
  res.render('host/edit-home',{home:home,pageTitle:'Edit your Home' ,currentPage:'host-homes',
  editing:editing,isLoggedIn:req.isLoggedIn,
  user:req.session.user,
  });
  });
};


exports.getHostHomes=(req,res,next)=>{
   Home.find().then(registeredHomes=>{
    res.render("host/host-home-list", {
    pageTitle: "Host Home List",
    registeredHomes: registeredHomes,
    currentPage:'host-homes',
    isLoggedIn:req.isLoggedIn,
    user:req.session.user,
  })
  });   
};


//  post add home logic
exports.postAddHome=(req, res, next) => {
  const {housename,price,location,rating,descraption}=req.body;
  // console.log(housename,price,location,rating,descraption); 
  // console.log(req.file)

  if(!req.file){
    return  res.status(422).send("No image provided");
  }

  const photo = req.file.path;

  const home = new Home({housename,price,location,rating,photo,descraption});
  home.save().then(()=>{
    console.log('Home Saved sucessfully');
  })
  res.redirect('/host/host-home-list');
};


// post edit home 

exports.postEditHome=(req, res, next) => {
  console.log('Home Registration successful for:', req.body);
  const { id ,housename,price,location,rating,descraption}=req.body;
  Home.findById(id).then((home)=>{
    home.housename=housename;
    home.price=price;
    home.location=location;
    home.rating=rating;
    home.descraption=descraption;
    if(req.file){
      fs.unlink(home.photo,(err)=>{
        if(err){
          console.log("Error while deleting file",err);
        }
      })
      home.photo=req.file.path;
    }


    home.save().then(result=>{
    console.log("Home updated",result);
  }).catch(err=>{
    console.log("Error while updating");
  })
  res.redirect('/host/host-home-list');
  }).catch(err =>{
    console.log("Error while finding home",err);
  })
};


//delete
exports.postDeleteHome=(req,res,next)=>{
  const homeId = req.params.homeId;
  console.log("came to delete home",homeId)
  Home.findByIdAndDelete(homeId).then(()=>{
    res.redirect("/host/host-home-list");
  }).catch(error=>{
    console.log('Error while deleting',error)
  })
};
