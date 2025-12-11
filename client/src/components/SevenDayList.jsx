import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

export function SevenDayList({ selectedDate, onDateSelect }) {
  const getDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      dates.push(d);
    }
    return dates;
  };

  const dates = getDates();
  const isToday = (date) => {
    return date.toDateString() === new Date().toDateString();
  };

  const formatDate = (date) => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return `${days[date.getDay()]} ${date.getDate()}`;
  };

  return (
    <div className="space-y-2">
      {dates.map((date) => (
        <button
          key={date.toISOString()}
          onClick={() => onDateSelect(date)}
          className={`w-full p-3 rounded-lg text-left transition-all ${
            selectedDate.toDateString() === date.toDateString()
              ? "bg-blue-500 text-white shadow-md"
              : "bg-gray-100 hover:bg-gray-200 text-gray-800"
          } ${isToday(date) ? "border-2 border-dashed border-green-400" : ""}`}
        >
          <div className="font-semibold text-sm">{formatDate(date)}</div>
          <div className="text-xs opacity-75">{date.getDate()}</div>
        </button>
      ))}
    </div>
  );
}
