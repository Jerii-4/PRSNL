import { RotateCcw } from "lucide-react";

export function UndoToast() {
  return (
    <div className="fixed bottom-6 left-6 bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-fade-in">
      <RotateCcw className="w-5 h-5" />
      <span className="font-semibold">Action undone</span>
    </div>
  );
}
