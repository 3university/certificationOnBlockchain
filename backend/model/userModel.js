const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  institute_id: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirm_password: {
    type: String,
    required: true,
  },
  institute_role: {
    type: String,
    required: true,
  },
  user_status:{
    type:String,
    default:"unverified"
  }
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
