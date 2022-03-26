import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import db from "../firebase";
import { useStateValue } from "../StateProvider";
import YourBookingsComp from "./YourBookingsComp";

function YourBookings() {
  const [{ user }] = useStateValue();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const colref = collection(db, "bookings");
    const q = query(colref, where("bookedby", "==", user.email));
    let treq = [];
    onSnapshot(q, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        treq.push({ bookingid: doc.id, ...doc.data() });
      });
      let reqposts = [];
      treq.forEach((req) => {
        const docref = doc(db, "posts", req.houseinfo);
        getDoc(docref).then((response) => {
          setBookings((prev) => {
            return [
              ...prev,
              {
                postid: response.id,
                ...response.data(),
                bookedOn: req.bookedOn,
                bookedby: req.bookedby,
                owner: req.owner,
                reqid: req.reqid,
                bookingid: req.bookingid,
              },
            ];
          });
        });
      });
    });
  }, []);

  return (
    <div className="yourbookings">
      {bookings.map((post) => (
        <YourBookingsComp
          key={post.bookingid}
          bookingid={post.bookingid}
          bedrooms={post.bedrooms}
          apartmentType={post.apartmentType}
          locality={post.locality}
          city={post.city}
          owner={post.email}
          deposit={post.deposit}
          rent={post.rent}
          rentedon={post.bookedOn}
          address={post.address}
        />
      ))}
    </div>
  );
}

export default YourBookings;
