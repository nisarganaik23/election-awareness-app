import React from "react";
import "./Candidates.css"; // Ensure you create this file for styling

const candidates = [
  {
    name: "Rahul Sharma",
    age: 45,
    party: "People's Party",
    logo: "/images/logo1.jpg",
    photo: "/images/pl1.jpg",
    manifesto: "Better infrastructure and education for all.",
    location: "New Delhi",
  },
  {
    name: "Priya Verma",
    age: 39,
    party: "Democratic Front",
    logo: "/images/logo3.jpg",
    photo: "/images/pl2.jpg",
    manifesto: "Healthcare and employment opportunities.",
    location: "Mumbai",
  },
  {
    name: "Amit Patel",
    age: 50,
    party: "National Union",
    logo: "/images/logo2.jpg",
    photo: "/images/pl3.jpg",
    manifesto: "Strengthening the economy and job creation.",
    location: "Bangalore",
  },
];

const Candidates = () => {
  return (
    <div className="candidates-container">
      <h2>Meet the Candidates</h2>
      <div className="cards">
        {candidates.map((candidate, index) => (
          <div key={index} className="card">
            <img src={candidate.photo} alt={candidate.name} className="candidate-photo" />
            <div className="card-content">
              <h3>{candidate.name}</h3>
              <p><strong>Age:</strong> {candidate.age}</p>
              <p><strong>Party:</strong> {candidate.party}</p>
              <img src={candidate.logo} alt={candidate.party} className="party-logo" />
              <p><strong>Location:</strong> {candidate.location}</p>
              <p><strong>Manifesto:</strong> {candidate.manifesto}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Candidates;
