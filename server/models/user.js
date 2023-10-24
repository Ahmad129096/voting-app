const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  // firstName: String,
  // lastName: String,
  email: String,
  username: String,
  password: String, // Assuming you are storing a hashed password
  rePassword: String, // Assuming you are storing a hashed rePassword
});

const User = mongoose.model("User", userSchema);

module.exports = User;
