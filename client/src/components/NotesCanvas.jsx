import { StickyNote } from "./StickyNote";
import { useState } from "react";

export function NotesCanvas({ notes, onAddNote, isRecording }) {
  const [draggedNote, setDraggedNote] = useState(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e, noteId) => {
    e.preventDefault();
    const note = notes.find((n) => n.id === noteId);
    setDraggedNote(noteId);
    setOffset({
      x: e.clientX - note.position.x,
      y: e.clientY - note.position.y,
    });
  };

  const handleMouseMove = (e) => {
    if (!draggedNote) return;

    const newX = e.clientX - offset.x;
    const newY = e.clientY - offset.y;
    // Update position
  };

  const handleMouseUp = () => {
    setDraggedNote(null);
  };

  return (
    <div
      className="w-full h-full bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden cursor-default select-none"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Recording Indicator */}
      {isRecording && (
        <div className="absolute top-6 right-6 flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-full shadow-lg">
          <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
          <span className="text-sm font-semibold">Recording...</span>
        </div>
      )}

      {/* Empty State */}
      {notes.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">📝</div>
            <h2 className="text-2xl font-bold text-gray-400 mb-2">
              No notes yet
            </h2>
            <p className="text-gray-400">
              Start recording or create a new note
            </p>
          </div>
        </div>
      )}

      {/* Notes */}
      {notes.map((note) => (
        <div
          key={note.id}
          style={{
            position: "absolute",
            left: `${note.position.x}px`,
            top: `${note.position.y}px`,
            cursor: draggedNote === note.id ? "grabbing" : "grab",
          }}
          onMouseDown={(e) => handleMouseDown(e, note.id)}
        >
          <StickyNote note={note} />
        </div>
      ))}
    </div>
  );
}
