import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/chatbox.css";
import db from "../firebase";

function ChatBox() {
  const { roomId } = useParams();
  const [receiver, setReceiver] = useState("");
  const [msgs, setMsgs] = useState([]);
  const [receiverId, setReveiverId] = useState();
  useEffect(() => {
    const colref = collection(db, `chats/${roomId}/msgs`);
    onSnapshot(colref, (snapshot) => {
      snapshot.docs.map((doc) => {
        setReceiver(doc.data());
        setReveiverId(doc.id);
      });
    });
    const colref1 = collection(
      db,
      `chats/${roomId}/msgs/${receiverId}/chatmsgs/`
    );
    onSnapshot(colref1, (snapshot) => {
      const tempmsgs = snapshot.docs.map((doc) => doc.data());
      setMsgs(tempmsgs);
    });
  }, [roomId, receiverId]);

  return (
    <div className="chatbox">
      <h1>{receiver.receiver}</h1>
      <div>
        <p>
          <b>MSG:</b>
          {msgs.map((msg) => {
            return (
              <div>
                <h1>by: {msg.sentby}</h1>
                <p>{msg.msg}</p>
              </div>
            );
          })}
        </p>
      </div>
    </div>
  );
}

export default ChatBox;
