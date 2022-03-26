import React from "react";
import MessageElement from "./MessageElement";
import "../styles/MessageBar.css";
function MessageBar() {
  return (
    <div className="messagebar">
      <h4>Messages:</h4>
      <MessageElement displayName="Archana" msg="Hi..Hello!!!" />
      <MessageElement displayName="San" msg="Hi..Hello!!!" />
      <MessageElement displayName="Arjith" msg="Hi..Hello!!!" />
      <MessageElement displayName="Sandyy" msg="Hi..Hello!!!" />
    </div>
  );
}

export default MessageBar;
