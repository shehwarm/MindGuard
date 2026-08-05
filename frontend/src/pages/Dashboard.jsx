import { useEffect, useState } from "react";
import {
  Flame,
  Clock,
  Target,
} from "lucide-react";

import DashboardLayout from "../components/DashboardLayout";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import WelcomeCard from "../components/WelcomeCard";
import StatCard from "../components/StatCard";
import QuickActions from "../components/QuickActions";

import api from "../services/api";
import { useAuth } from "../context/AuthContext";

function Dashboard() {
  const { token } = useAuth();

  const [stats, setStats] = useState({
    totalSessions: 0,
    completedSessions: 0,
    totalMinutes: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get("/dashboard/stats", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setStats(response.data.stats);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchStats();
    }
  }, [token]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-2xl font-semibold text-[#5E8F63]">
        🍃 Loading Dashboard...
      </div>
    );
  }

  return (
    <DashboardLayout
      sidebar={<Sidebar />}
      navbar={<Navbar />}
    >
      <div className="space-y-8">

        <WelcomeCard />

        <div className="grid md:grid-cols-3 gap-6">

          <StatCard
            title="Today's Sessions"
            value={stats.totalSessions}
            icon={<Clock size={32} />}
          />

          <StatCard
            title="Focus Minutes"
            value={`${stats.totalMinutes} min`}
            icon={<Flame size={32} />}
          />

          <StatCard
            title="Completed Sessions"
            value={stats.completedSessions}
            icon={<Target size={32} />}
          />

        </div>

        <QuickActions />

      </div>
    </DashboardLayout>
  );
}

export default Dashboard;