

exports.getLogin=(req,res,next)=>{
  res.render("auth/login",{pageTitle:"Login",
    currentPage:"login",
    isLoggedIn:false
  });
};


exports.postLogin =(req,res,next)=>{
  console.log(req.body)
  req.session.isLoggedin=true;
  // res.cookie("isLoggedin",true)
  // res.isLoggedin =true;
  res.redirect("/");
}

exports.postlogout=(req,res,next)=>{
  // console.log("logout sucessfully");
  req.session.destroy(()=>{
    res.redirect("/");
  })

}