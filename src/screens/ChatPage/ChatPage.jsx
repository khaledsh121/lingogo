import "../ChatPage/ChatPage.css";
import AthunticatedNavBar from "../../components/AthunticatedNavBar/AthunticatedNavBar";
import Chat from "../../components/Chat/Chat";

const ChatPage = () => {
  return (
    <div className="chat-page-container">
      <AthunticatedNavBar />
      <Chat />
    </div>
  );
};

export default ChatPage;
