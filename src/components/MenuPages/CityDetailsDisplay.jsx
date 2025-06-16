import React from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';

export default function CityDetailsDisplay() {
  const { cityData } = useOutletContext();
  const navigate = useNavigate();

  const handleClose = () => {
    navigate('/'); // Πλοήγηση στην αρχική διαδρομή για "κλείσιμο"
  };

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">City Details</h3>
        <button
          onClick={handleClose}
          className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
          aria-label="Close details"
        >
          &times;
        </button>
      </div>
      {cityData ? (
        <ul className="text-sm space-y-1 mt-2">
          <li><strong>Name:</strong> {cityData.name}</li>
          <li><strong>Country:</strong> {cityData.country}</li>
          {cityData.state && <li><strong>State:</strong> {cityData.state}</li>}
          <li><strong>Latitude:</strong> {cityData.lat.toFixed(4)}</li>
          <li><strong>Longitude:</strong> {cityData.lon.toFixed(4)}</li>
        </ul>
      ) : (
        <p className="mt-2">No city data available. Perform a search to see details.</p>
      )}
    </div>
  );
}
