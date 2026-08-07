import { Play, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

function QuickActions() {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-3xl shadow-lg p-8">

      <h2 className="text-xl font-semibold mb-6">
        Quick Actions
      </h2>

      <div className="flex gap-4 flex-wrap">

        <button
          onClick={() => navigate("/focus")}
          className="flex items-center gap-2 bg-[#7BAE7F] hover:bg-[#5E8F63] text-white px-5 py-3 rounded-xl transition"
        >
          <Play size={18} />
          Start Focus
        </button>

        <button
          onClick={() => navigate("/goals")}
          className="flex items-center gap-2 border border-[#7BAE7F] text-[#5E8F63] px-5 py-3 rounded-xl hover:bg-[#EEF6EA] transition"
        >
          <Plus size={18} />
          Add Goal
        </button>

      </div>

    </div>
  );
}

export default QuickActions;