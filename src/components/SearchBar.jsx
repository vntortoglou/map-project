import { useState } from "react";

export default function SearchBar({ handleSearch }) {
  const [cityName, setCityName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(cityName);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h3>SearchBar</h3>
        <input 
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}
