import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';

// Βοηθητικό component για την ομαλή μετάβαση του χάρτη
function MapFlyToCenter({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, 13);
    }
  }, [center, map]);
  return null;
}

// Βοηθητικό component για την εμφάνιση του marker της αναζητούμενης τοποθεσίας
function SearchedLocationMarker({ position, popupInfo }) {
  if (!position) return null;
  return (
    <Marker position={position}>
      <Popup>
        {popupInfo ||
          `Location: ${position[0].toFixed(4)}, ${position[1].toFixed(4)}`}
      </Popup>
    </Marker>
  );
}

export default function MapDisplay({ mapCenter, markerPosition, popupInfo }) {
  if (!mapCenter) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        <p>Initializing map and location...</p>
      </div>
    );
  }

  return (
    <MapContainer center={mapCenter} zoom={6} style={{ height: '100%', width: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' />
      <MapFlyToCenter center={mapCenter} />
      <SearchedLocationMarker position={markerPosition} popupInfo={popupInfo} />
    </MapContainer>
  );
}

