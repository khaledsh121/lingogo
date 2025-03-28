import { useState, useRef, useEffect } from "react";
import "../Chat/Chat.css";
import PagesList from "../PagesList/PagesList";
import { Send } from "../../AssetsFolder/Images";
import { chatWithAiAgent } from "../../Utils/Utils";

const Chat = () => {
  const [messages, setMessages] = useState([
    {
      message: "",
      response:
        "Please enter a word so I can provide you with 10 sentences that use this word, along with their translations and pronunciations.",
      key: 1,
    },
  ]);
  const [userMessage, setUserMessage] = useState("");
  const [responding, setResponding] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const handleInputChange = (event) => {
    setUserMessage(event.target.value);
  };

  const handleSendClick = async () => {
    if (userMessage.trim() === "") return;

    const userMsg = userMessage;
    setUserMessage("");
    setResponding(true);
    try {
      const aiResponse = await chatWithAiAgent(userMsg);
      setResponding(false);
      setMessages((prevMessages) => [
        ...prevMessages,
        { message: userMsg, response: aiResponse, key: Date.now() },
      ]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
    }

    inputRef.current?.focus();
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat-container">
      <PagesList active={4} />
      <div className="messages-container">
        <div>
          {messages.map((item) => (
            <div key={item.key}>
              <div className="message">
                <div>{item.message}</div>
              </div>
              <div className="response">
                <div dangerouslySetInnerHTML={{ __html: item.response }} />
              </div>
            </div>
          ))}
          {responding && messages.length <= 1 && (
            <div className="responding fixed">
              <div className="dots"></div>
              <div className="dots"></div>
              <div className="dots"></div>
            </div>
          )}
        </div>
        {responding && messages.length > 1 && (
          <div className="responding ">
            <div className="dots"></div>
            <div className="dots"></div>
            <div className="dots"></div>
          </div>
        )}
        <div ref={messagesEndRef} />
        <div className="message-input-container">
          <input
            ref={inputRef}
            type="text"
            className="message-input"
            placeholder="Write a Message ..."
            value={userMessage}
            onChange={handleInputChange}
            onKeyDown={(e) => e.key === "Enter" && handleSendClick()}
          />
          <img
            src={Send}
            alt="send"
            className="send"
            onClick={handleSendClick}
          />
        </div>
      </div>
    </div>
  );
};

export default Chat;
