import {
  getTimelines,
  getTimelineById,
  createTimeline,
  deleteTimeline,
  updateTimeline,
} from "../controllers/timelineController.js";
import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", verifyToken, getTimelines);
router.get("/:id", verifyToken, getTimelineById);
router.post("/", verifyToken, createTimeline);
router.patch("/:id", verifyToken, updateTimeline);
router.delete("/:id", verifyToken, deleteTimeline);

export default router;
