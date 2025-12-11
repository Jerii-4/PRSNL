import { Zap } from "lucide-react";

export function SyncIndicator({ isSyncing, lastSync }) {
  return (
    <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 rounded-lg border border-blue-200">
      <Zap
        className={`w-4 h-4 ${
          isSyncing ? "text-yellow-500 animate-spin" : "text-green-500"
        }`}
      />
      <span className="text-xs text-gray-600">
        {isSyncing ? "Syncing..." : `Last sync: ${lastSync || "Just now"}`}
      </span>
    </div>
  );
}
