import "../SignupForm/SignupForm.css";
import { UserIcon, PasswordIcon } from "../../AssetsFolder/Images";
import { useNavigate } from "react-router-dom";
import ConnectWithSocial from "../ConnectWithSocial/ConnectWithSocial";
import { useState } from "react";
import axios from "axios";
import { backendNavigation } from "../../Utils/Utils";
import { serverURI } from "../../Api/Api";
import { supportedLanguages } from "../../Api/SupportedLanugages";

const SignupForm = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const [currentStage, setCurrentStage] = useState(1);
  const [birthDate, setBirthDate] = useState("");
  const [userImg, setUserImg] = useState("");
  const [nativeLanguage, setNativeLanguage] = useState(
    supportedLanguages[0].code
  );
  const [languageToLearn, setLanguageToLearn] = useState(
    supportedLanguages[0].code
  );
  const [usedEmail, setUsedEmail] = useState(false);
  const [usedName, setUsedName] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);

  const handleUserNameChange = (event) => {
    setUsedName(false);
    setUserName(event.target.value);
  };
  const handleEmailChange = (event) => {
    setUsedEmail(false);
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPasswordMatch(true);
    setPassword(event.target.value);
  };
  const handleConfirmPasswordChange = (event) => {
    setPasswordMatch(true);
    setConfirmPassword(event.target.value);
  };
  const handleBirthDateChange = (event) => {
    setBirthDate(event.target.value);
  };
  const handleUserImgChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUserImg(file);
    }
  };

  const handleNativeLanguageChange = (event) => {
    setNativeLanguage(event.target.value);
  };
  const handleLanguageToLearnChange = (event) => {
    setLanguageToLearn(event.target.value);
  };

  const handleFinshFirstStep = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setPasswordMatch(false);
      return;
    }
    const response = await axios.get(serverURI + "/auth/checkEmail", {
      params: { email, userName },
    });
    if (response.data.existEmail) {
      setUsedEmail(true);
      return;
    }
    if (response.data.existName) {
      setUsedName(true);
      return;
    }
    setCurrentStage(2);
  };

  const finshForm = (event) => {
    event.preventDefault();

    // Create a new FormData instance
    const formData = new FormData();
    formData.append("username", userName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("birthDate", birthDate);
    formData.append("nativeLanguage", nativeLanguage);
    formData.append("languageToLearn", languageToLearn);
    formData.append("userImg", userImg); // Append the file directly

    axios
      .post(serverURI + "/auth/signup", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        if (response.data.success) {
          localStorage.setItem("token", response.data.token);
          backendNavigation(navigate, "/dashboard");
        }
      })
      .catch((error) => {
        setUsedEmail(true);
        setCurrentStage(1);
        console.error("Error submitting data:", error);
      });
  };

  const handleLoginClick = () => {
    navigate("/Login");
  };

  return (
    <>
      {currentStage === 1 && (
        <form
          className="signup-form"
          onSubmit={handleFinshFirstStep}
          method="post"
        >
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
                    placeholder="Password"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                  />
                  <img
                    src={PasswordIcon}
                    alt="Password Icon"
                    className="icns"
                  />
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
                  <img
                    src={PasswordIcon}
                    alt="Password Icon"
                    className="icns"
                  />
                </div>
              </div>
            </div>
            {usedEmail && (
              <div className="used-email">this email has been used</div>
            )}
            {usedName && (
              <div className="used-email">this user name has been used</div>
            )}
            {!passwordMatch && (
              <div className="used-email">passwords do not match</div>
            )}
            <button className="signup-btn" type="submit">
              Sign up Now
            </button>
            <div onClick={handleLoginClick} className="or-login">
              or Log in
            </div>
          </div>
          <ConnectWithSocial LOS={"sign up"} />
        </form>
      )}

      {currentStage === 2 && (
        <form onSubmit={finshForm} method="post" className="signup-second-form">
          <div className="form-group">
            <label htmlFor="birthday">Your Birthday</label>
            <input
              type="date"
              id="birthday"
              name="birthday"
              onChange={handleBirthDateChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="profileImage">Please upload a profile image</label>
            <input
              type="file"
              id="profileImage"
              accept="image/*"
              onChange={handleUserImgChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="native-language">Native Language</label>
            <select
              name="native-language"
              id="native-language"
              onChange={handleNativeLanguageChange}
            >
              {supportedLanguages.map((language) => (
                <option key={language.code} value={language.code}>
                  {language.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="target-language">Language to Learn</label>
            <select
              name="target-language"
              id="target-language"
              onChange={handleLanguageToLearnChange}
            >
              {supportedLanguages.map((language) => (
                <option key={language.code} value={language.code}>
                  {language.name}
                </option>
              ))}
            </select>
          </div>
          <button className="signup-btn" type="submit">
            Finish Signup
          </button>
        </form>
      )}
    </>
  );
};
export default SignupForm;
