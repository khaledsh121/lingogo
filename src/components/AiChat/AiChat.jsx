import "../AiChat/AiChat.css";
import PagesList from "../PagesList/PagesList";
import { Robot } from "../../AssetsFolder/Images";
import { useNavigate } from "react-router-dom";

const AiChat = () => {
  const navigate = useNavigate();
  const handleDivPick = () => {
    navigate(".././chat");
  };
  return (
    <div className="aichat-container">
      <PagesList active={4} />
      <div className="ai-chat">
        <img src={Robot} alt="Robot" className="Robot" />
        <div className="chats-container">
          <div onClick={handleDivPick}>Noun</div>
          <div onClick={handleDivPick}>Verb</div>
          <div onClick={handleDivPick}>Sentence</div>
          <div onClick={handleDivPick}>Grammar</div>
        </div>
      </div>
    </div>
  );
};

export default AiChat;
