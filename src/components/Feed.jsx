import React, { useEffect, useState } from "react";
import Post from "./Post";
import db from "../firebase";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useLocation } from "react-router-dom";
import "../styles/css/Feed.css";
function Feed() {
  const { search } = useLocation();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const collRef = collection(db, "posts");

    let q = query(collRef);
    //search with city name from home
    if (search) {
      const city = new URLSearchParams(search).get("city");
      q = query(collRef, where("city", "==", city));

      getDocs(q).then((snapshot) => {
        let p = [];
        snapshot.docs.forEach((doc) => {
          p.push({ ...doc.data(), id: doc.id });
        });
        setPosts(p);
      });
    } else {
      onSnapshot(collRef, (snapshot) => {
        let p = [];
        snapshot.docs.forEach((doc) => {
          p.push({ ...doc.data(), id: doc.id });
        });

        setPosts(p);
      });
    }
  }, [search]);

  return (
    <div className="feed">
      {posts.map((post) => {
        return (
          <Post
            key={post.id}
            postid={post.id}
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
            status={post.status}
          />
        );
      })}
    </div>
  );
}

export default Feed;
