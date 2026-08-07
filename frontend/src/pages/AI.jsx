import { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import toast from "react-hot-toast";

function AI() {
  const { token } = useAuth();

  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  const askAI = async () => {
    if (!prompt.trim()) return;

    setLoading(true);

    try {
      const response = await api.post(
        "/ai/chat",
        { prompt },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setReply(response.data.reply);
    } catch (error) {
      console.error(error);
      toast.error("Failed to get AI response.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout
      sidebar={<Sidebar />}
      navbar={<Navbar />}
    >
      <div className="max-w-4xl mx-auto">

        <div className="bg-white rounded-3xl shadow-lg p-8">

          <h1 className="text-3xl font-bold text-[#5E8F63] mb-2">
            🤖 AI Productivity Coach
          </h1>

          <p className="text-gray-500 mb-8">
            Ask anything about productivity, studying, focus, or planning.
          </p>

          <textarea
            rows="6"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Example: Create a study plan for my DSA exam..."
            className="w-full border rounded-xl p-4"
          />

          <button
            onClick={askAI}
            disabled={loading}
            className="mt-5 bg-[#7BAE7F] hover:bg-[#5E8F63] text-white px-6 py-3 rounded-xl"
          >
            {loading ? "Thinking..." : "Ask AI"}
          </button>

          {reply && (
            <div className="mt-8 bg-[#F8FAF7] rounded-xl p-6">
              <h2 className="font-bold text-[#5E8F63] mb-3">
                AI Response
              </h2>

              <p className="whitespace-pre-wrap text-gray-700">
                {reply}
              </p>
            </div>
          )}

        </div>
      </div>
    </DashboardLayout>
  );
}

export default AI;