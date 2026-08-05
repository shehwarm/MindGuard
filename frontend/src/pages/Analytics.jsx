import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import DashboardLayout from "../components/DashboardLayout";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import api from "../services/api";
import { useAuth } from "../context/AuthContext";

function Analytics() {
  const { token } = useAuth();

  const [analytics, setAnalytics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await api.get("/analytics/weekly", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setAnalytics(response.data.analytics);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchAnalytics();
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
            🍃 Loading Analytics...
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

        <div className="bg-white rounded-3xl shadow-lg p-8">

          <h1 className="text-3xl font-bold text-[#5E8F63] mb-2">
            📊 Weekly Analytics
          </h1>

          <p className="text-gray-500 mb-8">
            Your completed focus minutes over the last 7 days.
          </p>

          {analytics.length === 0 ? (
            <div className="text-center py-20">

              <h2 className="text-2xl font-semibold text-[#5E8F63]">
                No Analytics Yet
              </h2>

              <p className="text-gray-500 mt-2">
                Complete your first focus session to generate analytics.
              </p>

            </div>
          ) : (
            <ResponsiveContainer
              width="100%"
              height={350}
            >
              <BarChart data={analytics}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis
                  dataKey="day"
                />

                <YAxis />

                <Tooltip />

                <Bar
                  dataKey="minutes"
                  fill="#7BAE7F"
                  radius={[8, 8, 0, 0]}
                />

              </BarChart>
            </ResponsiveContainer>
          )}

        </div>

      </div>
    </DashboardLayout>
  );
}

export default Analytics;