import express from "express";
import { signup, login, me } from "../controllers/authController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.post("/signup", signup);
router.post("/login", login);

// Protected route
router.get("/me", verifyToken, me);

export default router;
