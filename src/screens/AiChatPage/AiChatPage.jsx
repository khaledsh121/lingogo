import "../AiChatPage/AiChatPage.css";
import AthunticatedNavBar from "../../components/AthunticatedNavBar/AthunticatedNavBar";
import AiChat from "../../components/AiChat/AiChat";

const AiChatPage = () => {
  return (
    <div className="aichat-page-container">
      <AthunticatedNavBar />
      <AiChat />
    </div>
  );
};

export default AiChatPage;
