import { useEffect, useState } from "react";

export function useTimer(dueTime) {
  const [timeLeft, setTimeLeft] = useState(null);
  const [isOverdue, setIsOverdue] = useState(false);

  useEffect(() => {
    if (!dueTime) return;

    const interval = setInterval(() => {
      const now = new Date();
      const due = new Date(dueTime);
      const diff = due - now;

      if (diff <= 0) {
        setIsOverdue(true);
        setTimeLeft(null);
      } else {
        setIsOverdue(false);
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeLeft({ hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [dueTime]);

  return { timeLeft, isOverdue };
}
