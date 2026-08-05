import { useEffect, useState } from "react";
import { Clock, Flame, Target } from "lucide-react";

import DashboardLayout from "../components/DashboardLayout";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import WelcomeCard from "../components/WelcomeCard";
import StatCard from "../components/StatCard";
import QuickActions from "../components/QuickActions";
import MotivationCard from "../components/MotivationCard";
import RecentSessions from "../components/RecentSessions";

import api from "../services/api";
import { useAuth } from "../context/AuthContext";

function Dashboard() {
  const { token } = useAuth();

  const [stats, setStats] = useState({
    totalSessions: 0,
    completedSessions: 0,
    totalMinutes: 0,
  });

  const [streak, setStreak] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        // Dashboard statistics
        const statsResponse = await api.get("/dashboard/stats", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setStats(statsResponse.data.stats);

        // Current streak
        const streakResponse = await api.get("/streak", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setStreak(streakResponse.data.streak);
      } catch (error) {
        console.error("Dashboard Error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchDashboard();
    }
  }, [token]);

  if (loading) {
    return (
      <DashboardLayout
        sidebar={<Sidebar />}
        navbar={<Navbar />}
      >
        <div className="flex justify-center items-center h-[70vh]">
          <h2 className="text-2xl font-bold text-[#5E8F63]">
            🍃 Loading Dashboard...
          </h2>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout
      sidebar={<Sidebar />}
      navbar={<Navbar />}
    >
      <div className="space-y-8">

        <WelcomeCard />

        {/* Statistics */}
        <div className="grid md:grid-cols-3 gap-6">

          <StatCard
            title="Focus Minutes"
            value={`${stats.totalMinutes} mins`}
            icon={<Clock size={32} />}
          />

          <StatCard
            title="Current Streak"
            value={`${streak} Days`}
            icon={<Flame size={32} />}
          />

          <StatCard
            title="Completed Sessions"
            value={stats.completedSessions}
            icon={<Target size={32} />}
          />

        </div>

        {/* Motivation */}
        <MotivationCard streak={streak} />

        {/* Quick Actions */}
        <QuickActions />

        {/* Recent Sessions */}
        <RecentSessions />

      </div>
    </DashboardLayout>
  );
}

export default Dashboard;