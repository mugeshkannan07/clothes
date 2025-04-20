import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import ProductUserModel from "../models/userSchema.js";
import upload from "../middleware/ClothsMulter.js";

const router = express.Router();
const JWT_SECRET = "900f84be81b45b6e08c26bbe09e93ee3989bead8c516a41ea64eeee2c0b985d8759036c549d0f69a062072a25dda5cbf537c7e018d5e2689ad4888a4c06cfcda";

// Register with image
router.post("/register", upload.single("image"), async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : "";

    if (!name || !email || !password) return res.status(400).json({ error: "All fields are required" });

    const existingUser = await ProductUserModel.findOne({ email });
    if (existingUser) return res.status(400).json({ error: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new ProductUserModel({ name, email, password: hashedPassword, image });
    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, { expiresIn: "7d" });

    res.status(201).json({
      message: "User registered successfully",
      token,
      userId: newUser._id,
      name: newUser.name,
      image: newUser.image || ""
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await ProductUserModel.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Incorrect password" });

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "7d" });

    res.json({
      message: "Login successful",
      token,
      userId: user._id,
      name: user.name,
      image: user.image || ""
    });
  } catch (err) {
    res.status(500).json({ error: "Login failed" });
  }
});

export default router;
