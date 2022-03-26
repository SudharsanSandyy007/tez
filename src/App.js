import "./styles/App.css";
import Feed from "./components/Feed";
import Login from "./components/Login";
import NavBar from "./components/NavBar";
import { useStateValue } from "./StateProvider";
import { Routes, Route } from "react-router-dom";
import PostProperty from "./components/PostProperty";
import Home from "./components/Home";
import Chat from "./components/Chat";
import ChatSideBar from "./components/ChatSideBar";
import ChatBox from "./components/ChatBox";
import Paymentreq from "./components/Paymentreq";
import TrackReq from "./components/TrackReq";
import YourBookings from "./components/YourBookings";
import YourProperties from "./components/YourProperties";
import Wallet from "./components/Wallet";
import Filter from "./components/Filter";
function App() {
  const [{ user }] = useStateValue();
  return (
    <div className="app">
      {user ? (
        <>
          <NavBar />
          <Routes>
            <Route
              path="/"
              element={
                <div className="app__cover">
                  <div className="app__body">
                    <Home />
                  </div>
                </div>
              }
            />
            <Route
              path="/rentahouse"
              element={
                <div className="app__cover rntaprop ">
                  <div className="app__body rntapropCont">
                    <Feed />
                    <Filter />
                  </div>
                </div>
              }
            />

            <Route path="/postaproperty" element={<PostProperty />} />

            <Route path="/chat/:roomId" element={<Chat />} />
            <Route
              path="/chatbox/:roomId"
              element={
                <div className="chatroom">
                  <ChatSideBar />
                  <ChatBox />
                </div>
              }
            />
            <Route path="/paymentreq" element={<Paymentreq />} />
            <Route path="/trackreq" element={<TrackReq />} />
            <Route path="/yourbookings" element={<YourBookings />} />
            <Route path="/yourproperties" element={<YourProperties />} />
            <Route path="/wallet" element={<Wallet />} />
          </Routes>
        </>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
