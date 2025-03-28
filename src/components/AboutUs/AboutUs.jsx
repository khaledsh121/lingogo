import "../AboutUs/AboutUs.css";
import { AboutUsImg } from "../../AssetsFolder/Images";

const AboutUs = () => {
  return (
    <div id="aboutUs" className="aboutUs-container">
      <div className="aboutUs-text-container">
        <h1 className="about-us-header">About Us : </h1>
        <p className="about-us-paragraph">
          Linguogo is dedicated to making your language learning journey
          enjoyable and successful. We combine innovative methods, interactive
          tools, and a creative approach to create an engaging and rewarding
          experience for our users. Our mission is to empower learners of all
          levels to master new languages efficiently and effectively. Through
          Linguogo, we strive to break down barriers and make language
          acquisition accessible and fulfilling for everyone.
        </p>
      </div>
      <img src={AboutUsImg} alt="Qustion mark" className="aboutUs-img" />
    </div>
  );
};

export default AboutUs;
