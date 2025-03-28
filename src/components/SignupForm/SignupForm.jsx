import "../SignupForm/SignupForm.css";
import { UserIcon, PasswordIcon } from "../../AssetsFolder/Images";
import { useNavigate } from "react-router-dom";
import ConnectWithSocial from "../ConnectWithSocial/ConnectWithSocial";
import { useState } from "react";
import axios from "axios";
import { backendNavigation } from "../../Utils/Utils";

const SignupForm = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:5000/auth/signup", {
        username: userName,
        email: email,
        password: password,
      })
      .then((response) => {
        if (response.data.success) {
          localStorage.setItem("token", response.data.token);
          backendNavigation(navigate, "/dashboard");
        }
      })
      .catch((error) => {
        console.error("Error submitting data:", error);
      });
  };

  const handleLoginClick = () => {
    navigate("/Login");
  };

  return (
    <form className="signup-form" onSubmit={handleFormSubmit} method="post">
      <div className="creidntials-container">
        <h1 className="signup-header">sign up</h1>
        <div className="signup-inputs">
          <div className="inputs-container">
            <div className="input-container">
              <input
                type="text"
                className="input"
                placeholder="Username"
                value={userName}
                onChange={handleUserNameChange}
                required
              />
              <img src={UserIcon} alt="user icon" className="icns" />
            </div>
            <div className="input-container">
              <input
                type="email"
                className="input"
                placeholder="Email"
                value={email}
                onChange={handleEmailChange}
                required
              />
              <img src={UserIcon} alt="user icon" className="icns" />
            </div>
          </div>
          <div className="inputs-container">
            <div className="input-container">
              <input
                type="password"
                className="input"
                placeholder="password"
                value={password}
                onChange={handlePasswordChange}
                required
              />
              <img src={PasswordIcon} alt="Password Icon" className="icns" />
            </div>
            <div className="input-container">
              <input
                type="password"
                className="input"
                placeholder="Confirm Your Password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                required
              />
              <img src={PasswordIcon} alt="Password Icon" className="icns" />
            </div>
          </div>
        </div>
        <button className="signup-btn" type="submit">
          Sign up Now
        </button>
        <div onClick={handleLoginClick} className="or-login">
          or Log in
        </div>
      </div>
      <ConnectWithSocial LOS={"sign up"} />
    </form>
  );
};

export default SignupForm;
