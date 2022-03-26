import React, { useEffect, useState } from "react";
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
  getDoc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { Link } from "react-router-dom";
import db from "../firebase";
import { useStateValue } from "../StateProvider";
import "../styles/YourPropComp.css";
import YourBookingsComp from "./YourBookingsComp";

function YourPropComp({
  address,
  apartmentType,
  bathrooms,
  bedrooms,
  city,
  deposit,
  displayName,
  email,
  kitchen,
  locality,
  nearbyplaces,
  ownerph,
  parking,
  postURL,
  postid,
  profilePic,
  rent,
  sqrft,
  status,
  timestamp,
}) {
  const [bookings, setBookings] = useState([]);
  const [bkdon, setbkdon] = useState("");
  const [rentHisTable, setRentHisTable] = useState([]);
  const [remdays, setremdays] = useState(0);

  useEffect(() => {
    const collref = collection(db, "bookings");
    const q = query(collref, where("houseinfo", "==", postid));
    let treq = [];
    let bkd = "";
    getDocs(q).then((res) => {
      res.docs.forEach((doc) => {
        treq.push({ bookingid: doc.id, ...doc.data() });
        setbkdon(doc.data().bookedOn);
        bkd = doc.data().bookedOn;
      });

      setBookings(treq);

      const trentHisTable = [];
      treq.forEach((doc) => {
        doc.renthistory.forEach((r) => {
          trentHisTable.push(r);
        });
      });
      setRentHisTable(trentHisTable);

      //getting remaining days
      let today = new Date().getTime();
      let duedate = new Date(bkd?.toDate()).getTime() + 86400 * 30000;
      let msDay = 24 * 60 * 60 * 1000; // milliseconds per day
      let days = Math.floor((duedate - today) / msDay);

      setremdays(days);
    });
  }, []);

  const showRentHistory = (e) => {
    //showrenthistory
    document.querySelector(".rnthis").style.display = "block";
  };

  const deletepost = (e) => {
    e.preventDefault();
    const docref = doc(db, "posts", postid);
    deleteDoc(docref)
      .then((res) => {
        alert(res);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <div className="yourpropcomp">
      <div className="post__info">
        <div className="post__infoLeft">
          <Avatar src={profilePic} />
        </div>
        <div className="post__infoRight">
          <h2>{displayName}</h2>
          <p>{new Date(timestamp?.toDate()).toString()}</p>
        </div>
      </div>
      <div className="post__row1">
        <h1 className="houseinfo">
          {bedrooms}BHK {apartmentType} for Rent In {locality} | {city}
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
              <h1 style={{ color: "green" }}>STATUS: {status}</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="post__row4">
        Nearby Places: {nearbyplaces}
        {status != "BOOKED" && (
          <Link to={`/chat/${postid}`}>
            <button onClick={deletepost} className="chatwithownerbtn">
              Delete Post
            </button>
          </Link>
        )}
        {status == "BOOKED" && (
          <button onClick={showRentHistory} className="reqownerbtn">
            VIEW RENT HISTORY
          </button>
        )}
        <div style={{ display: "none" }} className="rnthis">
          <div>
            <h1>RENT HISTORY</h1>
            <div className="yourbookingscomp">
              <div className="yourbookingscomp__top">
                <h1 className="houseinfo">
                  {bedrooms}BHK {apartmentType} | {locality} | {city}{" "}
                </h1>
                <p>{address}</p>
              </div>
              <div className="yourbookingscomp__middle">
                <div className="ybcMiddle__option">
                  <h2>OWNER: </h2>
                  <p>{email}</p>
                </div>
                <div className="ybcMiddle__option">
                  <h2>DEPOSIT: </h2>
                  <p> ₹{deposit}</p>
                </div>
                <div className="ybcMiddle__option">
                  <h2>RENT: </h2>
                  <p> ₹{rent}</p>
                </div>
                <div className="ybcMiddle__option">
                  <h2>RENTED ON: </h2>
                  <p>
                    {bookings.map((r) => {
                      return (
                        <p>{new Date(r.bookedOn?.toDate()).toDateString()}</p>
                      );
                    })}
                  </p>
                </div>
              </div>
              <div className="yourbookingscomp__bottom">
                <div className="ybcBottom__renthistory">
                  <h2>RENT HISTORY</h2>
                  <table border="1">
                    <thead>
                      <tr>
                        <th>S.no:</th>
                        <th>Rent/Deposit Due Date</th>
                        <th>Actually Paid on</th>
                        <th>Status</th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr>
                        <td>( Deposit )</td>
                        <td>
                          {bookings.map((r) => (
                            <p>
                              {new Date(r.bookedOn?.toDate()).toDateString()}
                            </p>
                          ))}
                        </td>
                        <td>
                          {bookings.map((r) => {
                            return (
                              <p>
                                {new Date(r.bookedOn?.toDate()).toDateString()}
                              </p>
                            );
                          })}
                        </td>
                        <td>Paid</td>
                      </tr>

                      {rentHisTable.map((his) => {
                        return (
                          <tr key={his}>
                            <td> ( Rent )</td>
                            <td>{his}</td>
                            <td>{his}</td>
                            <td>Paid</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <div>
                  <div className="ybcBottom__nextDue">
                    Remaining days for Next Rent Due : {remdays}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default YourPropComp;
