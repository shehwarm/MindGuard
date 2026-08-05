import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import useTimer from "../hooks/useTimer";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

function FocusTimer() {
  const [duration, setDuration] = useState(25);
  const [sessionId, setSessionId] = useState(null);
  const [hasStarted, setHasStarted] = useState(false);

  const { token } = useAuth();

  const {
    timeLeft,
    isRunning,
    start,
    pause,
    resume,
    reset,
  } = useTimer(duration);

  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");

  // Start Focus Session
  const handleStart = async () => {
    if (isRunning) return;

    try {
      const response = await api.post(
        "/focus/start",
        {
          duration,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSessionId(response.data.session._id);
      setHasStarted(true);

      start();

      toast.success("Focus session started!");
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Unable to start focus session."
      );
    }
  };

  // Complete Focus Session
  const completeSession = async () => {
    try {
      await api.post(
        `/focus/complete/${sessionId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("🎉 Focus Session Completed!");

      setSessionId(null);
      setHasStarted(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to complete session.");
    }
  };

  // Auto complete when timer reaches zero
  useEffect(() => {
    if (timeLeft === 0 && sessionId) {
      completeSession();
    }
  }, [timeLeft, sessionId]);

  // Reset everything
  const handleReset = () => {
    reset();
    setSessionId(null);
    setHasStarted(false);
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg p-10 max-w-2xl mx-auto">

      <h2 className="text-3xl font-bold text-center text-[#5E8F63] mb-8">
        🍃 Focus Session
      </h2>

      {/* Duration Selection */}

      <div className="flex justify-center gap-3 mb-8 flex-wrap">

        {[25, 45, 60].map((item) => (
          <button
            key={item}
            disabled={isRunning}
            onClick={() => setDuration(item)}
            className={`px-5 py-2 rounded-xl transition font-medium ${
              duration === item
                ? "bg-[#5E8F63] text-white"
                : "bg-[#E8F3E8] hover:bg-[#D8EBD8]"
            } ${isRunning ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {item === 25 && "🍅 25 min"}
            {item === 45 && "🎯 45 min"}
            {item === 60 && "🚀 60 min"}
          </button>
        ))}

      </div>

      {/* Timer */}

      <div className="text-center text-7xl font-bold text-[#334155] mb-10">
        {minutes}:{seconds}
      </div>

      {/* Controls */}

      <div className="flex justify-center gap-4">

        {!hasStarted ? (
          <button
            onClick={handleStart}
            className="bg-[#7BAE7F] hover:bg-[#5E8F63] text-white px-8 py-3 rounded-xl transition"
          >
            ▶ Start
          </button>
        ) : isRunning ? (
          <button
            onClick={pause}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3 rounded-xl transition"
          >
            ⏸ Pause
          </button>
        ) : (
          <button
            onClick={resume}
            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-xl transition"
          >
            ▶ Resume
          </button>
        )}

        <button
          onClick={handleReset}
          className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-xl transition"
        >
          🔄 Reset
        </button>

      </div>

    </div>
  );
}

export default FocusTimer;