import { useState, useEffect } from "react";
import { LogOut, Mic, RotateCcw, Clock } from "lucide-react";
import { SevenDayList } from "./SevenDayList";
import { NotesCanvas } from "./NotesCanvas";
import { UndoToast } from "./UndoToast";
import { useSyncManager } from "../hooks/useSyncManager";

export function MainLayout({ user, onLogout }) {
  const [notes, setNotes] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isRecording, setIsRecording] = useState(false);
  const [undoStack, setUndoStack] = useState([]);
  const [showUndoToast, setShowUndoToast] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);
  const { syncNotes } = useSyncManager(user?.uid);

  useEffect(() => {
    // Load notes from IndexedDB
    loadNotesForDate(selectedDate);
  }, [selectedDate]);

  const loadNotesForDate = async (date) => {
    // Load from IndexedDB
    const dateStr = date.toISOString().split("T")[0];
    // TODO: Fetch from DB
  };

  const handleAddNote = (noteData) => {
    const newNote = {
      id: Date.now().toString(),
      content: noteData.content,
      timestamp: new Date(),
      dueTime: noteData.dueTime,
      position: noteData.position || { x: 100, y: 100 },
      completed: false,
      emailReminder: noteData.emailReminder,
    };

    setUndoStack([...undoStack, { action: "add", note: newNote }]);
    setNotes([...notes, newNote]);
    syncNotes([...notes, newNote]);
  };

  const handleUndo = () => {
    if (undoStack.length === 0) return;

    const lastAction = undoStack[undoStack.length - 1];
    setUndoStack(undoStack.slice(0, -1));
    setShowUndoToast(true);
    setTimeout(() => setShowUndoToast(false), 3000);

    if (lastAction.action === "add") {
      setNotes(notes.filter((n) => n.id !== lastAction.note.id));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("stickyAiUser");
    localStorage.removeItem("stickyAiToken");
    onLogout();
  };

  return (
    <div className="h-screen flex bg-gray-50">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 shadow-sm flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-800">Sticky AI</h1>
            <img
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email}`}
              alt="User"
              className="w-10 h-10 rounded-full cursor-pointer hover:ring-2 ring-blue-500"
            />
          </div>
          <p className="text-sm text-gray-600">{user?.email}</p>
        </div>

        {/* Timer and Controls */}
        <div className="p-4 border-b border-gray-200 space-y-3">
          <button
            onClick={() => setIsRecording(!isRecording)}
            className={`w-full flex items-center justify-center gap-2 py-2 rounded-lg font-semibold transition-all ${
              isRecording
                ? "bg-red-500 text-white animate-pulse"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
          >
            <Mic className="w-5 h-5" />
            {isRecording ? "Recording..." : "Start Recording"}
          </button>

          <div className="flex gap-2">
            <button
              onClick={handleUndo}
              disabled={undoStack.length === 0}
              className="flex-1 flex items-center justify-center gap-2 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg font-semibold disabled:opacity-50"
            >
              <RotateCcw className="w-4 h-4" />
              Undo
            </button>
            <button
              onClick={handleLogout}
              className="flex-1 flex items-center justify-center gap-2 py-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg font-semibold"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>

        {/* Days List */}
        <div className="flex-1 overflow-auto p-4">
          <h2 className="text-sm font-semibold text-gray-700 mb-3">
            Previous 7 Days
          </h2>
          <SevenDayList
            selectedDate={selectedDate}
            onDateSelect={setSelectedDate}
          />
        </div>
      </div>

      {/* Main Canvas */}
      <div className="flex-1 relative">
        <NotesCanvas
          notes={notes}
          onAddNote={handleAddNote}
          isRecording={isRecording}
        />
      </div>

      {/* Undo Toast */}
      {showUndoToast && <UndoToast />}
    </div>
  );
}
