import { useEffect, useState } from "react";

export function CalendarPicker({ onDateSelect }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selected, setSelected] = useState(new Date());

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const handleDateClick = (day) => {
    const date = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );
    setSelected(date);
    onDateSelect(date);
  };

  const daysInMonth = getDaysInMonth(currentMonth);
  const firstDay = getFirstDayOfMonth(currentMonth);
  const days = [];

  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() =>
            setCurrentMonth(
              new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
            )
          }
        >
          ← Prev
        </button>
        <h3 className="font-bold text-lg">
          {currentMonth.toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          })}
        </h3>
        <button
          onClick={() =>
            setCurrentMonth(
              new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
            )
          }
        >
          Next →
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-4">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div
            key={d}
            className="text-center font-semibold text-xs text-gray-500"
          >
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {days.map((day, idx) => (
          <button
            key={idx}
            onClick={() => day && handleDateClick(day)}
            disabled={!day}
            className={`p-2 text-sm rounded ${
              day ? "hover:bg-blue-100 cursor-pointer" : "opacity-0"
            } ${
              day &&
              selected?.getDate() === day &&
              selected?.getMonth() === currentMonth.getMonth()
                ? "bg-blue-500 text-white font-bold"
                : ""
            }`}
          >
            {day}
          </button>
        ))}
      </div>
    </div>
  );
}
