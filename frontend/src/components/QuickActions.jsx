import { Play, Plus } from "lucide-react";

function QuickActions() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E8F0E4]">

      <h2 className="text-xl font-semibold mb-6">
        Quick Actions
      </h2>

      <div className="flex gap-4 flex-wrap">

        <button className="flex items-center gap-2 bg-[#7BAE7F] hover:bg-[#5E8F63] text-white px-5 py-3 rounded-xl transition">

          <Play size={18} />

          Start Focus

        </button>

        <button className="flex items-center gap-2 border border-[#7BAE7F] text-[#5E8F63] px-5 py-3 rounded-xl hover:bg-[#EEF6EA] transition">

          <Plus size={18} />

          Add Habit

        </button>

      </div>

    </div>
  );
}

export default QuickActions;