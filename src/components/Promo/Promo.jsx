import "../Promo/Promo.css";
import { Logo } from "../../AssetsFolder/Images";
import { LoginTexture } from "../../AssetsFolder/Images";

const Promo = () => {
  return (
    <div className="promo-container">
      <img src={Logo} alt="logo" className="logo" />
      <p>
        The best choice to learn languages is through regular
        <img src={LoginTexture} alt="loginTexture" className="texture" />
        practice. Combine apps, cultural immersion, and daily conversations
      </p>
    </div>
  );
};

export default Promo;
