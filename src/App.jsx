import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import SideBar from "./components/SideBar";
import axios from "axios";

function App() {
  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

  const [mapCenter, setMapCenter] = useState(null);
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

  async function handleSearch(cityName) {
    const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
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
      setMapCenter([lat, lon]);

      return setPosition([lat, lon]);
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
        <SideBar handleSearch={handleSearch}></SideBar>
        <div style={{ height: "100vh" }}>
          {position && (
            <MapContainer
              center={position}
              zoom={13}
              style={{ height: "100%", width: "100%" }}
            >
<TileLayer
url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  attribution='&copy; <a href="https://carto.com/">CartoDB</a> contributors'
/>



              <MapUpdater position={position} />
            </MapContainer>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
