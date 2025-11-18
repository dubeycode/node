const mongoose = require("mongoose");
// const favourite = require("./favourite");

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: String,

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  userType: {
    type: String,
    required: true
  },
  favourites:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Home'
  }]
});

module.exports = mongoose.model("User", userSchema);
