import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import SideBar from "./components/SideBar";
import axios from "axios";
import "./App.css"; // Assuming you have some styles in App.css

function App() {
  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

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
        console.warn(`Geolocation ERROR(${err.code}): ${err.message}`);
        setPosition([40.6401, 22.9444]); // Thessaloniki coordinates
      },
      options
    );
  }, []);

  async function handleSearch(cityName) {
    const limit = 1;
    const url = `https://api.openweathermap.org/geo/1.0/direct`;

    try {
      const response = await axios.get(url, {
        params: {
          q: cityName,
          limit,
          appid: apiKey,
        },
      });

      const data = response.data;
      console.log(data);

      if (data.length === 0) throw new Error("City not found");

      const { lat, lon } = data[0];
      setPosition([lat, lon]);
    } catch (err) {
      console.error("Geocoding error:", err.message);
      return null;
    }
  }

  function MapUpdater({ position }) {
    const map = useMap();

    useEffect(() => {
      if (position) {
        map.flyTo(position, 13);
      }
    }, [position, map]);

    return null;
  }

  return (
    <>
    <div className="flex h-screen">
      {/* Left Column: Sidebar */}
      <div className="w-1/4 p-4 bg-gray-100 shadow-md overflow-y-auto">
        <SideBar handleSearch={handleSearch} />
      </div>
      {/* Right Column: Map */}
      <div className="w-3/4 h-full">
        {position ? (
          <MapContainer
            center={position}
            zoom={13}
            style={{ height: "100%", width: "100%" }} // Map fills this container
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <MapUpdater position={position} />
          </MapContainer>
        ) : (
          // Optional: Display a loading message or placeholder if position is not yet available
          <div className="flex items-center justify-center h-full text-gray-500">
            <p>Initializing map and location...</p>
          </div>
        )}
      </div>
    </div>
    </>
  );
}

export default App;