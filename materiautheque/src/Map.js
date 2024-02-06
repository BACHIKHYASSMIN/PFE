// Map.js
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Map = ({ monuments }) => {
  const center = [40.7128, -74.0060]; // Set your initial map center coordinates

  return (
        <MapContainer center={center} zoom={13} style={{ height: '400px', width: '100%' }}>
      {/* Use an online tile layer from OpenStreetMap */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {monuments.map((monument, index) => (
        <Marker key={index} position={[monument.lat, monument.lng]}>
          <Popup>{monument.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
