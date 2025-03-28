import "../AthunticatedNavBar/AthunticatedNavBar.css";
import { Logo } from "../../AssetsFolder/Images";
import { DemoImg } from "../../AssetsFolder/Images";
import { useNavigate } from "react-router-dom";

const AthunticatedNavBar = () => {
  const navigate = useNavigate();
  const handleProfileClick = () => {
    navigate("/profile");
  };
  const handleLogoClick = () => {
    navigate("/dashboard");
  };

  return (
    <div className="athunticated-nav-bar-container">
      <div className="athunticated-nav-bar">
        <img src={Logo} alt="logo" className="logo" onClick={handleLogoClick} />
        <img
          src={DemoImg}
          alt="profile"
          className="profile-pic"
          onClick={handleProfileClick}
        />
      </div>
    </div>
  );
};

export default AthunticatedNavBar;
