import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../App.css";
import CalendarPage from "./CalendarPage";
import { Link } from "react-router-dom";
import ProjectLogo from "../Placeholders/ProjectLogo.png";
export default function Home() {
  const [loggedInUser, setLoggedInUser] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser"));
  }, []);

  const handleLogout = (e) => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    alert("User Loggedout");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  // const fetchCalender = async () => {
  //   try {
  //     const url = "http://localhost:8080/calender";
  //     const headers = {
  //       headers: {
  //         Authorization: localStorage.getItem("token"),
  //       },
  //     };
  //     const response = await fetch(url, headers);
  //     const result = await response.json();
  //     console.log(result);
  //   } catch (err) {
  //     alert(err);
  //   }
  // };
  // useEffect(() => {
  //   fetchCalender();
  // }, []);

  return (
    <div>
      {/* Title Bar */}
      <div className="title-bar">
        <img src={ProjectLogo} alt="Logo" className="logo" />{" "}
        {/* Add your logo file in `public` folder */}
        <h1 className="app-title">Calendar</h1>
        <button className="sign-in-button" onClick={handleLogout}>
          Log out
        </button>
      </div>

      {/* Navbar */}
      <nav className="navbar">
        <ul className="nav-links">
          <li className="nav-item">
            <Link to="/home">Calendar</Link>
          </li>
          <li className="nav-item">
            <Link to="/schedule">Schedule</Link>
          </li>
        </ul>
      </nav>
      <div className="landing-page">
        <h1>Welcome {loggedInUser} !</h1>
      </div>
      <CalendarPage />
    </div>
  );
}
