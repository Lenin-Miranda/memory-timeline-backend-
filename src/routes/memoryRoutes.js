import { Router } from "express";
import {
  createMemory,
  getMemoriesByTimeline,
  getMemoryById,
  updateMemory,
  deleteMemory,
} from "../controllers/memoryController.js";

const router = Router();

// Memory routes
router.post("/timelines/:timelineId/memories", createMemory);
router.get("/timelines/:timelineId/memories", getMemoriesByTimeline);
router.get("/memories/:id", getMemoryById);
router.patch("/memories/:id", updateMemory);
router.delete("/memories/:id", deleteMemory);

export default router;
