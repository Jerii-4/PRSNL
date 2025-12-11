import cron from "node-cron";
import admin from "firebase-admin";
import { getNotes, updateNote } from "../services/firebaseService.js";
import { sendReminderEmail } from "../services/emailService.js";

export function startScheduler() {
  // Run every minute to check for notes that need reminders
  cron.schedule("* * * * *", async () => {
    try {
      // This would run periodically to check all notes
      // In production, you'd query all users and check their notes
      console.log("[CRON] Running reminder check...");
    } catch (error) {
      console.error("[CRON] Error in reminder check:", error);
    }
  });

  console.log("✅ Cron scheduler started");
}

export async function scheduleNoteReminder(userId, note) {
  if (!note.emailReminder || !note.dueTime) return;

  const dueDate = new Date(note.dueTime);
  const reminderTime = new Date(dueDate.getTime() - 10 * 60 * 1000); // 10 minutes before

  // Calculate delay
  const delay = reminderTime - new Date();
  if (delay > 0) {
    setTimeout(async () => {
      try {
        // Get user email from database
        const userRef = await admin
          .firestore()
          .collection("users")
          .doc(userId)
          .get();
        const user = userRef.data();

        if (user?.email) {
          await sendReminderEmail(
            user.email,
            note.content.substring(0, 50),
            note.dueTime
          );
          await updateNote(userId, note.id, { reminderSent: true });
        }
      } catch (error) {
        console.error("Error scheduling reminder:", error);
      }
    }, delay);
  }
}
