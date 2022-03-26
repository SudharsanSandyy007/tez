import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import React from "react";
import db from "../firebase";
import "../styles/PostProperty.css";
import { useStateValue } from "../StateProvider";

function PostProperty() {
  const [{ user }] = useStateValue();

  const postProp = (e) => {
    e.preventDefault();
    const apartmentType = document.querySelector("#appartment_type").value;
    const city = document.querySelector("#city").value;
    const address = document.querySelector("#address").value;
    const parking = document.querySelector("#parking").value;
    const bedrooms = document.querySelector("#bedrooms").value;
    const sqrft = document.querySelector("#sqrft").value;
    const locality = document.querySelector("#locality").value;
    const rent = document.querySelector("#rent").value;
    const deposit = document.querySelector("#deposit").value;
    const kitchen = document.querySelector("#kitchen").value;
    const bathrooms = document.querySelector("#bathrooms").value;
    const postURL = document.querySelector("#postURL").value;
    const nearbyplaces = document.querySelector("#nearbyplaces").value;
    const ownerph = document.querySelector("#ownerph").value;
    alert(apartmentType);

    const collRef = collection(db, "posts");
    addDoc(collRef, {
      displayName: user.displayName,

      profilePic: user.photoURL,
      timestamp: serverTimestamp(),
      apartmentType: apartmentType,
      city: city,
      address: address,
      parking: parking,
      bedrooms: bedrooms,
      sqrft: sqrft,
      locality: locality,
      rent: rent,
      deposit: deposit,
      kitchen: kitchen,
      bathrooms: bathrooms,
      postURL: postURL,
      nearbyplaces: nearbyplaces,
      ownerph: ownerph,
      email: user.email,
      status: "TOLET",
    })
      .then((result) => {
        alert("passed");
      })
      .catch((err) => {
        alert("failled");
      });
  };
  return (
    <div className="postaproperty">
      <div className="postaproperty__cover">
        <div className="postaproperty__top">
          <center>
            <h1>Property Details</h1>
          </center>
        </div>

        <div className="postaproperty__middle">
          <form action="" onSubmit={postProp}>
            <div className="postaproperty__form__left">
              <div className="postapropertyFormLeft__option">
                <h4>Apartment Type*</h4>
                <select className="ipbox" name="" id="appartment_type">
                  <option value="Appartment">Appartment</option>
                  <option value="Independent House">Independent House</option>
                </select>
              </div>
              <div className="postapropertyFormLeft__option">
                <h4>City*</h4>
                <input
                  type="text"
                  id="city"
                  className="ipbox"
                  placeholder="Enter City"
                />
              </div>
              <div className="postapropertyFormLeft__option">
                <h4>Enter Detailed Address*</h4>
                <textarea name="" id="address" cols="30" rows="10"></textarea>
              </div>
              <div className="postapropertyFormLeft__option">
                <h4>Parking Available?*</h4>
                <select className="ipbox" name="" id="parking">
                  <option value="1">Yes</option>
                  <option value="0">No</option>
                </select>
              </div>
              <div className="postapropertyFormLeft__option">
                <h4>No.Of Bed Rooms?*</h4>
                <select className="ipbox" name="" id="bedrooms">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
              </div>
              <div className="postapropertyFormLeft__option">
                <h4>Image URL*</h4>
                <input
                  type="text"
                  id="postURL"
                  placeholder="Enter Image URL"
                  className="ipbox"
                />
              </div>
              <div className="postapropertyFormLeft__option">
                <button type="submit" className="postprop___subbtn">
                  Submit
                </button>
              </div>
            </div>
            <div className="postaproperty__form__right">
              <div className="postapropertyFormRight__option">
                <h4>Built Up Area (in Sq.ft)*</h4>
                <input className="ipbox" id="sqrft" type="text" />
              </div>

              <div className="postapropertyFormRight__option">
                <h4>Locality*</h4>
                <input
                  id="locality"
                  className="ipbox"
                  type="text"
                  placeholder="Enter locality"
                />
              </div>
              <div className="postapropertyFormRight__option">
                <h4>Expected Rent per Month*</h4>
                <input
                  id="rent"
                  className="ipbox"
                  type="text"
                  placeholder="Enter Amount"
                />
              </div>
              <div className="postapropertyFormRight__option">
                <h4>Expected Deposit*</h4>
                <input
                  className="ipbox"
                  id="deposit"
                  type="text"
                  placeholder="Enter Amount"
                />
              </div>

              <div className="postapropertyFormRight__option">
                <h4>No.Of Kitchen?*</h4>
                <select className="ipbox" name="" id="kitchen">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
              </div>
              <div className="postapropertyFormRight__option">
                <h4>No.Of Bathrooms Rooms?*</h4>
                <select className="ipbox" name="" id="bathrooms">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="2">3</option>
                </select>
              </div>
              <div className="postapropertyFormRight__option">
                <h4>Nearby Places*</h4>
                <input
                  type="text"
                  placeholder="Enter nearby places"
                  id="nearbyplaces"
                  className="ipbox"
                />
              </div>
              <div className="postapropertyFormRight__option">
                <h4>Owner ph.no:*</h4>
                <input
                  type="text"
                  id="ownerph"
                  placeholder="Enter owner's phone number"
                  className="ipbox"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PostProperty;
