import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./ElectionCalendar.css";

const electionDays = {
  "2025-03-10": "UP Election",
  "2025-04-15": "Delhi Election",
  "2025-05-20": "Karnataka Election",
  "2025-06-05": "Maharashtra Election",
  "2025-07-25": "West Bengal Election",
  "2025-08-18": "Tamil Nadu Election",
  "2025-09-30": "Kerala Election",
  "2025-10-12": "Rajasthan Election",
  "2025-11-05": "Punjab Election",
  "2025-12-22": "Gujarat Election",
};

const ElectionCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [electionInfo, setElectionInfo] = useState("");

  const handleDateClick = (date) => {
    const formattedDate = date.toISOString().split("T")[0];
    setSelectedDate(formattedDate);
    setElectionInfo(electionDays[formattedDate] || "No elections on this day.");
  };

  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      const formattedDate = date.toISOString().split("T")[0];
      return electionDays[formattedDate] ? "election-day" : null;
    }
    return null;
  };

  return (
    <div className="election-calendar-container">
      <div className="election-calendar">
        <h2>🗳 Election Calendar</h2>
        <Calendar onClickDay={handleDateClick} tileClassName={tileClassName} />
        {selectedDate && (
          <div className="election-info">
            <h3>📅 {selectedDate}</h3>
            <p>{electionInfo}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ElectionCalendar;
