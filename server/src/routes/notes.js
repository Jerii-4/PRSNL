import express from "express";
import {
  saveNote,
  updateNote,
  deleteNote,
  getNotes,
} from "../services/firebaseService.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// Create note
router.post("/", verifyToken, async (req, res) => {
  try {
    const { content, dueTime, emailReminder, position } = req.body;
    const userId = req.user.uid;

    const note = {
      id: `note_${Date.now()}`,
      content,
      dueTime,
      emailReminder,
      position: position || { x: 100, y: 100 },
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await saveNote(userId, note);
    res.status(201).json(note);
  } catch (error) {
    console.error("Create note error:", error);
    res.status(500).json({ message: "Failed to create note" });
  }
});

// Update note
router.put("/:noteId", verifyToken, async (req, res) => {
  try {
    const { noteId } = req.params;
    const { content, dueTime, position, completed } = req.body;
    const userId = req.user.uid;

    await updateNote(userId, noteId, {
      content,
      dueTime,
      position,
      completed,
      updatedAt: new Date().toISOString(),
    });

    res.json({ message: "Note updated" });
  } catch (error) {
    console.error("Update note error:", error);
    res.status(500).json({ message: "Failed to update note" });
  }
});

// Delete note
router.delete("/:noteId", verifyToken, async (req, res) => {
  try {
    const { noteId } = req.params;
    const userId = req.user.uid;

    await deleteNote(userId, noteId);
    res.json({ message: "Note deleted" });
  } catch (error) {
    console.error("Delete note error:", error);
    res.status(500).json({ message: "Failed to delete note" });
  }
});

// Get all notes
router.get("/", verifyToken, async (req, res) => {
  try {
    const userId = req.user.uid;
    const notes = await getNotes(userId);
    res.json(notes);
  } catch (error) {
    console.error("Fetch notes error:", error);
    res.status(500).json({ message: "Failed to fetch notes" });
  }
});

export default router;
