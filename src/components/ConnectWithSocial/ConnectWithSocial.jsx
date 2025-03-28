import "../ConnectWithSocial/ConnectWithSocial.css";
import { FacebookLogo, GoogleLogo } from "../../AssetsFolder/Images";

const ConnectWithSocial = ({ LOS }) => {
  return (
    <div className="connect-with-social-container">
      <span className="lines-container">
        <div className="line" />
        <span className="LOS">{LOS}</span>
        <span className="others">with Others</span>
        <div className="line" />
      </span>
      <div className="social-btns-container">
        <button className="social-btns">
          <img src={GoogleLogo} alt="google logo" />
          {LOS} with google
        </button>
        <button className="social-btns">
          <img src={FacebookLogo} alt="facebook logo" />
          {LOS} with Facebook
        </button>
      </div>
    </div>
  );
};

export default ConnectWithSocial;
