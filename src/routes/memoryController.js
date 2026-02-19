import {
  createMemory,
  getMemoriesByTimeline,
  updateMemory,
  deleteMemory,
} from "../controllers/memoryController";
import express from "express";

const memoryRouter = express.Router({ mergeParams: true });

memoryRouter.post("/timelines/:timelineId/memories", createMemory);
memoryRouter.get("/timelines/:timelineId/memories", getMemoriesByTimeline);

memoryRouter.patch("/memories/:id", updateMemory);
memoryRouter.delete("/memories/:id", deleteMemory);

export default memoryRouter;
