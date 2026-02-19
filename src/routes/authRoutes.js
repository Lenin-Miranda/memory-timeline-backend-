import express from "express";
import { signup, login, me } from "../controllers/authController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const authRouter = express.Router();

// Public routes
authRouter.post("/signup", signup);
authRouter.post("/login", login);

// Protected route
authRouter.get("/me", verifyToken, me);

export default authRouter;
