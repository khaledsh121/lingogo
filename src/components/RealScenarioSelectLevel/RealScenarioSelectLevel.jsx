import "../RealScenarioSelectLevel/RealScenarioSelectLevel.css";
import { useState, useEffect } from "react";
import PagesList from "../PagesList/PagesList";
import {
  DemoImg,
  SceneImg,
  ActiveLevel,
  DisactiveLevel,
} from "../../AssetsFolder/Images";
import { useNavigate, useLocation } from "react-router-dom";
import { getUserLevel } from "../../Utils/Utils";

const RealScenarioSelectLevel = () => {
  const location = useLocation();
  const levels = 20;
  const containerWidth = 300;
  const [positions, setPositions] = useState([]);
  const [currentLevel, setCurrentLevel] = useState(
    location?.state?.currentLevel || 1
  );
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const navigate = useNavigate();

  const handleLevelClick = (index) => {
    navigate("/level", { state: { index } });
  };

  useEffect(() => {
    setPositions(
      Array.from({ length: levels }, (_, i) => ({
        x: Math.random() * (containerWidth - 100) + 100,
        y: i * 130,
      }))
    );
  }, []);

  useEffect(() => {
    const fetchUserLevel = async () => {
      const userLevel = await getUserLevel();
      setCurrentLevel(userLevel);
    };
    fetchUserLevel();
  }, []);

  return (
    <div className="real-scenario-select-level-container">
      <PagesList active={3} />
      {positions[0] && (
        <div className="real-scenario-select">
          <div>
            <div className="levels">
              <img
                src={DemoImg}
                alt="profile img"
                className="scene-profile-img"
                style={{
                  position: "absolute",
                  left:
                    positions[currentLevel - 1].x > containerWidth / 2
                      ? `${positions[currentLevel - 1].x - 90}px`
                      : `${positions[currentLevel - 1].x + 90}px`,
                  top: `${positions[currentLevel - 1].y}px`,
                }}
              />

              {positions.map((pos, i) => (
                <div key={i}>
                  <img
                    src={i + 1 <= currentLevel ? ActiveLevel : DisactiveLevel}
                    alt={`level ${i + 1}`}
                    className="level-img"
                    style={{
                      position: "absolute",
                      left: `${pos.x}px`,
                      top: `${pos.y}px`,
                      cursor: i + 1 <= currentLevel ? "pointer" : "default",
                      transform: hoveredIndex === i ? "scale(0.7)" : "scale(1)",
                      transition: "transform 0.3s ease-in-out",
                    }}
                    onMouseDown={
                      i + 1 <= currentLevel
                        ? () => setHoveredIndex(i)
                        : undefined
                    }
                    onMouseUp={
                      i + 1 <= currentLevel
                        ? () => setHoveredIndex(null)
                        : undefined
                    }
                    onMouseLeave={
                      i + 1 <= currentLevel
                        ? () => setHoveredIndex(null)
                        : undefined
                    }
                    onClick={
                      i + 1 <= currentLevel
                        ? () => handleLevelClick(i)
                        : undefined
                    }
                  />

                  {i < positions.length - 1 &&
                    (() => {
                      const nextPos = positions[i + 1];

                      const verticalHeight = 80;
                      const horizontalWidth = Math.abs(nextPos.x - pos.x);
                      const horizontalDirection = nextPos.x > pos.x ? 1 : -1;

                      return (
                        <>
                          <div
                            style={{
                              position: "absolute",
                              left: `${pos.x + 40}px`,
                              top: `${pos.y + 80}px`,
                              width: "4px",
                              height: `${verticalHeight}px`,
                              backgroundColor: "#6918E8",
                            }}
                          />

                          <div
                            style={{
                              position: "absolute",
                              left: `${pos.x + 44}px`,
                              top: `${pos.y + 80 + verticalHeight}px`,
                              width: `${horizontalWidth}px`,
                              height: "4px",
                              backgroundColor: "#6918E8",
                              transform: `translateX(${
                                horizontalDirection === -1
                                  ? -horizontalWidth
                                  : 0
                              }px)`,
                            }}
                          />
                        </>
                      );
                    })()}
                </div>
              ))}
            </div>
          </div>
          <img src={SceneImg} alt="profile img" className="SceneImg" />
        </div>
      )}
    </div>
  );
};

export default RealScenarioSelectLevel;
