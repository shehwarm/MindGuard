import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ShieldCheck, Mail, Lock } from "lucide-react";
import api from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/auth/login", formData);

      localStorage.setItem("token", response.data.token);

      navigate("/dashboard");
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message || "Invalid email or password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF7F5] flex items-center justify-center px-6">

      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">

        <div className="flex justify-center">
          <div className="bg-pink-100 p-4 rounded-full">
            <ShieldCheck
              size={42}
              className="text-[#FF6B9A]"
            />
          </div>
        </div>

        <h1 className="text-4xl font-bold text-center text-[#2D3748] mt-5">
          MindGuard
        </h1>

        <p className="text-center text-gray-500 mt-2">
          Welcome back 👋
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5"
        >

          <div className="relative">

            <Mail
              size={18}
              className="absolute left-4 top-4 text-pink-400"
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-pink-200 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-[#FF6B9A] focus:ring-2 focus:ring-pink-200"
            />

          </div>

          <div className="relative">

            <Lock
              size={18}
              className="absolute left-4 top-4 text-pink-400"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-pink-200 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-[#FF6B9A] focus:ring-2 focus:ring-pink-200"
            />

          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#FF6B9A] hover:bg-pink-600 text-white py-3 rounded-xl font-semibold transition duration-300 hover:scale-[1.02] disabled:opacity-70"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        <p className="text-center text-gray-500 mt-6">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-[#8B5CF6] font-semibold hover:underline"
          >
            Register
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Login;