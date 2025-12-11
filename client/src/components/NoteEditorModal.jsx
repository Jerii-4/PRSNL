import { X, Clock, Mail } from "lucide-react";
import { useState } from "react";

export function NoteEditorModal({ note, isOpen, onClose, onSave }) {
  const [content, setContent] = useState(note?.content || "");
  const [dueTime, setDueTime] = useState(note?.dueTime || "");
  const [emailReminder, setEmailReminder] = useState(
    note?.emailReminder || false
  );

  if (!isOpen) return null;

  const handleSave = () => {
    onSave({
      content,
      dueTime,
      emailReminder,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Edit Note</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Note Content
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="Enter note content..."
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Due Date & Time
            </label>
            <input
              type="datetime-local"
              value={dueTime}
              onChange={(e) => setDueTime(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="email"
              checked={emailReminder}
              onChange={(e) => setEmailReminder(e.target.checked)}
              className="w-4 h-4 cursor-pointer"
            />
            <label
              htmlFor="email"
              className="flex items-center gap-2 text-sm font-semibold text-gray-700 cursor-pointer"
            >
              <Mail className="w-4 h-4" />
              Send email reminder
            </label>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg transition"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
