import { useState } from "react";

export default function SearchBar({ handleSearch }) {
  const [cityName, setCityName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cityName.trim() !== "") {
      handleSearch(cityName); // Default city if input is empty
      setCityName(""); // Clear input after search
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="rounded p-2 mb-4">
          <button type="submit" aria-label="Search" className="pr-2">🔍</button>
          <input 
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
            className="w-4/5"
            placeholder="Search for a city"
          />
        </div>
      </form>
    </div>
  );
}
