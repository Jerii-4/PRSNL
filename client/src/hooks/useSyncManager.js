import { useCallback, useRef } from "react";
import axios from "axios";

export function useSyncManager(userId) {
  const syncTimeoutRef = useRef(null);

  const syncNotes = useCallback(
    async (notes) => {
      if (!userId) return;

      try {
        await axios.post(
          "/api/sync/notes",
          {
            userId,
            notes,
            timestamp: new Date().toISOString(),
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("stickyAiToken")}`,
            },
          }
        );
      } catch (error) {
        console.error("Sync failed:", error);
      }
    },
    [userId]
  );

  const debouncedSync = useCallback(
    (notes) => {
      clearTimeout(syncTimeoutRef.current);
      syncTimeoutRef.current = setTimeout(() => {
        syncNotes(notes);
      }, 3000);
    },
    [syncNotes]
  );

  return { syncNotes, debouncedSync };
}
