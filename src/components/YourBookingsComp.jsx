import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import emailjs from "emailjs-com";
import React, { useEffect, useState } from "react";
import db from "../firebase";
import { useStateValue } from "../StateProvider";
import "../styles/YourBookingsComp.css";

function YourBookingsComp({
  bedrooms,
  apartmentType,
  locality,
  city,
  owner,
  deposit,
  rent,
  rentedon,
  address,
  bookingid,
}) {
  const [remdays, setremdays] = useState(0);
  const [rentHisTable, setRentHisTable] = useState([]);
  const [{ user }] = useStateValue();
  const [walletId, setwalletId] = useState("");
  const [amount, setamount] = useState("");
  const [amt, setamt] = useState(0);

  useEffect(() => {
    //setting renthistory table
    const docref = doc(db, "bookings", bookingid);
    const trentHisTable = [];
    getDoc(docref).then((doc) => {
      doc.data().renthistory.forEach((r) => {
        trentHisTable.push(r);
      });
      setRentHisTable(trentHisTable);
    });

    let today = new Date().getTime();
    let duedate = new Date(rentedon?.toDate()).getTime() + 86400 * 30000;
    let msDay = 24 * 60 * 60 * 1000; // milliseconds per day
    let days = Math.floor((duedate - today) / msDay);

    setremdays(days);

    //ADDING RENT AMOUNT TO WALLET
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
    const q = query(colref, where("owner", "==", owner));
    let temp = "";
    onSnapshot(q, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        temp = doc.data().amount;
        setwalletId(doc.id);
      });
      setamt(temp);
    });
  }, []);

  const makePayment = (e) => {
    e.preventDefault();

    var options = {
      key: "rzp_test_KJIRu7kUHgB9iH",
      key_secret: "nmTV9B8YUvRzjWkhj73xpeWs",
      amount: rent * 100,
      currency: "INR",
      name: "RENT A HOUSE",
      description:
        "RENT AMOUNT: " +
        `${bedrooms}BHK flat/appartment in ${locality} | ${city}`,
      handler: function (response) {
        alert(response.razorpay_payment_id);

        const docref = doc(db, "bookings", bookingid);

        let thistory = [];
        getDoc(docref).then((doc) => {
          thistory = doc.data().renthistory;
          const ts = new Date();
          thistory.push(ts.toDateString());
          updateDoc(docref, {
            renthistory: thistory,
          });
        });

        const ramt = Number(amt) + Number(rent);
        if (rent < 0) {
          alert("Amount should be greater than 0.");
        } else {
          const docref = doc(db, "wallet", walletId);
          updateDoc(docref, {
            amount: ramt,
          })
            .then(alert("WALLET UPDATED"))
            .catch((e) => {
              console.log(e.message);
            });
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
    <div className="yourbookingscomp">
      <div className="yourbookingscomp__top">
        <h1 className="houseinfo">
          {bedrooms}BHK {apartmentType} | {locality} | {city}
        </h1>
        <p>{address}</p>
      </div>
      <div className="yourbookingscomp__middle">
        <div className="ybcMiddle__option">
          <h2>OWNER: </h2>
          <p>{owner}</p>
        </div>
        <div className="ybcMiddle__option">
          <h2>DEPOSIT: </h2>
          <p>₹{deposit}</p>
        </div>
        <div className="ybcMiddle__option">
          <h2>RENT: </h2>
          <p>₹{rent}</p>
        </div>
        <div className="ybcMiddle__option">
          <h2>RENTED ON: </h2>
          <p>{new Date(rentedon?.toDate()).toDateString()}</p>
        </div>
      </div>
      <div className="yourbookingscomp__bottom">
        <div className="ybcBottom__renthistory">
          <h2>RENT HISTORY</h2>
          <table border="1" id={bookingid}>
            <thead>
              <tr>
                <th>S.no:</th>
                <th>Rent/Deposit Due Date</th>
                <th>Actually Paid on</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody id={bookingid}>
              <tr>
                <td>( Deposit )</td>
                <td>{new Date(rentedon?.toDate()).toDateString()}</td>
                <td>{new Date(rentedon?.toDate()).toDateString()}</td>
                <td>Paid</td>
              </tr>
              {rentHisTable.map((his) => (
                <tr>
                  <td>{} ( Rent )</td>
                  <td>{new Date(rentedon?.toDate()).toDateString()}</td>
                  <td>{new Date(rentedon?.toDate()).toDateString()}</td>
                  <td>Paid</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          {remdays == 0 && (
            <button onClick={makePayment} className="ybcBottom__payBtn">
              PAY RENT
            </button>
          )}
          <div className="ybcBottom__nextDue">
            Remaining days for Next Rent Due : {remdays}
          </div>
        </div>
      </div>
    </div>
  );
}

export default YourBookingsComp;
