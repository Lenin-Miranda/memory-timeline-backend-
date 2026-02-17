import {
  getTimelines,
  getTimelineById,
  createTimeline,
  deleteTimeline,
  updateTimeline,
} from "../controllers/timelineController.js";
import express from "express";

const router = express.Router();

router.get("/", getTimelines);
router.get("/:id", getTimelineById);
router.post("/", createTimeline);
router.patch("/:id", updateTimeline);
router.delete("/:id", deleteTimeline);

export default router;
