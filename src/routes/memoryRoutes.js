import { Router } from "express";
import {
  createMemory,
  getMemoriesByTimeline,
  getMemoryById,
  updateMemory,
  deleteMemory,
} from "../controllers/memoryController.js";

const memoryRouter = Router();

memoryRouter.post("/timelines/:timelineId/memories", createMemory);
memoryRouter.get("/timelines/:timelineId/memories", getMemoriesByTimeline);
memoryRouter.get("/memories/:id", getMemoryById);
memoryRouter.patch("/memories/:id", updateMemory);
memoryRouter.delete("/memories/:id", deleteMemory);

export default memoryRouter;
