// src/components/CalendarPage.js
import React from "react";
import "../../App.css";
import Placeholder1 from "../Placeholders/image.png";

const CalendarPage = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className="CalendarPage">
        <h1>The Calendar view will be displayed here</h1>
        <img src={Placeholder1} alt="Calendar Placeholder View" />
      </div>
    </div>
  );
};

export default CalendarPage;
