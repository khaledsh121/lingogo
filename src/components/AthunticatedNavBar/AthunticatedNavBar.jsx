import "../AthunticatedNavBar/AthunticatedNavBar.css";
import { Logo } from "../../AssetsFolder/Images";
import { DemoImg } from "../../AssetsFolder/Images";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserImg } from "../../Utils/Utils";

const AthunticatedNavBar = () => {
  const navigate = useNavigate();
  const [userImg, setUserImg] = useState();

  useEffect(() => {
    const fetchUserImage = async () => {
      const userImg = await getUserImg();
      setUserImg(userImg);
    };
    fetchUserImage();
  }, []);

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
          src={userImg ? userImg : DemoImg}
          alt="profile"
          className="profile-pic"
          onClick={handleProfileClick}
        />
      </div>
    </div>
  );
};

export default AthunticatedNavBar;
