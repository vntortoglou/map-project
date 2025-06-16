import React from "react";
import { useNavigate } from "react-router-dom";

export default function InstructionsDisplay() {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate("/"); // Πλοήγηση στην αρχική διαδρομή για "κλείσιμο"
  };

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">How to Use</h3>
        <button
          onClick={handleClose}
          className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
          aria-label="Close Instructions"
        >
          &times;
        </button>
      </div>
      <ol className="list-decimal list-inside text-sm space-y-1 mt-2">
        <li>
          Enter a city name in the search bar and press Enter or click the
          search icon.
        </li>
        <li>The map will navigate to the city, and a marker will appear.</li>
        <li>
          Click on menu items like "City Details" or "Weather" to display
          relevant information in this panel.
        </li>
      </ol>
    </div>
  );
}