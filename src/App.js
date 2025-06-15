import React, { useState, useEffect } from "react";
import "./App.css";
import VoterRegistration from "./VoterRegistration";
import ElectionCalendar from "./ElectionCalendar";
import PollingBoothFinder from "./PollingBoothFinder";
import Candidates from "./Candidates";
import FAQ from "./FAQ";

function App() {
  const [showSection, setShowSection] = useState("home");

  // Image carousel state
  const images = ["/images/image1.jpg", "/images/image3.png"];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Auto-slide images every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      {/* Navbar */}
      <nav className="navbar">
        <h1>Election Awareness App</h1>
        <div className="nav-buttons">
          <button onClick={() => setShowSection("home")}>Home</button>
          <button onClick={() => setShowSection("register")}>Voter Registration</button>
          <button onClick={() => setShowSection("calendar")}>Election Calendar</button>
          <button onClick={() => setShowSection("polling")}>Polling Booth Finder</button>
          <button onClick={() => setShowSection("candidates")}>Candidates</button>
          <button onClick={() => setShowSection("faq")}>FAQ</button>
        </div>
      </nav>

      {/* Home Page Content */}
      {showSection === "home" && (
        <div className="home">
          {/* Hero Section */}
          <div className="hero">
            <h2>Your Vote, Your Voice!</h2>
            <p>Empowering citizens with knowledge about elections and voting rights.</p>
            <button onClick={() => setShowSection("register")}>Register Now</button>
          </div>

          {/* Image Carousel */}
          <div className="carousel">
            <img src={images[currentImageIndex]} alt="Election Awareness" />
          </div>

          {/* Animated Statistics Section */}
          <div className="stats">
            <h3>Election Insights</h3>
            <div className="stats-container">
              <div className="stat-item">
                <h4>Registered Voters</h4>
                <p>1,250,000+</p>
              </div>
              <div className="stat-item">
                <h4>Upcoming Elections</h4>
                <p>5</p>
              </div>
              <div className="stat-item">
                <h4>Voter Turnout (Last Election)</h4>
                <p>67.3%</p>
              </div>
            </div>
          </div>

          {/* Testimonial/Quote Section */}
          <div className="quote">
            <h3>"The ballot is stronger than the bullet." - Abraham Lincoln</h3>
          </div>
        </div>
      )}

      {/* Page Content */}
      <div className="content">
        {showSection === "register" && <VoterRegistration />}
        {showSection === "calendar" && <ElectionCalendar />}
        {showSection === "polling" && <PollingBoothFinder />}
        {showSection === "candidates" && <Candidates />}
        {showSection === "faq" && <FAQ />}
      </div>
    </div>
  );
}

export default App;
