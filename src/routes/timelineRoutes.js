import {
  getTimelines,
  getTimelineById,
  createTimeline,
  deleteTimeline,
  updateTimeline,
} from "../controllers/timelineController.js";
import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";

const timelineRouter = express.Router();

timelineRouter.get("/", verifyToken, getTimelines);
timelineRouter.get("/:id", verifyToken, getTimelineById);
timelineRouter.post("/", verifyToken, createTimeline);
timelineRouter.patch("/:id", verifyToken, updateTimeline);
timelineRouter.delete("/:id", verifyToken, deleteTimeline);
export default timelineRouter;
