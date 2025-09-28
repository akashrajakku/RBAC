import mongoose from "mongoose";

const emailRegexPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const adminSchema = mongoose.Schema({
  username: { type: String, required: [true, "Please enter your username"] },
  email: {
    type: String,
    required: [true, "please enter your email"],
    validate: {
      validator: (value) => emailRegexPattern.test(value),
      message: "Please enter a valid email",
    },
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please enter password"],
    minlength: [8, "password must 8 chars"],
  },
  roleId: {
    type: Number,
    default: 0
  },
  role: {
    type: String,
    default: "admin",
  }
});

export const Admin = mongoose.model("Admin", adminSchema);


const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please enter your username"],
    trim: true
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
    validate: {
      validator: (value) => emailRegexPattern.test(value),
      message: "Please enter a valid email",
    },
  },
  department: {
    type: String,
    required: [true, "Please enter your department"],
    trim: true
  },
  roleId: {
    type: Number,
    default: 1
  },
  role: {
    type: String,
    default: "manager",
  },
  active: { 
    type: Number, 
    default: 1 
  },
  password: {
    type: String,
    required: false,
    minlength: 6,
  },
});

export const User = mongoose.model("User", userSchema);
