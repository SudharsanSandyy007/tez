import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import db from "../firebase";
import { useStateValue } from "../StateProvider";
import TrackReqComp from "./TrackReqComp";
import "../styles/TrackReq.css";

function TrackReq() {
  const [{ user }] = useStateValue();
  const [reqs, setReqs] = useState([]);
  const [reqposts, setReqposts] = useState([]);

  useEffect(() => {
    const colref = collection(db, "paymentreq");
    const q = query(colref, where("from", "==", user.email));
    let treq = [];

    getDocs(q).then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        treq.push({ id: doc.id, ...doc.data() });
      });
      setReqs(treq);

      let preq = [];
      treq.forEach((req) => {
        const docref = doc(db, "posts", req.houseinfo);

        getDoc(docref).then((snapshot) => {
          setReqposts((prev) => {
            return [
              ...prev,
              {
                id: req.id,
                rstatus: req.status,
                postid: req.houseinfo,
                ...snapshot.data(),
              },
            ];
          });

          // preq.push({
          //   id: req.id,
          //   rstatus: req.status,
          //   postid: req.houseinfo,
          //   ...snapshot.data(),
          // });
          // setReqposts(preq);
        });
      });
    });
  }, []);
  return (
    <div className="trackrequest">
      <h1>T R A C K &nbsp; &nbsp; &nbsp; R E Q U E S T </h1>
      {reqposts.map((post) => (
        <TrackReqComp
          key={post.id}
          reqid={post.id}
          postid={post.postid}
          email={post.email}
          address={post.address}
          appartmentType={post.apartmentType}
          bathrooms={post.bathrooms}
          bedrooms={post.bedrooms}
          city={post.city}
          deposit={post.deposit}
          displayName={post.displayName}
          kitchen={post.kitchen}
          locality={post.locality}
          nearbyplaces={post.nearbyplaces}
          ownerph={post.ownerph}
          parking={post.parking}
          postURL={post.postURL}
          profilePic={post.profilePic}
          rent={post.rent}
          sqrft={post.sqrft}
          timestamp={post.timestamp}
          rstatus={post.rstatus}
        />
      ))}
    </div>
  );
}

export default TrackReq;
