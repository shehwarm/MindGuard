import DashboardLayout from "../components/DashboardLayout";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

function History() {
    const { token } = useAuth();

    const [sessions, setSessions] = useState([]);

    useEffect(() => {
  const fetchHistory = async () => {
    try {
      const response = await api.get("/focus/history", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSessions(response.data.sessions);
    } catch (error) {
      console.error(error);
    }
  };

  if (token) {
    fetchHistory();
  }
}, [token]);

  return (
    <DashboardLayout
      sidebar={<Sidebar />}
      navbar={<Navbar />}
    >
      <div className="bg-white rounded-2xl shadow p-6">

  <h2 className="text-2xl font-bold mb-6 text-[#5E8F63]">
    📜 Focus History
  </h2>

  <div className="space-y-4">

    {sessions.map((session) => (
      <div
        key={session._id}
        className="flex justify-between items-center border-b pb-4"
      >
        <div>
          <p className="font-semibold">
            {new Date(session.createdAt).toLocaleDateString()}
          </p>

          <p className="text-gray-500">
            {session.duration} Minutes
          </p>
        </div>

        <span
          className={`font-semibold ${
            session.completed
              ? "text-green-600"
              : "text-red-500"
          }`}
        >
          {session.completed ? "Completed" : "Incomplete"}
        </span>

      </div>
    ))}

  </div>

</div>
    </DashboardLayout>
  );
}

export default History;