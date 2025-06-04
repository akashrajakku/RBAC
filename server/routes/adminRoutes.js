import express from "express";
import { login, logout, signup } from "../controllers/adminController.js";
import { User } from "../models/schema.js";

const router = express.Router();

router.post("/signup" , signup);
router.post("/login" , login);
router.get("/logout" , logout);

router.get("/", async (req, res) => {
  try {
    const activeUsers = await User.find({ active: 1 });
    res.status(200).json(activeUsers);
  } catch (error) {
    console.error("Error fetching active users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;