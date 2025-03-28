import "../ProfilePage/ProfilePage.css";
import AthunticatedNavBar from "../../components/AthunticatedNavBar/AthunticatedNavBar";
import Profile from "../../components/Profile/Profile";

const ProfilePage = () => {
  return (
    <div className="profile-page-container">
      <AthunticatedNavBar />
      <Profile />
    </div>
  );
};

export default ProfilePage;
