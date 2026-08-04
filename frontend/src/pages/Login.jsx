import { useState } from "react";
import axios from "axios";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

    const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await api.post("/auth/login", formData);

    localStorage.setItem("token", response.data.token);

    navigate("/dashboard");

  } catch (error) {
    console.error(error);

    alert("Login Failed!");
  }
};

  return (
    <div style={{ padding: "40px" }}>
      <h1>MindGuard Login</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={formData.password}
          onChange={handleChange}
        />

        <br /><br />

        <button>Login</button>
      </form>
    </div>
  );
}

export default Login;