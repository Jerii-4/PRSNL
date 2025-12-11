import admin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config();

let db;

export function initializeFirebase() {
  try {
    if (!admin.apps.length) {
      const privateKey = process.env.FIREBASE_PRIVATE_KEY
        ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n")
        : null;

      if (
        !privateKey ||
        !process.env.FIREBASE_PROJECT_ID ||
        !process.env.FIREBASE_CLIENT_EMAIL
      ) {
        throw new Error(
          "Missing Firebase credentials in environment variables"
        );
      }

      const serviceAccount = {
        projectId: process.env.FIREBASE_PROJECT_ID,
        privateKey: privateKey,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      };

      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        projectId: process.env.FIREBASE_PROJECT_ID,
      });

      db = admin.firestore();
      console.log("✅ Firebase initialized successfully");
      console.log(`📁 Project: ${process.env.FIREBASE_PROJECT_ID}`);
    }
  } catch (error) {
    console.error("❌ Firebase initialization error:", error.message);
    process.exit(1);
  }
}

export function getFirestoreDB() {
  return db;
}

export async function saveNote(userId, note) {
  try {
    const docRef = await db
      .collection("users")
      .doc(userId)
      .collection("notes")
      .doc(note.id)
      .set(note);
    return { id: note.id, ...note };
  } catch (error) {
    console.error("Error saving note:", error);
    throw error;
  }
}

export async function getNotes(userId) {
  try {
    const snapshot = await db
      .collection("users")
      .doc(userId)
      .collection("notes")
      .get();
    return snapshot.docs.map((doc) => doc.data());
  } catch (error) {
    console.error("Error fetching notes:", error);
    throw error;
  }
}

export async function deleteNote(userId, noteId) {
  try {
    await db
      .collection("users")
      .doc(userId)
      .collection("notes")
      .doc(noteId)
      .delete();
  } catch (error) {
    console.error("Error deleting note:", error);
    throw error;
  }
}

export async function updateNote(userId, noteId, updates) {
  try {
    await db
      .collection("users")
      .doc(userId)
      .collection("notes")
      .doc(noteId)
      .update(updates);
  } catch (error) {
    console.error("Error updating note:", error);
    throw error;
  }
}

export async function getUserByEmail(email) {
  try {
    const snapshot = await db
      .collection("users")
      .where("email", "==", email)
      .get();
    return snapshot.docs[0]?.data() || null;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
}

export async function createUser(userData) {
  try {
    const docRef = await db.collection("users").doc(userData.uid).set(userData);
    return { uid: userData.uid, ...userData };
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}
