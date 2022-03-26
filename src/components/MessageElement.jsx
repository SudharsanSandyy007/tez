import { Avatar } from "@mui/material";
import React from "react";
import "../styles/MessageElement.css";

function MessageElement({ displayName, msg }) {
  return (
    <div className="messageelement">
      <div className="messageelement__left">
        <Avatar />
      </div>

      <div className="messageelement__right">
        <h4>{displayName}</h4>
        <p>{msg}</p>
      </div>
    </div>
  );
}

export default MessageElement;
