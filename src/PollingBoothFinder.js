import React, { useState } from 'react';
import MapComponent from "./components/MapComponent";

function PollingBoothFinder() {
  const [location, setLocation] = useState('');
  const [booth, setBooth] = useState('');
  const [locations, setLocations] = useState([]); // Store coordinates for the map

  const pollingBooths = {
    Mumbai: {
      "Colaba": [
        { name: 'Booth1', address: 'Colaba, Mumbai, Maharashtra - Booth 1', lat: 18.9067, lng: 72.8147 },
      ],
      "Andheri": [
        { name: 'Booth2', address: 'Andheri, Mumbai, Maharashtra - Booth 2', lat: 19.1197, lng: 72.8466 },
      ]
    },
    Delhi: {
      "Connaught Place": [
        { name: 'Booth1', address: 'Connaught Place, Delhi, India - Booth 1', lat: 28.6315, lng: 77.2167 },
      ],
      "Karol Bagh": [
        { name: 'Booth2', address: 'Karol Bagh, Delhi, India - Booth 2', lat: 28.6513, lng: 77.1909 },
      ]
    },
    Bangalore: {
      "Malleshwaram": [
        { name: 'Booth1', address: 'Malleshwaram, Bangalore, Karnataka - Booth 1', lat: 13.0033, lng: 77.5681 },
      ],
      "Indiranagar": [
        { name: 'Booth2', address: 'Indiranagar, Bangalore, Karnataka - Booth 2', lat: 12.9719, lng: 77.6412 },
      ]
    },
  };

  const handleSearch = () => {
    const locationLowerCase = location.toLowerCase();
    const [city, area] = locationLowerCase.split(',').map(str => str.trim());

    const cityFound = Object.keys(pollingBooths).find(
      (key) => key.toLowerCase() === city
    );

    if (cityFound) {
      const booths = pollingBooths[cityFound];

      if (area) {
        const boothsFound = booths[area] || [];
        setBooth(
          boothsFound.length
            ? boothsFound.map((booth, index) => (
                <div key={index}>
                  <h3>{booth.name}</h3>
                  <p>{booth.address}</p>
                </div>
              ))
            : 'No booths found for this area.'
        );
        setLocations(boothsFound.map((booth) => ({ lat: booth.lat, lng: booth.lng }))); // Set marker locations
      } else {
        const allBooths = Object.values(booths).flat();
        setBooth(
          allBooths.length
            ? allBooths.map((booth, index) => (
                <div key={index}>
                  <h3>{booth.name}</h3>
                  <p>{booth.address}</p>
                </div>
              ))
            : 'No booths found for this city.'
        );
        setLocations(allBooths.map((booth) => ({ lat: booth.lat, lng: booth.lng }))); // Set marker locations
      }
    } else {
      setBooth('City not found!');
      setLocations([]); // Reset locations if city is not found
    }
  };

  return (
    <div>
      <h2>Find Your Nearest Polling Booth</h2>
      <input
        type="text"
        placeholder="Enter city and area (e.g., Bangalore, Malleshwaram)"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <div>
        {booth && (
          <div>
            {typeof booth === 'string' ? booth : <div>{booth}</div>}
          </div>
        )}
      </div>
      
      {/* ✅ Pass locations to the MapComponent */}
      <MapComponent locations={locations} />
    </div>
  );
}

export default PollingBoothFinder;
