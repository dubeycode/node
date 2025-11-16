const { check, validationResult } = require("express-validator");
const User = require("../models/user");

exports.getLogin = (req, res) => {
  res.render("auth/login", {
    pageTitle: "Login",
    currentPage: "login",
    isLoggedIn: false
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
      confirmPassword: "",
      userType: "",
      terms: ""
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
      currentPage: "Sign Up",
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

    try {
      const { firstName, lastName, email, password, userType } = req.body;

      const user = new User({
        firstName,
        lastName,
        email,
        password,
        userType
      });

      await user.save();
      res.redirect("/login");
    } catch (err) {
      return res.status(422).render("auth/signup", {
        pageTitle: "Signup",
        currentPage: "signup",
        isLoggedIn: false,
        errors: [err.message],
        oldInput: req.body
      });
    }
  }
];

exports.postLogin = (req, res) => {
  req.session.isLoggedin = true;
  res.redirect("/");
};

exports.postlogout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};
