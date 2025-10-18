

exports.getLogin=(req,res,next)=>{
  res.render("auth/login",{pageTitle:"Login",
    currentPage:"login",
    isLoggedIn:false
  });
};


exports.postLogin =(req,res,next)=>{
  console.log(req.body)
  res.isLoggedin =true;
  res.redirect("/");
}
