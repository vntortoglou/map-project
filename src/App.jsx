import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import SideBar from "./components/SideBar";

function App() {

  // Code to get default Position with Geolocation
  const [position, setPosition] = useState(null);

  useEffect(() => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setPosition([latitude, longitude]);
      },
      (err) => {
        console.warn(`ERROR(${err.code}): ${err.message}`);
        setPosition([40.6401, 22.9444]);
      },
      options
    );
  }, []);

  return (
    <>
       <div className="flex h-screen">
    <SideBar></SideBar>
    <div style={{ height: "100vh"}}>
      {position && (
        <MapContainer
          center={position}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://carto.com/">CartoDB</a>'
          />
        </MapContainer>
      )}
    </div>
    </div>
    </>
  );
}

export default App;
