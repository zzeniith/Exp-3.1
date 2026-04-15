import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

const router = express.Router();

// REGISTER (optional for testing)
router.post("/register", async (req, res) => {
  const { email, password, role } = req.body;

  const hashed = await bcrypt.hash(password, 10);

  const user = new User({
    email,
    password: hashed,
    role
  });

  await user.save();
  res.json({ msg: "User created" });
});

// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ msg: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ msg: "Wrong password" });

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({ token, role: user.role });
});

export default router;