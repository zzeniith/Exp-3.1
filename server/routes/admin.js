import express from "express";
import { verifyToken, isAdmin } from "../middleware/auth.js";

const router = express.Router();

router.get("/dashboard", verifyToken, isAdmin, (req, res) => {
  res.json({ msg: "Welcome Admin Dashboard" });
});

export default router;