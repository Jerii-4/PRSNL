import { Trash2, Edit2, CheckCircle } from "lucide-react";
import { useState } from "react";

export function StickyNote({ note, onDelete, onEdit, onComplete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [showActions, setShowActions] = useState(false);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const timeUntilDue = () => {
    if (!note.dueTime) return null;
    const now = new Date();
    const due = new Date(note.dueTime);
    const diff = due - now;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  return (
    <div
      className={`w-64 p-4 rounded-lg shadow-lg transition-all duration-300 ${
        note.completed
          ? "bg-gray-200 opacity-50 border-2 border-gray-400"
          : note.isOverdue
          ? "bg-red-100 border-2 border-red-400"
          : "bg-yellow-100 border-2 border-yellow-300"
      }`}
      onDoubleClick={handleDoubleClick}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className="text-sm text-gray-700 mb-3 whitespace-pre-wrap break-words max-h-40 overflow-hidden">
        {note.content}
      </div>

      {note.dueTime && (
        <div className="text-xs text-gray-600 mb-2 flex items-center gap-1">
          <span className="font-semibold">Due:</span>
          <span>
            {new Date(note.dueTime).toLocaleTimeString("en-IN", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
          {timeUntilDue() && (
            <span
              className={`ml-auto font-semibold ${
                parseInt(timeUntilDue()) < 10
                  ? "text-red-600"
                  : "text-green-600"
              }`}
            >
              {timeUntilDue()}
            </span>
          )}
        </div>
      )}

      {showActions && (
        <div className="flex gap-2 mt-3 pt-3 border-t border-yellow-300">
          <button
            onClick={() => setIsEditing(true)}
            className="flex-1 p-1 bg-blue-500 hover:bg-blue-600 text-white rounded text-xs font-semibold flex items-center justify-center gap-1"
          >
            <Edit2 className="w-3 h-3" />
            Edit
          </button>
          <button
            onClick={() => onComplete?.(note.id)}
            className="flex-1 p-1 bg-green-500 hover:bg-green-600 text-white rounded text-xs font-semibold flex items-center justify-center gap-1"
          >
            <CheckCircle className="w-3 h-3" />
            Done
          </button>
          <button
            onClick={() => onDelete?.(note.id)}
            className="flex-1 p-1 bg-red-500 hover:bg-red-600 text-white rounded text-xs font-semibold flex items-center justify-center gap-1"
          >
            <Trash2 className="w-3 h-3" />
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
