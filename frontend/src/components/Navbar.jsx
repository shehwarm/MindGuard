import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "20px",
        borderBottom: "1px solid #ddd",
      }}
    >
      <h2>🛡️ MindGuard</h2>

      <button onClick={logout}>Logout</button>
    </nav>
  );
}

export default Navbar;