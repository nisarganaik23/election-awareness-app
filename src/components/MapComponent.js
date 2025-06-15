import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const MapComponent = ({ locations }) => {
  const mapContainerStyle = {
    width: '100%', // Use full width
    height: '500px', // Adjust height if needed
  };
  

  const defaultCenter = { lat: 12.9716, lng: 77.5946 }; // Default to Bangalore

  return (
    <LoadScript googleMapsApiKey="AIzaSyBNy86RIim3mNvKnU9Dh86LeVh7uASIQR4">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={locations.length > 0 ? locations[0] : defaultCenter}
        zoom={12}
      >
        {/* ✅ Show markers for each location */}
        {locations.map((location, index) => (
          <Marker key={index} position={location} />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
