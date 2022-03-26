import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/Chat.css";
import ChatBox from "./ChatBox";
import ChatSideBar from "./ChatSideBar";
import db from "../firebase";

function Chat() {
  const { roomId } = useParams();
  useEffect(() => {
    if (true) {
      const docRef = doc(db, "posts", roomId);

      onSnapshot(docRef, (snapshot) => {});
    }
  }, [roomId]);

  return (
    <div className="chat">
      <ChatSideBar />
      <ChatBox />
    </div>
  );
}

export default Chat;
