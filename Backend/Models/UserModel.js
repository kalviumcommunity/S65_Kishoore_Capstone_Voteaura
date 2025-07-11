const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: [3, "Minimum character length should be 3"],
  },
  UDid: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'],
  },
  phone: {
    type: String,
    required: true,
  },
  district:{
        type: String,
        required: true,
  },
  state:{
        type: String,
        required: true,
  },
  proof: {
    type: [String],
    required: true,
  },
  UDidimg: {
    type: [String],
    required: true,
  },
  passportImage: {
    type: [String],
    required: true,
  },
  status: {
     type: String,
      enum:['active','approved','stopped','rejected'],
      default:'stopped' 
    },
  password:{
    type:String
  },
  hasVoted: { 
    type: Boolean, 
    default: false 
  }
})

module.exports = mongoose.model("User", UserSchema);

