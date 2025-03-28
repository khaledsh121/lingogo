import "../Presentation/PresentationPage.css";
import AthunticatedNavBar from "../../components/AthunticatedNavBar/AthunticatedNavBar";
import Presentation from "../../components/Presentation/Presentation";

const PresentationPage = () => {
  return (
    <div className="presentation-page-container">
      <AthunticatedNavBar />
      <Presentation />
    </div>
  );
};

export default PresentationPage;
