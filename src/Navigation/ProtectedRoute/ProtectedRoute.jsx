import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";

const ProtectedRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsAuthenticated(false);
        return;
      }

      try {
        axios.get("http://localhost:5000/navigate/", {
          params: { whereto: "Dashboard" },
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });

        setIsAuthenticated(true);
      } catch (error) {
        console.error("Auth check failed:", error);

        if (error.response && error.response.status === 401) {
          localStorage.removeItem("token");
        }

        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) return null;
  return isAuthenticated ? <Outlet /> : <Navigate to="/Login" />;
};

export default ProtectedRoute;
