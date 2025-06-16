import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from 'react-router-dom';
import "leaflet/dist/leaflet.css";
import axios from "axios";
import "./App.css"; // Assuming you have some styles in App.css
import MainPageLayout from "./layouts/MainPageLayout"; // Νέο Layout

// Εισαγωγή των νέων panel components
import CityDetailsDisplay from "./components/MenuPages/CityDetailsDisplay";
import WeatherDisplay from "./components/MenuPages/WeatherDisplay";
import PointsOfInterestDisplay from "./components/MenuPages/PointsOfInterestDisplay";
import InstructionsDisplay from "./components/MenuPages/InstructionsDisplay";
import DefaultInfoMessage from "./components/MenuPages/DefaultInfoMessage";

// Fix Leaflet marker icons
import L from "leaflet";
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

function App() {
  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

  const [mapCenter, setMapCenter] = useState([40.6401, 22.9444]); // Default to Thessaloniki
  const [markerPosition, setMarkerPosition] = useState(null);
  const [currentCityData, setCurrentCityData] = useState(null);
  const [popupInfo, setPopupInfo] = useState("");

  const navigate = useNavigate(); // Hook για πλοήγηση

  useEffect(() => {
    // Get user's current location
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setMapCenter([latitude, longitude]);
      },
      (err) => {
        console.warn(`Geolocation ERROR(${err.code}): ${err.message}`);
        setMapCenter([40.6401, 22.9444]); // Thessaloniki coordinates as fallback
      },
      options
    );
  }, []); // Empty dependency array ensures this runs only once on mount
  
  async function handleSearch(cityName) {
    if (!apiKey) {
      console.error("OpenWeather API key is not set. Please check your .env file.");
      alert("API key is missing. Cannot perform search.");
      return;
    }

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
      if (data.length === 0) {
        alert("City not found. Please try another name.");
        setCurrentCityData(null); // Clear previous city data if any
        setMarkerPosition(null);
        setPopupInfo("");
        return;
      }

      const city = data[0];
      const { lat, lon, name: foundCityName, country, state } = city;
      const locationName = `${foundCityName}${state ? `, ${state}` : ''}, ${country}`;

      setMapCenter([lat, lon]);
      setMarkerPosition([lat, lon]);
      setCurrentCityData(city);
      setPopupInfo(locationName);
      navigate('/details'); // Navigate to details page after successful search
    } catch (err) {
      console.error("Geocoding error:", err);
      alert("An error occurred while searching for the city. Please try again.");
      setCurrentCityData(null);
      setMarkerPosition(null);
      setPopupInfo("");
    }
  }
  
  return (
    <>
      {/* Το BrowserRouter είναι ήδη στο main.jsx */}
      <Routes>
        <Route 
          path="/" 
          element={
            <MainPageLayout 
              currentCityData={currentCityData}
              handleSearch={handleSearch}
              mapCenter={mapCenter}
              markerPosition={markerPosition}
              popupInfo={popupInfo}
            />
          }
        >
          <Route index element={<DefaultInfoMessage />} />
          <Route path="details" element={<CityDetailsDisplay />} />
          <Route path="weather" element={<WeatherDisplay />} />
          <Route path="poi" element={<PointsOfInterestDisplay />} />
          <Route path="instructions" element={<InstructionsDisplay />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;