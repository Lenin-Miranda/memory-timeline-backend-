import {
  getTimelines,
  getTimelineById,
  createTimeline,
  deleteTimeline,
  updateTimeline,
} from "../controllers/timelineController.js";
import express from "express";

const timelineRouter = express.Router();

timelineRouter.get("/", getTimelines);
timelineRouter.get("/:id", getTimelineById);
timelineRouter.post("/", createTimeline);
timelineRouter.patch("/:id", updateTimeline);
timelineRouter.delete("/:id", deleteTimeline);

export default timelineRouter;
