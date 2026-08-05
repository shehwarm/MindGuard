import { useEffect, useRef, useState } from "react";

function useTimer(initialMinutes = duration) {
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60);
  const [isRunning, setIsRunning] = useState(false);

  const intervalRef = useRef(null);

  useEffect(() => {
  setTimeLeft(initialMinutes * 60);
}, [initialMinutes]);

  useEffect(() => {
    if (!isRunning) return;

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          setIsRunning(false);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const start = () => setIsRunning(true);

  const pause = () => setIsRunning(false);

  const reset = () => {
    clearInterval(intervalRef.current);
    setTimeLeft(initialMinutes * 60);
    setIsRunning(false);
  };

  const resume = () => {
  setIsRunning(true);
};

  return {
  timeLeft,
  isRunning,
  start,
  pause,
  resume,
  reset,
};
}
export default useTimer;