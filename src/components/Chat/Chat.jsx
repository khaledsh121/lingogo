import { useState, useRef, useEffect } from "react";
import "../Chat/Chat.css";
import PagesList from "../PagesList/PagesList";
import { Send } from "../../AssetsFolder/Images";
import {
  chatWithAiAgent,
  fetchTranslation,
  getCurentChat,
} from "../../Utils/Utils";
import { useLocation } from "react-router-dom";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [userMessage, setUserMessage] = useState("");
  const [responding, setResponding] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const location = useLocation();
  const [chatId, setChatId] = useState(location.state?.chatId || null);
  useEffect(() => {
    const translateIntroMessage = async () => {
      const translation = await fetchTranslation(
        "Please enter a word so I can provide you with 10 sentences that use this word, along with their translations and pronunciations.",
        "native"
      );
      setMessages((prev) => {
        return prev[0]
          ? prev
          : [
              {
                message: "",
                response: translation,
                key: 1,
              },
            ];
      });
    };

    translateIntroMessage();
  }, []);

  const handleInputChange = (event) => {
    setUserMessage(event.target.value);
  };

  const handleSendClick = async () => {
    if (userMessage.trim() === "") return;

    setMessages([
      ...messages,
      { message: userMessage, response: "", key: Date.now() },
    ]);

    const userMsg = userMessage;
    setUserMessage("");
    setResponding(true);
    try {
      const aiResponse = await chatWithAiAgent(userMsg, chatId);
      setResponding(false);
      setChatId(aiResponse.chatId);
      setMessages((prevMessages) => {
        if (prevMessages.length === 0) {
          return [{ message: userMsg, response: aiResponse, key: Date.now() }];
        }

        return [
          ...prevMessages.slice(0, -1),
          { message: userMsg, response: aiResponse.newText, key: Date.now() },
        ];
      });
    } catch (error) {
      console.error("Error fetching AI response:", error);
    }

    inputRef.current?.focus();
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const fetchCurrentChat = async () => {
      if (chatId) {
        const currentChat = await getCurentChat(chatId);
        setMessages((prev) => [...prev, ...currentChat.messages]);
      }
    };

    fetchCurrentChat();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="chat-container">
      <PagesList active={4} />
      <div className="messages-container">
        <div>
          {messages.map((item) => (
            <div key={item.key}>
              {item.message && (
                <div className="message">
                  <div>{item.message}</div>
                </div>
              )}
              {item.response && (
                <div className="response">
                  <div dangerouslySetInnerHTML={{ __html: item.response }} />
                </div>
              )}
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
