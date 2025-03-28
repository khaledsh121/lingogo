import { useNavigate } from "react-router-dom";
import { Logo } from "../../AssetsFolder/Images";
import "../NavBar/NavBar.css";

const NavBar = () => {
  const navigate = useNavigate();
  const onClickSignUp = () => {
    navigate("/Signup");
  };
  return (
    <div className="NavBar-container">
      <a href="#intro" className="NavBar-Logo-anchor">
        <img src={Logo} alt="Logo" className="NavBar-Logo" />
      </a>
      <div className="NavBar-links-Container">
        <a href="#aboutUs">About us</a>
        <a href="#ourStudents">OUR STUDENTS</a>
        <a href="#opinions">Opinions</a>
        <a href="#emailUs">CONTACT US</a>
      </div>
      <button onClick={onClickSignUp} className="NavBar-SignUp_btn">
        SIGN UP
      </button>
    </div>
  );
};

export default NavBar;
