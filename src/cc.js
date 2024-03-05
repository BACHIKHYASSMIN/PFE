// CartePage.js
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

function CartePage() {
  return (
    <div style={{ width: '100%', height: '400px' }}>
      <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false} style={{zIndex:'100', width: '50%', height: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[51.505, -0.09]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default CartePage;
