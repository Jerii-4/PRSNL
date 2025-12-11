import express from "express";
import cors from "cors";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import dotenv from "dotenv";

// Load environment variables from .env.local
dotenv.config({
  path: join(dirname(fileURLToPath(import.meta.url)), "../../.env.local"),
});

// Routes
import authRoutes from "./routes/auth.js";
import syncRoutes from "./routes/sync.js";
import notesRoutes from "./routes/notes.js";
import transcribeRoutes from "./routes/transcribe.js";

// Services
import { initializeFirebase } from "./services/firebaseService.js";
import { startScheduler } from "./cron/scheduler.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// In production, serve static files
if (process.env.NODE_ENV === "production") {
  app.use(express.static(join(__dirname, "../client/dist")));
}

// Initialize Firebase
initializeFirebase();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/sync", syncRoutes);
app.use("/api/notes", notesRoutes);
app.use("/api", transcribeRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Serve client (production only)
if (process.env.NODE_ENV === "production") {
  app.get("*", (req, res) => {
    res.sendFile(join(__dirname, "../client/dist/index.html"));
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(500)
    .json({ message: "Internal server error", error: err.message });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(
    `📧 Email service: ${process.env.BREVO_API_KEY ? "Enabled" : "Disabled"}`
  );
  console.log(`🔥 Firebase initialized: ${process.env.FIREBASE_PROJECT_ID}`);
});

// Start cron scheduler
startScheduler();
