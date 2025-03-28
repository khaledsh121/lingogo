import "../Intro/Intro.css";
import { WelcomeImg } from "../../AssetsFolder/Images";

const Intro = () => {
  return (
    <div className="intro-container" id="intro">
      <div className="intro-welcome-container">
        Welcome to <br /> <span>LinguMaster</span> <br />
        your <span>gateway</span>
        <br /> to language <br />
        learning<span>!</span>
      </div>
      <img
        src={WelcomeImg}
        alt="teacher teaches tow students"
        className="intro-welcome-img"
      />
    </div>
  );
};

export default Intro;
