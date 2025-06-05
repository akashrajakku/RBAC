import { User } from "../models/schema.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

export const addUsers = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: 'Email is required.' });
        }

        try {
            const existingEmail = await User.findOne({ email });

            if (existingEmail) {
                const existingPassword = await User.findOne({ email, password: { $exists: true } });

                if (existingPassword) {
                    res.status(200).json({
                        successCode: 1,
                        message: "Email exists and password exists too"
                    })
                } else {
                    res.status(200).json({
                        successCode: 2,
                        message: "Email exists but password don't"
                    })
                }
            } else {
                res.status(200).json({
                    successCode: 0,
                    message: "Email do not exist"
                })
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({
                error: error
            })
        }

    }

    catch (error) {
        res.status(500).json({
            message: "internal server error",
            error: error
        })
    }
}

export const getUsers = async (req, res) => {
    res.json({
        message: "hi from users"
    })
}

export const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(200).json({
                message: "Fill all details",
                success: false,
            });
        }

        let user = await User.findOne({ email });
        if (!user) {
            return res.status(200).json({
                success: false,
                message: "User not found",
            });
        }

        const validatepassword = await argon2.verify(user.password, password);
        if (!validatepassword) {
            return res.status(200).json({
                message: "Incorrect password",
                success: false,
            });
        }

        try {
            const token = jwt.sign({
                userId:
                    user._id
            }, process.env.JWT_SECRET, {
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
                user,
                token
            });
        } catch (error) {
            return res.status(200).json({
                message:"error with token handling",
                success: false
            })
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Something went wrong, please try again later.",
            success: false,
        });
    }
}

export const userSignup = async (req, res) => {

    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(200).json({
                message: "Fill all the details",
                success: false,
            });
        }

        try {
            const user = await User.findOne({ email });
            
            if (user.password) {
                return res.status(200).json({
                    message: "User already exists, kindly login",
                    success: false,
                });
            }

            try {
                const hashedPassword = await argon2.hash(password);
                user.password = hashedPassword;
                await user.save();
            } catch (error) {
                return res.status(200).json({
                    message: "error hashing password",
                    success: false,
                    error: error
                })
            }

            try {
                const token = jwt.sign({
                    userId:
                        user._id
                }, process.env.JWT_SECRET, {
                    expiresIn: "1d",
                });

                return res
                    .cookie("token", token, {
                        sameSite: "strict",
                        maxAge: 1 * 24 * 60 * 60 * 1000,
                    })
                    .json({
                        message: "password set successfully for user",
                        success: true,
                        user: user,
                        token: token
                    });
            } catch (error) {
                return res.status(200).json({
                    message: "error dealing with token",
                    success: false,
                    error: error
                })
            }
        } catch (error) {
            return res.status(500).json({
                message: "Something went wrong, please try again later.",
                success: false,
                error: error
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: "internal server error",
            success: false,
            error: error
        });
    }

}
