import "../UserDashboard/UserDashboard.css";
import DashboardCard from "../DashboardCard/DashboardCard";
import UserInfoCard from "../UserInfoCard/UserInfoCard";
import { Presentaition } from "../../AssetsFolder/Images";
import { RealScenario } from "../../AssetsFolder/Images";
import { AiAssisstant } from "../../AssetsFolder/Images";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserData } from "../../Utils/Utils";

const UserDashboard = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState();

  const cards = [
    {
      imgsrc: Presentaition,
      alt: "presentation",
      desc: "Presentation",
      handleCardClick: () => {
        navigate(".././Presentation");
      },
    },
    {
      imgsrc: RealScenario,
      alt: "real-scenario",
      desc: "Real Scenario",
      handleCardClick: () => {
        navigate(".././realScenario");
      },
    },
    {
      imgsrc: AiAssisstant,
      alt: "robot",
      desc: "AI Chatting",
      handleCardClick: () => {
        navigate(".././AiChat");
      },
    },
  ];

  const infoCards = [
    { percentage: 70, desc: "Over All" },
    { percentage: 20, desc: "Vocabulary" },
    { percentage: 40, desc: "Grammer" },
    { percentage: 60, desc: "Writing Skills" },
  ];

  useEffect(() => {
    const fetchUserName = async () => {
      const userData = await getUserData();
      setUserName(userData.username);
    };
    fetchUserName();
  }, []);

  return (
    <div className="user-dashboard-container">
      <h1>Hi {userName}!</h1>
      <div className="user-cards-container">
        {cards.map((card, index) => (
          <DashboardCard
            key={index}
            imgsrc={card.imgsrc}
            alt={card.alt}
            desc={card.desc}
            handleCardClick={card.handleCardClick}
          />
        ))}
      </div>
      <div className="user-info-container">
        {infoCards.map((item, index) => {
          return <UserInfoCard {...item} key={index} />;
        })}
      </div>
    </div>
  );
};

export default UserDashboard;
