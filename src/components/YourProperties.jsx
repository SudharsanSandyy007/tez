import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import db from "../firebase";
import { useStateValue } from "../StateProvider";
import YourPropComp from "./YourPropComp";
import "../styles/YourProperties.css";
function YourProperties() {
  const [{ user }] = useStateValue();
  const [reqposts, setReqposts] = useState([]);
  useEffect(() => {
    const colref = collection(db, "posts");
    const q = query(colref, where("email", "==", user.email));
    onSnapshot(q, (snapshot) => {
      let treq = [];
      snapshot.docs.forEach((doc) => {
        treq.push({
          postid: doc.id,
          ...doc.data(),
        });
      });
      setReqposts(treq);
    });
  }, []);
  return (
    <div className="yourproperties">
      {reqposts.map((post) => (
        <YourPropComp
          key={post.postid}
          address={post.address}
          apartmentType={post.apartmentType}
          bathrooms={post.bathrooms}
          bedrooms={post.bedrooms}
          city={post.city}
          deposit={post.deposit}
          displayName={post.displayName}
          email={post.email}
          kitchen={post.kitchen}
          locality={post.locality}
          nearbyplaces={post.nearbyplaces}
          ownerph={post.ownerph}
          parking={post.parking}
          postURL={post.postURL}
          postid={post.postid}
          profilePic={post.profilePic}
          rent={post.rent}
          sqrft={post.sqrft}
          status={post.status}
          timestamp={post.timestamp}
        />
      ))}
    </div>
  );
}

export default YourProperties;
