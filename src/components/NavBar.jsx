import {
  AccountBalance,
  AccountBalanceRounded,
  AccountBalanceWallet,
  AccountTree,
  AddBusiness,
  Apartment,
  BookRounded,
  FavoriteBorder,
  Home,
  HomeRounded,
  InsertChart,
  Signpost,
} from "@mui/icons-material";
import HomeIcon from "@mui/icons-material/Home";
import { Avatar } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import "../styles/NavBar.css";
import { useStateValue } from "../StateProvider";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { actionTypes } from "../reducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWallet } from "@fortawesome/free-solid-svg-icons";
function NavBar() {
  const [{ user }, dispatch] = useStateValue();

  const logout = () => {
    signOut(auth)
      .then(() =>
        dispatch({
          user: null,
          type: actionTypes.SET_USER,
        })
      )
      .catch((e) => console.log(e));
  };

  const showLogout = (e) => {
    document.querySelector(".navbar__rightOption__dispName").innerHTML =
      "LOGOUT";
  };

  const showUserEmail = (e) => {
    document.querySelector(".navbar__rightOption__dispName").innerHTML =
      user.displayName;
  };

  return (
    <div className="navbar">
      <div className="navbar__left">
        <Link to="/" style={{ textDecoration: "none", color: "black" }}>
          <h4 className="rahLogo">
            RENT&nbsp;A&nbsp; <HomeIcon />
            OUSE
          </h4>
        </Link>
      </div>

      <div className="navbar__middle">
        <div className="navbar__middleOption"></div>

        <div className="navbar__middleOption">
          <Link className="navbar__Proplink l1" to="/rentahouse">
            <Signpost />
            Rent a property
          </Link>
        </div>
        <div className="navbar__middleOption">
          <Link className="navbar__Proplink l2" to="/postaproperty">
            <AddBusiness />
            Post a property
          </Link>
        </div>
        <div className="navbar__middleOption">
          <Link className="navbar__Proplink l2" to="/paymentreq">
            <AccountTree />
            Rent proposals
          </Link>
        </div>
        <div className="navbar__middleOption">
          <Link className="navbar__Proplink l2" to="/trackreq">
            <InsertChart />
            Track requests
          </Link>
        </div>
        <div className="navbar__middleOption">
          <Link className="navbar__Proplink l2" to="/yourbookings">
            <BookRounded />
            Your bookings
          </Link>
        </div>
        <div className="navbar__middleOption">
          <Link className="navbar__Proplink l2" to="/yourproperties">
            <Apartment />
            Your properties
          </Link>
        </div>
        <div className="navbar__middleOption">
          <Link className="navbar__Proplink l2" to="/wallet">
            <AccountBalanceWallet />
            Wallet
          </Link>
        </div>
      </div>

      <div className="navbar__right">
        <div
          className="navbar__right__option"
          onMouseOver={showLogout}
          onMouseOut={showUserEmail}
          onClick={logout}
        >
          <span title="Logout">
            <Avatar src={user.photoURL} />
          </span>
          <h4 className="navbar__rightOption__dispName">{user.displayName}</h4>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
