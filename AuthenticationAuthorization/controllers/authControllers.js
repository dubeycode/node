

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

exports.getsignup=(req,res,next)=>{
  res.render("auth/signup",{pageTitle:"signup",
    currentPage:"signup",
    isLoggedIn:false,
    errors:[],
    oldInput:{firstName:"" ,lastName:"" ,email:"", password:"", userType:""}
  });
};

const { check, validationResult } = require('express-validator');


exports.postsignup=[
  // first name
  check("firstName")
  .trim()
  .isLength({min:2})
  .withMessage('First name is required')
  .matches(/^[a-zA-Z\s]+$/)
  .withMessage('Last name is only contain letters'),

  // last name
  check("lastName")
  .matches(/^[a-zA-Z\s]*$/)
  .withMessage('First name is only contain letters'),

  // email
  check("email")
  .isEmail()
  .withMessage("Plese enter a valid email")
  .normalizeEmail(),

  //password
  check('password')
  .isLength({min:8})
  .withMessage('password must be contain at least 8 characters long')
  .matches(/[a-z]/)
  .withMessage('password contain at least one lowercase letter')
  .matches(/[A-Z]/)
  .withMessage('password contain at least one uppercase letter')
  .matches(/[!@#$%^&*(){}|<>]/)
  .withMessage('password contain at least one special character')
  .trim(),
  //confirm password valdation 
  check('confirm_password')
  .trim()
  .custom((value,{req })=>{
    if(value !== req.body.password){
      throw new Error('password do not match')
    }
    return true;
  }),
  //user Type validation 
  check('userType')
  .notEmpty()
  .withMessage('User type is required')
  .isIn(['guest','host'])
  .withMessage('Invalid user type'),
  //terms 
  check("terms")
  .notEmpty()
  .withMessage("plese accept the terms and condtions")
  .custom((value,{req})=>{
    if(value !=="on"){
      throw new Error("plese accept the terms and condtions")
    }
  }),
  
  (req,res,next)=>{
    const {firstName,lastName,email,password,userType}=req.body;
    const errors = validationResult(req);

    if(!errors.isEmpty()){
      return res.status(422).render('auth/signup',{
        pageTitle:'signup',
        currentPage:'Sign Up',
        isLoggedIn:false,
        errors:errors.array().map(error=>error.msg),
        oldInput:{
          firstName,
          lastName,
          email,
          password,
          userType,
          
        }
      });
    }
  // console.log(req.body); 
  res.redirect("/");
  }]


