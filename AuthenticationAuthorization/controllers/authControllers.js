const { check, validationResult } = require("express-validator");
const User = require("../models/user");
const bcrypt =require("bcryptjs");

exports.getLogin = (req, res) => {
  res.render("auth/login", {
    pageTitle: "Login",
    currentPage: "login",
    isLoggedIn: false,
    errors:[],
    oldInnput:{email:""},
    user:{},
  });
};


exports.getsignup = (req, res) => {
  res.render("auth/signup", {
    pageTitle: "signup",
    currentPage: "Sign Up",
    isLoggedIn: false,
    errors: [],
    oldInput: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      userType: "",
      
    },
    user: {},
  });
};


exports.postsignup = [

  check("firstName")
    .trim()
    .isLength({ min: 2 })
    .withMessage("First name is required")
    .matches(/^[A-Za-z\s]+$/)
    .withMessage("First name must contain only letters"),

  check("lastName")
    .matches(/^[A-Za-z\s]*$/)
    .withMessage("Last name must contain only letters"),

  check("email")
    .isEmail()
    .withMessage("Please enter valid email")
    .normalizeEmail(),

  check("password")
    .isLength({ min: 8 })
    .withMessage("Password must be 8 characters long")
    .matches(/[A-Z]/)
    .withMessage("Must contain uppercase letter")
    .matches(/[a-z]/)
    .withMessage("Must contain lowercase letter")
    .matches(/[!@#$%^&*]/)
    .withMessage("Must contain special character"),

  check("confirmPassword")
    .custom((value, { req }) => {
      if (value !== req.body.password) throw new Error("Passwords do not match");
      return true;
    }),

  check("userType")
    .notEmpty()
    .withMessage("User type is required")
    .isIn(["guest", "host"])
    .withMessage("Invalid user type"),

  check("terms")
    .notEmpty()
    .withMessage("Please accept Terms & Conditions"),

  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).render("auth/signup", {
      pageTitle: "signup",
      currentPage: "SignUp",
      isLoggedIn: false,
      errors: errors.array().map(e => e.msg),
      oldInput: {
        firstName: req.body.firstName || "",
        lastName: req.body.lastName || "",
        email: req.body.email || "",
        password: req.body.password || "",
        confirmPassword: req.body.confirmPassword || "",
        userType: req.body.userType || "",
        terms: req.body.terms ? "on" : ""
      },
      user: {},
});
    }

   //  FIX: Extract values before using them
  const { firstName, lastName, email, password, userType } = req.body;

    bcrypt.hash(password ,12).then(hashedPassword=>{
      const user =new User({firstName,lastName,email,password:hashedPassword,userType});
      return user.save();
    }).then(()=>{
      res.redirect("/login");
    }).catch(err=>{
      return res.status(422).render("auth/signup", {
        pageTitle: "Signup",
        currentPage: "signup",
        isLoggedIn: false,
        errors: [err.message],
        oldInput: req.body,
        user:{},
      });
    });
    }
];

exports.postLogin = async (req, res) => {
  const {email,password} =req.body;
  const user= await User.findOne({email});
  if(!user){
    return res.status(422).render("auth/login",{
      pageTitle:"Login",
      currentPage: "login",
      // isLoggedIn:false,
      errors:["User dose not exixt"],
      oldInput:req.body,
      user:{},
    });
  }

  const isMatch=await bcrypt.compare(password,user.password);
  if(!isMatch){
      return res.status(422).render("auth/login",{
      pageTitle:"Login",
      currentPage: "login",
      isLoggedIn:false,
      errors:["Invalid Password"],
      oldInput:req.body
    })
  }
  req.session.isLoggedin = true;
  req.session.user=user;
  await req.session.save();
  res.redirect("/");
};

exports.postlogout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};
