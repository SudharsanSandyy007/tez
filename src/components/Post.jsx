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
  doc,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import React from "react";
import { Link } from "react-router-dom";
import db from "../firebase";
import { useStateValue } from "../StateProvider";
import "../styles/Post.css";
function Post({
  address,
  postid,
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
  status,
}) {
  const [{ user }, dispatch] = useStateValue();

  const reqPayment = (e) => {
    const colref = collection(db, "paymentreq");
    const hseinfo = postid;
    e.value = "REQUESTED";
    addDoc(colref, {
      from: user.email,
      to: email,
      houseinfo: postid,
      status: "REQUESTED",
      requestedOn: serverTimestamp(),
    })
      .then((result) => {
        e.target.innerHTML = "REQUESTED";
        e.target.disabled = "disabled";
      })
      .catch((err) => {
        alert("failled");
      });
  };

  return (
    <div className="post postmargin">
      <div className="post__info">
        <div className="post__infoLeft">
          <Avatar src={profilePic} />
        </div>
        <div className="post__infoRight">
          <h2>{displayName}</h2>
          <p>{new Date(timestamp?.toDate()).toLocaleString()}</p>
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
              <h1 style={{ color: "green" }}>STATUS: {status}</h1>
            </div>

            <div className="post__row3RightBottom__option">
              <FavoriteBorderOutlined />
            </div>
            <div className="post__row3RightBottom__option">
              <Flag />
            </div>
          </div>
        </div>
      </div>

      <div className="post__row4">
        Nearby Places: {nearbyplaces}{" "}
        <a
          target="blank"
          href={`https://api.whatsapp.com/send/?phone=91${ownerph}&text=Hey%20Hi!%20I'm%20interested%20in%20renting%20your%20${bedrooms}BHK%20${appartmentType}%20at%20${locality}%20for%20which%20you%20posted%20an%20advertisement%20in%20RENT-A-HOUSE.&app_absent=0`}
        >
          <button className="chatwithownerbtn">Chat with owner</button>
        </a>
        {status != "BOOKED" && (
          <button className="reqownerbtn" onClick={reqPayment}>
            REQ THE OWNER FOR PAYMENT
          </button>
        )}
      </div>
    </div>
  );
}

export default Post;
