import "../Profile/Profile.css";
import {
  Profileimg,
  TimeImg,
  TrophyImg,
  Languageimg,
  Rankimg,
} from "../../AssetsFolder/Images";

const Profile = () => {
  return (
    <div className="profile-container">
      <div className="personal-info">
        <img src={Profileimg} alt="Profileimg" />
        <label>Email</label>
      </div>
      <div className="student-learning-info">
        <div className="first-info">
          <div>
            <img src={TrophyImg} alt="Achievements" className="TrophyImg" />
            <span>Achievements</span>
          </div>
          <div>
            <img src={TimeImg} alt="Total Timeimg" className="TimeImg" />
            <span>Total Time</span>
          </div>
        </div>
        <div className="last-info">
          <div>
            <img src={Rankimg} alt="Rankimg" className="Rankimg" />
            <span>Your Rank</span>
          </div>
          <div>
            <img src={Languageimg} alt="language" className="Languageimg" />
            <span>language</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
