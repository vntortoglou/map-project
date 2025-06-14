import { useState } from "react";

export default function SearchBar({ handleSearch }) {
  const [cityName, setCityName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cityName.trim() === "") {
      handleSearch(cityName); // Default city if input is empty
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label className="text-2xl font-bold mb-2">Search City</label>
        <div className="border-1 rounded p-2 mb-4">
          <input 
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
            className="w-80%"
            placeholder="Enter city name"
          />
          <button type="submit" aria-label="Search" className="pr-2">🔍</button>
        </div>
      </form>
    </div>
  );
}
