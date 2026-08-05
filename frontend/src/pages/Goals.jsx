import { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

function Goals() {
  const { token } = useAuth();

  const [title, setTitle] = useState("");
  const [goals, setGoals] = useState([]);

  const fetchGoals = async () => {
    try {
      const response = await api.get("/goals", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setGoals(response.data.goals);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchGoals();
    }
  }, [token]);

  const addGoal = async (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    try {
      const response = await api.post(
        "/goals",
        { title },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setGoals([response.data.goal, ...goals]);
      setTitle("");

      toast.success("Goal added!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to add goal.");
    }
  };

  const completeGoal = async (id) => {
    try {
      const response = await api.put(
        `/goals/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setGoals(
        goals.map((goal) =>
          goal._id === id ? response.data.goal : goal
        )
      );

      toast.success("Goal completed!");
    } catch (error) {
      console.error(error);
    }
  };

  const deleteGoal = async (id) => {
    try {
      await api.delete(`/goals/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setGoals(goals.filter((goal) => goal._id !== id));

      toast.success("Goal deleted!");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DashboardLayout
      sidebar={<Sidebar />}
      navbar={<Navbar />}
    >
      <div className="max-w-3xl mx-auto space-y-8">

        <div className="bg-white rounded-3xl shadow p-8">

          <h1 className="text-3xl font-bold text-[#5E8F63] mb-6">
            🎯 My Goals
          </h1>

          <form
            onSubmit={addGoal}
            className="flex gap-4"
          >
            <input
              type="text"
              placeholder="Enter a new goal..."
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              className="flex-1 border rounded-xl px-4 py-3"
            />

            <button
              className="bg-[#7BAE7F] text-white px-6 rounded-xl"
            >
              Add
            </button>
          </form>

        </div>

        <div className="bg-white rounded-3xl shadow p-8">

          {goals.length === 0 ? (
            <p className="text-center text-gray-500">
              No goals yet.
            </p>
          ) : (
            goals.map((goal) => (
              <div
                key={goal._id}
                className="flex justify-between items-center border-b py-4"
              >
                <span
                  className={
                    goal.completed
                      ? "line-through text-gray-400"
                      : ""
                  }
                >
                  {goal.title}
                </span>

                <div className="flex gap-2">

                  {!goal.completed && (
                    <button
                      onClick={() =>
                        completeGoal(goal._id)
                      }
                      className="bg-green-500 text-white px-4 py-2 rounded-lg"
                    >
                      Complete
                    </button>
                  )}

                  <button
                    onClick={() =>
                      deleteGoal(goal._id)
                    }
                    className="bg-red-500 text-white px-4 py-2 rounded-lg"
                  >
                    Delete
                  </button>

                </div>

              </div>
            ))
          )}

        </div>

      </div>
    </DashboardLayout>
  );
}

export default Goals;