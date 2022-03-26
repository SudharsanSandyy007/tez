import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ChatLog from "./ChatLog";
import db from "../firebase";

function ChatSideBar() {
  const [chatAccnts, setchatAccnts] = useState([]);
  useEffect(() => {
    const colref = collection(db, "chats");

    onSnapshot(colref, (snapshot) => {
      let temp = [];
      snapshot.docs.map((doc) => {
        temp.push({ account: doc.data().account, id: doc.id });
      });
      setchatAccnts(temp);
    });
  }, []);

  return (
    <div className="chatsidebar">
      {chatAccnts.map((chat) => {
        return (
          <Link key={chat.id} to={`/chatbox/${chat.id}`}>
            <ChatLog key={chat.id} email={chat.account} />
          </Link>
        );
      })}
    </div>
  );
}

export default ChatSideBar;
