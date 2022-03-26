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
  setDoc,
  updateDoc,
} from "firebase/firestore";
import React from "react";
import { Link } from "react-router-dom";
import db from "../firebase";
import { useStateValue } from "../StateProvider";
import "../styles/PostReq.css";
function PostReq({
  address,
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
  reqBy,
  requestedOn,
  status,
}) {
  const [{ user }, dispatch] = useStateValue();

  const acceptReq = (e) => {
    const docref = doc(db, "paymentreq", reqid);
    updateDoc(docref, {
      status: "ACCEPTED",
    })
      .then((responce) => {})
      .catch((err) => {});
  };
  const rejectReq = (e) => {
    const docref = doc(db, "paymentreq", reqid);
    updateDoc(docref, {
      status: "REJECTED",
    })
      .then((responce) => {})
      .catch((err) => {});
  };

  return (
    <div className="post">
      <div className="post__info">
        <div className="post__infoLeft">
          <h1>FROM:</h1>
        </div>
        <div className="post__infoRight">
          <h2>{reqBy}</h2>
          <p>{new Date(requestedOn?.toDate()).toString()}</p>
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
          <div className="">
            <h1 style={{ color: "green", marginTop: "10px" }}>
              STATUS: {status}
            </h1>
          </div>
          {status != "BOOKED" && (
            <div className="post__row3Right__bottom">
              <button className="acceptreq" onClick={acceptReq}>
                ACCEPT REQUEST
              </button>
              <button className="rejectreq" onClick={rejectReq}>
                REJECT REQUEST
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PostReq;
