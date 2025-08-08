const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    unique: true,
  },
});

// Add a pre-save hook to auto-generate the username from email
userSchema.pre("save", function (next) {
  if (!this.username && this.email) {
    this.username = this.email.split("@")[0]; // generate from email
  }
  next();
});

module.exports = mongoose.model("User", userSchema);
