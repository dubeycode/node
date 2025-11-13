

exports.getLogin=(req,res,next)=>{
  res.render("auth/login",{pageTitle:"Login",
    currentPage:"login",
    isLoggedIn:false
  });
};


exports.postLogin =(req,res,next)=>{
  console.log(req.body)
  res.cookie("isLoggedin",true)
  // res.isLoggedin =true;
  res.redirect("/");
}

exports.postlogout=(req,res,next)=>{
  console.log("logout sucessfully");
  res.cookie("isLoggedin",false)
  res.redirect("/");
}