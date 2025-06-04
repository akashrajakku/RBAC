import argon2 from "argon2";
import { Admin} from "../models/schema.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(404).json({
        message: "Fill all the details",
        success: false,
      });
    }
    const admin = await Admin.findOne({ email });
    if (admin) {
      return res.status(404).json({
        message: "Admin already exists",
        success: false,
      });
    }
    const tempAdmin = new Admin({
      username,
      email,
      password,
    });
    await tempAdmin.validate();
    const hashedPassword = await argon2.hash(password);

    const newAdmin = new Admin({
      username,
      email,
      password: hashedPassword,
    });
    await newAdmin.save();

    return res.status(201).json({
      message: "Admin created",
      success: true,
      admin: newAdmin,
    });

  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: error.message,
        success: false,
        error:"validate"
      });
    }
    //console.error(error);
    return res.status(500).json({
      message: "Something went wrong, please try again later.",
      success: false,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "Fill all details",
        success: false,
      });
    }
    let admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }
    const validatepassword = await argon2.verify(admin.password, password);
    if (!validatepassword) {
      return res.status(401).json({
        message: "Incorrect email or password",
        success: false,
      });
    }
    const token = jwt.sign({ userId:
      Admin._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res
      .cookie("token", token, {
        sameSite: "strict",
        secure: true,
        maxAge: 1 * 24 * 60 * 60 * 1000,
      })
      .json({
        message: "Welcome",
        success: true,
        admin,
      });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Something went wrong, please try again later.",
      success: false,
    });
  }
};

export const logout = async (_, res) => {
  try {
    return res.cookie("token", "", { maxAge: 0 }).json({
      message: "Logout successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
}; 