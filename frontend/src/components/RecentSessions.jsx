import { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

function RecentSessions() {

  const { token } = useAuth();

  const [sessions, setSessions] = useState([]);

  useEffect(() => {

    const fetchRecent = async () => {

      try {

        const response = await api.get(
          "/focus/history",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setSessions(response.data.sessions.slice(0,5));

      } catch (error) {
        console.error(error);
      }

    };

    if(token){
      fetchRecent();
    }

  }, [token]);

  return (
    <div className="bg-white rounded-3xl shadow p-6">

      <h2 className="text-2xl font-bold text-[#5E8F63] mb-6">
        Recent Sessions
      </h2>

      <div className="space-y-4">

        {sessions.map((session) => (

          <div
            key={session._id}
            className="flex justify-between border-b pb-3"
          >

            <span>
              {new Date(session.createdAt).toLocaleDateString()}
            </span>

            <span>
              {session.duration} min
            </span>

          </div>

        ))}

      </div>

    </div>
  );
}

export default RecentSessions;