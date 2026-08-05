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

function Dashboard() {
  return (
    <DashboardLayout
      sidebar={<Sidebar />}
      navbar={<Navbar />}
    >

      <div className="space-y-8">

        <WelcomeCard />

        <div className="grid md:grid-cols-3 gap-6">

          <StatCard
            title="Today's Focus"
            value="2h 15m"
            icon={<Clock size={32} />}
          />

          <StatCard
            title="Current Streak"
            value="7 Days"
            icon={<Flame size={32} />}
          />

          <StatCard
            title="Goals Completed"
            value="12"
            icon={<Target size={32} />}
          />

        </div>

        <QuickActions />

      </div>

    </DashboardLayout>
  );
}

export default Dashboard;