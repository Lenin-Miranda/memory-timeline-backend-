import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./src/routes/timelineRoutes.js";
import authRoutes from "./src/routes/authRoutes.js";

dotenv.config();

export const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/timelines", router);
app.use("/api/auth", authRoutes);
app.post("/api/auth/test", (req, res) => res.json({ test: "works" }));

app.get("/health", (req, res) => {
  res.json({ ok: true });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});

export default app;
