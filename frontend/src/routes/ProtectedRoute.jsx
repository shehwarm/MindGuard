import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LoadingSpinner from "../components/LoadingSpinner";

function ProtectedRoute({ children }) {
  const { token, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;