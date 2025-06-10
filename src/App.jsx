import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect } from 'react';
import 'leaflet/dist/leaflet.css';





function App() {
  return (
    <div style={{ height: '100vh' }}>
      <MapContainer
        center={[51.505, -0.09]}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
      >
<TileLayer
  url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
  attribution='&copy; <a href="https://carto.com/">CartoDB</a>'
/>










      </MapContainer>
    </div>
  );
}


export default App;
