import React from "react";
import { useNavigate } from "react-router-dom";
import Placeholder2 from "../Placeholders/image2.png";
import { Link } from "react-router-dom";
import ProjectLogo from "../Placeholders/ProjectLogo.png";
export default function Schedule() {
  const navigate = useNavigate();
  const handleLogout = (e) => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    alert("User Loggedout");
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };
  return (
    <div>
      {/* Title Bar */}
      <div className="title-bar">
        <img src={ProjectLogo} alt="Logo" className="logo" />{" "}
        {/* Add your logo file in `public` folder */}
        <h1 className="app-title" onClick={handleLogout}>
          Calendar
        </h1>
        <button className="sign-in-button">Log out</button>
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

      {/* Hero Section */}
      <div className="SchedulePage">
        <h1>The Schedule/Agenda view will be displayed here</h1>
        <img src={Placeholder2} alt="Schedule/Agenda Placeholder View" />
      </div>
    </div>
  );
}
