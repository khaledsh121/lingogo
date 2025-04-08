import { useNavigate } from "react-router-dom";
import "../PagesList/PagesList.css";

const PagesList = ({ active }) => {
  const navigate = useNavigate();
  return (
    <div className="pages-container">
      <button
        className={active === 1 ? "page active-page" : "page"}
        onClick={() => {
          navigate("/Dashboard");
        }}
      >
        Home
      </button>
      <button
        className={active === 2 ? "page active-page" : "page"}
        onClick={() => {
          navigate("/Presentation");
        }}
      >
        Presentation
      </button>
      <button
        className={active === 3 ? "page active-page" : "page"}
        onClick={() => {
          navigate("/realScenario");
        }}
      >
        Real Scenario
      </button>
      <button
        className={active === 4 ? "page active-page" : "page"}
        onClick={() => {
          navigate("/AiChat");
        }}
      >
        Ai Chatting
      </button>
    </div>
  );
};

export default PagesList;
