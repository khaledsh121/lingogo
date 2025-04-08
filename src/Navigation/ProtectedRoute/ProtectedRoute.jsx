import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";
import { serverURI } from "../../Api/Api";
import { saveTimeUtil } from "../../Utils/Utils";
import AthunticatedNavBar from "../../components/AthunticatedNavBar/AthunticatedNavBar";

const ProtectedRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [timeSpent, setTimeSpent] = useState(0);

  useEffect(() => {
    const savedTime = localStorage.getItem("timeSpent");
    const initialTime =
      savedTime && !isNaN(Number(savedTime)) ? Number(savedTime) : 0;
    setTimeSpent(initialTime);

    const timer = setInterval(() => {
      setTimeSpent((prevTime) => {
        const newTime = prevTime + 1;
        if (newTime % 60 === 0) {
          saveTimeUtil(newTime);
        }
        localStorage.setItem("timeSpent", newTime);
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsAuthenticated(false);
        return;
      }

      try {
        await axios.get(serverURI + "/navigate/", {
          params: { whereto: "Dashboard" },
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });

        setIsAuthenticated(true);
      } catch (error) {
        console.error("Auth check failed:", error);

        if (error.response?.status === 401) {
          localStorage.removeItem("token");
        }

        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) return null;

  return isAuthenticated ? (
    <>
      <AthunticatedNavBar />
      <Outlet />
    </>
  ) : (
    <Navigate to="/Login" />
  );
};

export default ProtectedRoute;
