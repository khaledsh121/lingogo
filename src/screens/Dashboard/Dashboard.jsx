import "../Dashboard/Dashboard.css";
import AthunticatedNavBar from "../../components/AthunticatedNavBar/AthunticatedNavBar";
import UserDashboard from "../../components/UserDashboard/UserDashboard";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <AthunticatedNavBar />
      <UserDashboard />
    </div>
  );
};

export default Dashboard;
