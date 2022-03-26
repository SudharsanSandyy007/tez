import { Avatar } from "@mui/material";
import React from "react";
import "../styles/chatlog.css";
function ChatLog({ email }) {
  return (
    <div className="chatlog">
      <Avatar />
      <h4>{email}</h4>
    </div>
  );
}

export default ChatLog;
