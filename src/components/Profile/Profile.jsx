import "../Profile/Profile.css";
import {
  DemoImg,
  TimeImg,
  TrophyImg,
  Languageimg,
  Rankimg,
} from "../../AssetsFolder/Images";
import { useEffect, useState } from "react";
import { getUserData, getUserImg, updateUserInfo } from "../../Utils/Utils";
import { supportedLanguages } from "../../Api/SupportedLanugages";

const Profile = () => {
  const [userData, setUserData] = useState();
  const [userImg, setUserImg] = useState();
  const [sourceLang, setSourceLang] = useState();
  const [targetLang, setTargetLang] = useState();
  const [CurrentSelected, setCurrentSelected] = useState(null);
  const [timeSpent, setTimeSpent] = useState(0);
  const fetchUserData = async () => {
    const userData = await getUserData();
    const userImg = await getUserImg();
    setUserData(userData);
    setUserImg(userImg);
    setSourceLang(userData.nativeLanguage);
    setTargetLang(userData.languageToLearn);
    setTimeSpent(userData.timeSpent);
  };
  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeSpent((prevTime) => {
        const newTime = prevTime + 1;
        return newTime;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const onChangeInfo = async (userData) => {
    await updateUserInfo(userData);
    setCurrentSelected();
    await fetchUserData();
  };
  const handleSelectClick = (id) => {
    setCurrentSelected((prev) => (prev === id ? null : id));
  };

  const formatTimeSpent = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;

    return `${hours} h : ${minutes} m : ${seconds} s`;
  };

  return (
    <div className="profile-container">
      <div className="personal-info">
        <img src={userImg ? userImg : DemoImg} alt="Profileimg" />
        <label>{userData?.email}</label>
      </div>
      <div className="student-learning-info">
        <div className="first-info">
          <div id="1" onClick={() => handleSelectClick(1)}>
            {CurrentSelected !== 1 ? (
              <>
                <img src={TrophyImg} alt="Achievements" className="TrophyImg" />
                <span>Achievements</span>
              </>
            ) : (
              <div className="selected">
                <span>Current level: {userData.currentLevel}</span>
                <span>Chats: {userData.ChatsNumber}</span>
                <span>Presentations: {userData.PresentationsNumber}</span>
              </div>
            )}
          </div>
          <div id="2" onClick={() => handleSelectClick(2)}>
            {CurrentSelected !== 2 ? (
              <>
                <img src={TimeImg} alt="Total Timeimg" className="TimeImg" />
                <span>Total Time</span>
              </>
            ) : (
              <div className="selected">
                <span>{formatTimeSpent(timeSpent)}</span>
              </div>
            )}
          </div>
        </div>
        <div className="last-info">
          <div id="3" onClick={() => handleSelectClick(3)}>
            {CurrentSelected !== 3 ? (
              <>
                <img src={Rankimg} alt="Rankimg" className="Rankimg" />
                <span>Your Rank</span>
              </>
            ) : (
              <div className="selected">
                <span>Coming soon!</span>
              </div>
            )}
          </div>
          <div id="4" onClick={() => handleSelectClick(4)}>
            {CurrentSelected !== 4 ? (
              <>
                <img src={Languageimg} alt="language" className="Languageimg" />
                <span>Language</span>
              </>
            ) : (
              <div className="selected">
                <select
                  name="sourceLang"
                  id="sourceLang"
                  value={sourceLang}
                  onChange={(e) => {
                    setSourceLang(e.target.value);
                    e.stopPropagation();
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {supportedLanguages.map((language) => (
                    <option key={language.code} value={language.code}>
                      {language.name}
                    </option>
                  ))}
                </select>

                <select
                  name="targetLang"
                  id="targetLang"
                  value={targetLang}
                  onChange={(e) => {
                    setTargetLang(e.target.value);
                    e.stopPropagation();
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {supportedLanguages.map((language) => (
                    <option key={language.code} value={language.code}>
                      {language.name}
                    </option>
                  ))}
                </select>
                <button
                  className="confirm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onChangeInfo({
                      nativeLanguage: sourceLang,
                      languageToLearn: targetLang,
                    });
                    setCurrentSelected(4);
                  }}
                >
                  Confirm
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
