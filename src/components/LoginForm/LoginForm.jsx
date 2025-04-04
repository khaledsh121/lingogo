import "../LoginForm/LoginForm.css";
import { UserIcon, PasswordIcon } from "../../AssetsFolder/Images";
import { useNavigate } from "react-router-dom";
import ConnectWithSocial from "../ConnectWithSocial/ConnectWithSocial";
import { useEffect, useState } from "react";
import axios from "axios";
import { backendNavigation } from "../../Utils/Utils";

const LoginForm = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (token) navigate("/dashboard");
  }, [token, navigate]);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    await axios
      .post("http://localhost:5000/auth/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        console.log(response);
        if (response.data.success) {
          localStorage.setItem("token", response.data.token);
          backendNavigation(navigate, "/dashboard");
        } else {
          console.log(response.data.message);
        }
      })
      .catch((error) => {
        console.error("Error submitting data:", error);
      });
  };

  const handleSignupClick = () => {
    navigate("/Signup");
  };

  return (
    <form className="login-form" onSubmit={handleFormSubmit} method="post">
      <div className="creidntials-container">
        <h1 className="login-header">Login</h1>
        <div className="input-container">
          <input
            type="email"
            className="input"
            placeholder="Username"
            onChange={handleEmailChange}
            required
          />
          <img src={UserIcon} alt="user icon" className="icns" />
        </div>
        <div className="input-container">
          <input
            type="password"
            className="input"
            placeholder="password"
            onChange={handlePasswordChange}
            required
          />
          <img src={PasswordIcon} alt="Password Icon" className="icns" />
        </div>
        <button className="login-btn" type="submit">
          Login Now
        </button>
        <div onClick={handleSignupClick} className="or-Signup">
          or Signup
        </div>
      </div>
      <ConnectWithSocial LOS={"Login"} />
    </form>
  );
};

export default LoginForm;
