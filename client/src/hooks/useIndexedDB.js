import { useEffect, useState } from "react";

export function useIndexedDB() {
  const [db, setDb] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const initDB = async () => {
      return new Promise((resolve, reject) => {
        const request = indexedDB.open("StickyAiDB", 1);

        request.onerror = () => reject(request.error);
        request.onsuccess = () => {
          const database = request.result;
          setDb(database);
          setReady(true);
          resolve(database);
        };

        request.onupgradeneeded = (event) => {
          const db = event.target.result;

          if (!db.objectStoreNames.contains("notes")) {
            const store = db.createObjectStore("notes", { keyPath: "id" });
            store.createIndex("userId", "userId", { unique: false });
            store.createIndex("dueTime", "dueTime", { unique: false });
          }
        };
      });
    };

    initDB().catch(console.error);
  }, []);

  const saveNote = async (note) => {
    if (!db) return;
    const tx = db.transaction("notes", "readwrite");
    const store = tx.objectStore("notes");
    return store.put(note);
  };

  const getNotes = async (userId) => {
    if (!db) return [];
    const tx = db.transaction("notes", "readonly");
    const store = tx.objectStore("notes");
    const index = store.index("userId");

    return new Promise((resolve) => {
      const request = index.getAll(userId);
      request.onsuccess = () => resolve(request.result);
    });
  };

  const deleteNote = async (noteId) => {
    if (!db) return;
    const tx = db.transaction("notes", "readwrite");
    const store = tx.objectStore("notes");
    return store.delete(noteId);
  };

  return { db, ready, saveNote, getNotes, deleteNote };
}
