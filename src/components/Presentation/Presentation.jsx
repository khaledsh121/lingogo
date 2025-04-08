import "../Presentation/Presentation.css";
import PagesList from "../PagesList/PagesList";
import { ToDoList } from "../../AssetsFolder/Images";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPresentations } from "../../Utils/Utils";

const Presentation = () => {
  const [userPresentations, setUserPresentations] = useState([]);
  const navigate = useNavigate();

  const handleCreatePresentationClick = () => {
    navigate("/CreatePresentation");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPresentations();
        setUserPresentations(data);
      } catch (error) {
        console.error("Error fetching presentations:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="presentation-container">
      <PagesList active={2} />
      <div className="create-presentation">
        <div
          className="create-presentation-start-btn"
          onClick={handleCreatePresentationClick}
        >
          <div className="create-presentation-start-text">
            <span>+</span>
            <p>Create presentation</p>
          </div>
        </div>
        {userPresentations.length > 0 ? (
          <div className="scroll">
            {userPresentations.map((item, index) => {
              return (
                <img
                  src={item.slides[0].source}
                  alt="user presentation img"
                  className="previos-presentation-firt-pic"
                  key={index}
                  onClick={() => {
                    navigate("/ShowPresentation", {
                      state: { presentation: item },
                    });
                  }}
                />
              );
            })}
          </div>
        ) : (
          <img
            src={ToDoList}
            alt="to Do List"
            className="no-presntarion-created"
          />
        )}
      </div>
    </div>
  );
};

export default Presentation;
