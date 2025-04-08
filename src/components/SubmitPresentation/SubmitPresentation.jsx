import "../SubmitPresentation/SubmitPresentation.css";
import PagesList from "../PagesList/PagesList";
import { useLocation, useNavigate } from "react-router-dom";
import { savePresentation } from "../../Utils/Utils";

const SubmitPresentation = () => {
  const location = useLocation();
  const prevPresentation = location.state?.prevPresentation || [];
  const navigate = useNavigate();
  const handleSavePresentation = () => {
    savePresentation(prevPresentation);
    navigate("/ShowPresentation", {
      state: { presentation: { slides: prevPresentation } },
    });
  };
  const handleReturnClick = () => {
    navigate("/createPresentation", { state: { prevPresentation } });
  };
  return (
    <div className="submit-presentation-container">
      <PagesList active={3} />
      <div className="scroll-div">
        {prevPresentation.map((item) => {
          return (
            <div className="image-container" key={item.id}>
              <img src={item.source} alt={item.nativeLanguage} />
            </div>
          );
        })}

        <div className="save-btn-container">
          <button
            className="save-presentation"
            onClick={handleSavePresentation}
          >
            Save
          </button>
          <button className="save-presentation" onClick={handleReturnClick}>
            return
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubmitPresentation;
