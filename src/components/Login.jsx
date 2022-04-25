import { onAuthStateChanged, signInWithPopup } from "firebase/auth";
import React, { useEffect } from "react";
import db, { auth, provider } from "../firebase";
import { actionTypes } from "../reducer";
import { useStateValue } from "../StateProvider";
import HomeIcon from "@mui/icons-material/Home";
import "../styles/Login.css";
import {
  addDoc,
  collection,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

function Login() {
  const [, dispatch] = useStateValue();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch({
          user: user,
          type: actionTypes.SET_USER,
        });
      }
    });
    return unsubscribe;
  }, [dispatch]);

  const login = () => {
    signInWithPopup(auth, provider)
      .then((response) => {
        console.log(response);
        dispatch({
          type: actionTypes.SET_USER,
          user: response.user,
        });

        //for adding user id to db if the user is logging in for the first time.
        const collref = collection(db, "users");
        let userList = [];
        getDocs(collref).then((snapchat) => {
          snapchat.docs.forEach((doc) => {
            userList.push({ ...doc.data() });
          });

          let isPresent = false;
          userList.forEach((u) => {
            if (u.email == response.user.email) {
              isPresent = "true";
            }
          });

          if (isPresent != "true") {
            addDoc(collref, {
              email: response.user.email,
            })
              .then((result) => {
                console.log(result);
                console.log("NEW USER CREATED!!!");
              })
              .catch((err) => {
                alert(err.message);
              });
          } else {
            console.log("EMAILLL EXISTS!!!");
          }
        });

        //for adding user id to db if the user is logging in for the first time.
        const walletref = collection(db, "wallet");
        let walletList = [];
        getDocs(walletref).then((snapchat) => {
          snapchat.docs.forEach((doc) => {
            walletList.push({ ...doc.data(), walletid: doc.id });
          });

          let isWalletPresent = false;
          walletList.forEach((u) => {
            if (u.email == response.user.email) {
              isWalletPresent = "true";
            }
          });

          if (isWalletPresent != "true") {
            addDoc(walletref, {
              owner: response.user.email,
              amount: 0,
            })
              .then((result) => {
                console.log(result);
                console.log("NEW WALLET CREATED!!!");
              })
              .catch((err) => {
                alert(err.message);
              });
          } else {
            console.log("Wallet EXISTS!!!");
          }
        });
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div className="login__container">
      <h1>Welcome! Rent Properties that connects to your Heart :)</h1>
      <div className="login">
        <div className="login__logo">
          <h4>
            &nbsp; RENT A <br />
            <div>
              <HomeIcon />
              OUSE
            </div>
          </h4>
        </div>
        <div onClick={login} className="login__btn">
          <img
            className="googlelogo"
            src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-webinar-optimizing-for-success-google-business-webinar-13.png"
            alt=""
          />{" "}
          <b> LOGIN WITH GOOGLE </b>
        </div>
      </div>
    </div>
  );
}

export default Login;
