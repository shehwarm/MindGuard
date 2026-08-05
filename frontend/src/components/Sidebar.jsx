import {
  LayoutDashboard,
  Target,
  Timer,
  BarChart3,
  User,
  Settings,
  LogOut,
} from "lucide-react";

import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Sidebar() {

  const { logout } = useAuth();

  return (
    <aside className="hidden md:block w-64 bg-white border-r border-[#E6EEDB] min-h-screen p-6">

      <h1 className="text-2xl font-bold text-[#5E8F63] mb-10">
        🍵 MindGuard
      </h1>

      <nav className="space-y-3">

        <Link
          to="/dashboard"
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#EEF6EA]"
        >
          <LayoutDashboard size={20} />
          Dashboard
        </Link>

        <Link
          to="/habits"
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#EEF6EA]"
        >
          <Target size={20} />
          Habits
        </Link>

        <Link
          to="/focus"
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#EEF6EA]"
        >
          <Timer size={20} />
          Focus
        </Link>

        <Link
          to="/analytics"
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#EEF6EA]"
        >
          <BarChart3 size={20} />
          Analytics
        </Link>

        <Link
          to="/profile"
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#EEF6EA]"
        >
          <User size={20} />
          Profile
        </Link>

        <Link
          to="/settings"
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#EEF6EA]"
        >
          <Settings size={20} />
          Settings
        </Link>

        <button
          onClick={logout}
          className="flex w-full items-center gap-3 p-3 rounded-xl hover:bg-red-50 text-red-500"
        >
          <LogOut size={20} />
          Logout
        </button>

      </nav>

    </aside>
  );
}

export default Sidebar;