import "../UserDashboard/UserDashboard.css";
import DashboardCard from "../DashboardCard/DashboardCard";
import UserInfoCard from "../UserInfoCard/UserInfoCard";
import { Presentaition } from "../../AssetsFolder/Images";
import { RealScenario } from "../../AssetsFolder/Images";
import { AiAssisstant } from "../../AssetsFolder/Images";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserData, getUserPreformnce } from "../../Utils/Utils";

const UserDashboard = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState();
  const [preformnce, setPreformnce] = useState();

  useEffect(() => {
    const fetchUserPreformnce = async () => {
      const response = await getUserPreformnce();
      setPreformnce(response ? response[0] : null);
    };
    fetchUserPreformnce();
  }, []);

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
        <UserInfoCard
          percentage={preformnce ? preformnce.Overall : 0}
          desc="Overall"
        />
        <UserInfoCard
          percentage={preformnce ? preformnce?.Vocabulary : 0}
          desc="Vocabulary"
        />
        <UserInfoCard
          percentage={preformnce ? preformnce?.Grammar : 0}
          desc="Grammar"
        />
        <UserInfoCard
          percentage={preformnce ? preformnce["Writing Skills"] : 0}
          desc="Writing Skills"
        />
      </div>
    </div>
  );
};

export default UserDashboard;
