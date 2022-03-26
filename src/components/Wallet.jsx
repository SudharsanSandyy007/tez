import { AccountBalanceWallet } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import db from "../firebase";
import { useStateValue } from "../StateProvider";
import "../styles/Wallet.css";
import emailjs from "emailjs-com";
function Wallet() {
  const [{ user }] = useStateValue();
  const [amt, setamt] = useState(0);
  const [walletId, setwalletId] = useState("");

  useEffect(() => {
    //creating wallet if not exists

    const wallcolref = collection(db, "wallet");
    const qr = query(wallcolref, where("owner", "==", user.email));
    let found = 0;
    getDocs(qr)
      .then((res) => {
        res.docs.forEach((doc) => {
          if (doc.data().owner == user.email) {
            found = 1;
          }
        });
        if (found == 0) {
          const colref = collection(db, "wallet");
          addDoc(colref, {
            owner: user.email,
            amount: 0,
          });
        } else {
        }
      })
      .catch((err) => {});

    //

    const colref = collection(db, "wallet");
    const q = query(colref, where("owner", "==", user.email));
    let temp = "";
    onSnapshot(q, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        temp = doc.data().amount;
        setwalletId(doc.id);
      });
      setamt(temp);
    });
  }, []);

  const withdraw = () => {
    const wamt = prompt("Enter withdrawal amount: ", 100);
    if (wamt > amt) {
      alert("Amount should be less than or equal to " + amt);
    } else {
      const docref = doc(db, "wallet", walletId);
      updateDoc(docref, {
        amount: amt - wamt,
      })
        .then(() => {
          //SENDING WITHDRAWAL EMAIL TO USERS | EMAILJS

          var templateParams = {
            to_name: user.displayName,
            amount: wamt,
            toemail: user.email,
          };

          emailjs
            .send(
              "service_twzv28b",
              "template_qrtznem",
              templateParams,
              "1bOtIk79UwWjHDWH8"
            )
            .then(
              function (response) {
                console.log("SUCCESS!", response.status, response.text);
              },
              function (error) {
                console.log("FAILED...", error);
              }
            );

          alert("WALLET UPDATED");
        })
        .catch((e) => {
          console.log(e.message);
        });
    }
  };

  return (
    <div className="wallet">
      <div className="walletTag">
        <Avatar className="walletProfilePic" src={user.photoURL} />
        <h3>{user.email}</h3>
        <div className="walletBox">
          <div className="walletBox__top">
            <div className="walletBoxTop__left">
              <AccountBalanceWallet className="walleticn" />
            </div>
            <div className="walletBoxTop__right">
              <p>Total INR Balance</p>
              <b>₹{amt}</b>
            </div>
          </div>
          <div onClick={withdraw} className="walletBox__bottom">
            WITHDRAW
          </div>
        </div>
      </div>
    </div>
  );
}

export default Wallet;
