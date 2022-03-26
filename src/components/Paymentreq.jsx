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
import PostReq from "./PostReq";
import "../styles/Paymentreq.css";

function Paymentreq() {
  const [{ user }] = useStateValue();
  const [reqs, setReqs] = useState([]);
  const [reqposts, setReqposts] = useState([]);
  useEffect(() => {
    const colref = collection(db, "paymentreq");
    const q = query(colref, where("to", "==", user.email));
    getDocs(q).then((snapshot) => {
      let treq = [];
      snapshot.docs.forEach((doc) => {
        treq.push({
          reqid: doc.id,
          houseinfo: doc.data().houseinfo,
          reqBy: doc.data().from,
          requestedOn: doc.data().requestedOn,
        });
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
                id: req.reqid,
                ...snapshot.data(),
                reqBy: req.reqBy,
                requestedOn: req.requestedOn,
              },
            ];
          });
          // preq.push({
          //   id: req.reqid,
          //   ...snapshot.data(),
          //   reqBy: req.reqBy,
          //   requestedOn: req.requestedOn,
          // });
          // setReqposts(preq);
        });
      });
    });
  }, []);
  return (
    <div className="paymentreq">
      <h1> P A Y M E N T &nbsp;&nbsp;&nbsp;R E Q U E S T S </h1>
      {reqposts.map((post) => (
        <PostReq
          key={post.id}
          reqid={post.id}
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
          reqBy={post.reqBy}
          requestedOn={post.requestedOn}
          status={post.status}
        />
      ))}
    </div>
  );
}

export default Paymentreq;
