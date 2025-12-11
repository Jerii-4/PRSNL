import express from "express";
import { saveNote, getNotes } from "../services/firebaseService.js";
import { verifyToken } from "../middleware/auth.js";
import { scheduleNoteReminder } from "../cron/scheduler.js";

const router = express.Router();

// Sync notes
router.post("/", verifyToken, async (req, res) => {
  try {
    const { notes } = req.body;
    const userId = req.user.uid;

    // Save all notes
    const savedNotes = await Promise.all(
      notes.map((note) => saveNote(userId, note))
    );

    // Schedule reminders for new notes
    notes.forEach((note) => {
      scheduleNoteReminder(userId, note);
    });

    res.json({ message: "Notes synced", count: savedNotes.length });
  } catch (error) {
    console.error("Sync error:", error);
    res.status(500).json({ message: "Sync failed", error: error.message });
  }
});

// Get all notes
router.get("/", verifyToken, async (req, res) => {
  try {
    const userId = req.user.uid;
    const notes = await getNotes(userId);
    res.json(notes);
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(500).json({ message: "Fetch failed", error: error.message });
  }
});

export default router;
