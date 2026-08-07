import {
  LayoutDashboard,
  Target,
  Timer,
  History,
  BarChart3,
  NotebookPen,
  Bot,
  LogOut,
} from "lucide-react";

import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Sidebar() {
  const { logout } = useAuth();

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 p-3 rounded-xl transition ${
      isActive
        ? "bg-[#DCEFD9] text-[#5E8F63] font-semibold"
        : "hover:bg-[#EEF6EA] text-gray-700"
    }`;

  return (
    <aside className="hidden md:flex flex-col w-64 min-h-screen bg-white border-r border-[#E6EEDB] p-6">

      {/* Logo */}
      <h1 className="text-3xl font-bold text-[#5E8F63] mb-10">
        🍵 MindGuard
      </h1>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">

        <NavLink to="/dashboard" className={linkClass}>
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/goals" className={linkClass}>
          <Target size={20} />
          <span>Goals</span>
        </NavLink>

        <NavLink to="/notes" className={linkClass}>
  <NotebookPen size={20} />
  <span>Notes</span>
</NavLink>

        <NavLink to="/focus" className={linkClass}>
          <Timer size={20} />
          <span>Focus</span>
        </NavLink>

        <NavLink to="/history" className={linkClass}>
          <History size={20} />
          <span>History</span>
        </NavLink>

        <NavLink to="/analytics" className={linkClass}>
          <BarChart3 size={20} />
          <span>Analytics</span>
        </NavLink>

        
      </nav>

      {/* Logout */}
      <button
        onClick={logout}
        className="flex items-center gap-3 p-3 rounded-xl text-red-500 hover:bg-red-50 transition mt-6"
      >
        <LogOut size={20} />
        <span>Logout</span>
      </button>

    </aside>
  );
}

export default Sidebar;