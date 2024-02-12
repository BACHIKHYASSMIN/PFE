import React, { useState } from 'react';
import './ChatBox.css'; 
import ChatIcon from "../Assets/chat.png";
import { useNavigate } from 'react-router-dom';

const ChatBox = () => {
  const [isChatOpen, setChatOpen] = useState(false);
  const navigate = useNavigate();
  const handleChatMode = () => {
    navigate('/interaction');
  };

 
  const toggleChat = () => {
    setChatOpen(!isChatOpen);
  };

  return (
    <div className={`chat-box ${isChatOpen ? 'open' : ''}`} onClick={toggleChat}>
      <img src={ChatIcon} alt="Chat Icon" className="chat-icon" onClick={handleChatMode} />
      
      
    </div>

    
  );
};



export default ChatBox;
