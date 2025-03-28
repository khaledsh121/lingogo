import "./SubmitPresentationPage.css";
import AthunticatedNavBar from "../../components/AthunticatedNavBar/AthunticatedNavBar";
import SubmitPresentation from "../../components/SubmitPresentation/SubmitPresentation";

const SubmitPresentationPage = () => {
  return (
    <div className="submit-presentation-page-container">
      <AthunticatedNavBar />
      <SubmitPresentation />
    </div>
  );
};

export default SubmitPresentationPage;
