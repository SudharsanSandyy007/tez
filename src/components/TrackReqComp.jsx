import {
  BathtubSharp,
  Countertops,
  DirectionsCar,
  FavoriteBorderOutlined,
  Flag,
  HotelSharp,
} from "@mui/icons-material";
import { Avatar } from "@mui/material";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import db from "../firebase";
import { useStateValue } from "../StateProvider";
import "../styles/TrackReqComp.css";
import { query } from "firebase/firestore";
function TrackReqComp({
  address,
  postid,
  reqid,
  email,
  appartmentType,
  bathrooms,
  bedrooms,
  city,
  deposit,
  displayName,
  kitchen,
  locality,
  nearbyplaces,
  ownerph,
  parking,
  postURL,
  profilePic,
  rent,
  sqrft,
  timestamp,
  rstatus,
}) {
  const [{ user }] = useStateValue();
  const [walletId, setwalletId] = useState("");
  const [amount, setamount] = useState("");
  const [amt, setamt] = useState(0);

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
    const q = query(colref, where("owner", "==", email));
    let temp = "";
    onSnapshot(q, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        temp = doc.data().amount;
        setwalletId(doc.id);
      });
      setamt(temp);
    });
  }, []);

  const cancelRequest = (e) => {
    e.preventDefault();
    const docref = doc(db, "paymentreq", reqid);
    deleteDoc(docref).catch((err) => {});
    alert("REQUEST CANCELLED!!!");
    window.location.reload();
  };

  const makePayment = (e) => {
    e.preventDefault();

    var options = {
      key: "rzp_live_ffQE7ZPSh9FoGY",
      key_secret: "lQie76WjJdNNpEZ00BddjTbQ",
      amount: deposit * 100,
      currency: "INR",
      name: "RENT A HOUSE",
      description:
        "DEPOSIT AMOUNT: " +
        `${bedrooms}BHK ${appartmentType} for Rent In ${locality} | ${city}`,
      handler: function (response) {
        alert(response.razorpay_payment_id);

        const docref = doc(db, "posts", postid);
        updateDoc(docref, {
          status: "BOOKED",
        });
        const docrefreq = doc(db, "paymentreq", reqid);
        updateDoc(docrefreq, {
          status: "BOOKED",
        });

        const bookingsref = collection(db, "bookings");
        addDoc(bookingsref, {
          bookedby: user.email,
          owner: displayName,
          houseinfo: postid,
          bookedOn: serverTimestamp(),
          reqid: reqid,
          deposit: deposit,
          rent: rent,
          renthistory: [],
        });

        const damt = Number(amt) + Number(deposit);
        if (damt < 0) {
          alert("Amount should be greater than 0.");
        } else {
          const docref = doc(db, "wallet", walletId);
          updateDoc(docref, {
            amount: damt,
          })
            .then(() => {
              alert("PAYMENT SUCCESSFULL !!!");
              window.location.reload();
            })
            .catch((e) => {});
        }
      },
      prefill: {
        name: user.displayName,
        email: user.email,
        contact: user.phonenumber,
      },
      notes: {
        address: "Razorpay corporate office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    var pay = new window.Razorpay(options);
    pay.open();
  };

  return (
    <div className="trackreqcomp">
      <div className="post__info">
        <div className="post__infoLeft">
          <Avatar src={profilePic} />
        </div>
        <div className="post__infoRight">
          <h2>{displayName}</h2>
          <p>{new Date(timestamp?.toDate()).toUTCString()}</p>
        </div>
      </div>
      <div className="post__row1">
        <h1 className="houseinfo">
          {bedrooms}BHK {appartmentType} for Rent In {locality} | {city}
        </h1>
        <p>{address}</p>
      </div>

      <div className="post__row2">
        <div className="post__row2Left">
          <h2>{sqrft} sqft</h2>
          <p>Buildup</p>
        </div>
        <div className="post__row2Middle">
          <h2>₹{deposit}</h2>
          <p>Deposit</p>
        </div>
        <div className="post__row3Right">
          <h2>₹{rent}</h2>
          <p>Rent</p>
        </div>
      </div>

      <div className="post__row3">
        <div className="post__row3Left">
          <img src={postURL} alt="" />
        </div>
        <div className="post__row3Right">
          <div className="post__row3Right__top">
            <div className="post__row3RightTopOption__left">
              <div className="post__row3RightTop_Option">
                <HotelSharp /> <span>{bedrooms} Bed Room</span>
              </div>
              <div className="post__row3RightTop_Option">
                <Countertops /> <span>{kitchen} Kitchen</span>
              </div>
            </div>

            <div className="post__row3RightTopOption__right">
              <div className="post__row3RightTop_Option">
                <BathtubSharp /> <span>{bathrooms} Bathroom </span>
              </div>
              <div className="post__row3RightTop_Option">
                <DirectionsCar /> <span>Parking: {parking ? "yes" : "no"}</span>
              </div>
            </div>
          </div>
          <div className="post__row3Right__bottom">
            <div className="post__row3RightBottom__option">
              <h2>Contact Owner:</h2>
              <p>Name: {displayName}</p>
              <p>ph: {ownerph}</p>
              <br />
              <h1 style={{ color: "green" }}>STATUS: {rstatus}</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="post__row4">
        Nearby Places: {nearbyplaces}
        {rstatus != "BOOKED" && (
          <button
            className="TrackReq_cancelBtn"
            style={{
              padding: "10px",
              margin: "0px 20px",
            }}
            onClick={cancelRequest}
          >
            CANCEL REQUEST
          </button>
        )}
        {rstatus == "ACCEPTED" && (
          <button onClick={makePayment}>MAKE PAYMENT</button>
        )}
      </div>
    </div>
  );
}

export default TrackReqComp;
