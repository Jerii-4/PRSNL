export function Inspector({ note, onClose }) {
  if (!note) return null;

  return (
    <div className="absolute bottom-6 right-6 bg-white rounded-lg shadow-lg p-4 max-w-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-gray-800">Note Details</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          ✕
        </button>
      </div>

      <div className="space-y-3 text-sm">
        <div>
          <label className="text-gray-600 font-semibold">Content</label>
          <p className="text-gray-800 mt-1 break-words">{note.content}</p>
        </div>

        {note.dueTime && (
          <div>
            <label className="text-gray-600 font-semibold">Due Time</label>
            <p className="text-gray-800 mt-1">
              {new Date(note.dueTime).toLocaleString("en-IN")}
            </p>
          </div>
        )}

        <div>
          <label className="text-gray-600 font-semibold">Created</label>
          <p className="text-gray-800 mt-1">
            {new Date(note.createdAt).toLocaleString("en-IN")}
          </p>
        </div>

        {note.emailReminder && (
          <div className="p-2 bg-blue-50 rounded border border-blue-200">
            <span className="text-blue-700 text-xs">
              📧 Email reminder enabled
            </span>
          </div>
        )}

        {note.completed && (
          <div className="p-2 bg-green-50 rounded border border-green-200">
            <span className="text-green-700 text-xs">✓ Marked as complete</span>
          </div>
        )}
      </div>
    </div>
  );
}
