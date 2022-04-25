import React, { useEffect, useState } from "react";
import Post from "./Post";
import db from "../firebase";
import {
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useLocation } from "react-router-dom";
import "../styles/css/Feed.css";
import Filter from "./Filter";
function Feed() {
  const { search } = useLocation();
  const [posts, setPosts] = useState([]);

  const filterSearch = (aprtType) => {
    const collRef = collection(db, "posts");

    alert(aprtType);
    const filterq = query(
      collRef,
      where("beedrooms", "==", aprtType),
      orderBy("timestamp", "desc")
    );

    getDocs(filterq).then((snapshot) => {
      let p = [];
      snapshot.docs.forEach((doc) => {
        p.push({ ...doc.data(), id: doc.id });
      });
      setPosts(p);
    });
  };

  useEffect(() => {
    const collRef = collection(db, "posts");

    let q = query(collRef);
    //search with city name from home
    if (search) {
      const city = new URLSearchParams(search).get("city");
      console.log(city);
      const q = query(
        collRef,
        where("city", "==", city),
        orderBy("timestamp", "desc")
      );

      getDocs(q).then((snapshot) => {
        let p = [];
        snapshot.docs.forEach((doc) => {
          p.push({ ...doc.data(), id: doc.id });
        });
        setPosts(p);
      });
    } else {
      const q = query(collRef, orderBy("timestamp", "desc"));
      onSnapshot(q, (snapshot) => {
        let p = [];
        snapshot.docs.forEach((doc) => {
          p.push({ ...doc.data(), id: doc.id });
        });

        setPosts(p);
      });
    }
  }, [search]);

  return (
    <>
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
      <div
        style={{ backgroundColor: "inherit", boxShadow: "none" }}
        className="filter"
      >
        <Filter filterSearch={filterSearch} />
      </div>
    </>
  );
}

export default Feed;
