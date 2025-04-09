import "../AiChat/AiChat.css";
import PagesList from "../PagesList/PagesList";
import { Robot } from "../../AssetsFolder/Images";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserChats } from "../../Utils/Utils";

const AiChat = () => {
  const navigate = useNavigate();
  const handleDivPick = (chatId) => {
    navigate(".././chat", { state: { chatId } });
  };

  const [userChats, setUserChats] = useState([]);

  useEffect(() => {
    const fetchUserChats = async () => {
      const userChats = await getUserChats();
      setUserChats(userChats);
    };
    fetchUserChats();
  }, []);

  return (
    <div className="aichat-container">
      <PagesList active={4} />
      <div className="ai-chat">
        <img src={Robot} alt="Robot" className="Robot" />
        <div className="chats-scroll">
          <div onClick={() => handleDivPick(null)} className="chat-card">
            +
          </div>
          {userChats && userChats.length > 0 ? (
            userChats.map((item, index) => (
              <div
                key={index}
                className="chat-card"
                onClick={() => {
                  handleDivPick(item._id);
                }}
              >
                {item.messages.map((message, i) => (
                  <div key={i}>
                    {message.message}
                    <br />
                  </div>
                ))}
              </div>
            ))
          ) : (
            <div>No chats yet</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AiChat;
