import "../CreatePresentationPage/CreatePresentationPage.css";
import AthunticatedNavBar from "../../components/AthunticatedNavBar/AthunticatedNavBar";
import CreatePresentation from "../../components/CreatePresentation/CreatePresentation";

const CreatePresentationPage = () => {
  return (
    <div className="create-presentation-page-container">
      <AthunticatedNavBar />
      <CreatePresentation />
    </div>
  );
};

export default CreatePresentationPage;
