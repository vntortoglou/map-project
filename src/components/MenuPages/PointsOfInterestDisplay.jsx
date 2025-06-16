import React from "react";
import { useOutletContext, useNavigate } from "react-router-dom";

export default function PointsOfInterestDisplay() {
  const { cityData } = useOutletContext();
  const navigate = useNavigate();

  const handleClose = () => {
    navigate("/"); // Πλοήγηση στην αρχική διαδρομή για "κλείσιμο"
  };

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">Points of Interest</h3>
        <button
          onClick={handleClose}
          className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
          aria-label="Close points of interest panel"
        >
          &times;
        </button>
      </div>
      <p className="text-sm mt-2">
        Points of interest for {cityData?.name || "the selected city"} will be
        shown here.
      </p>
      {cityData && (
        <p className="text-xs text-gray-500 mt-1">
          (This would require integration with a POI API like Foursquare, Google
          Places, or GeoNames POI search)
        </p>
      )}
    </div>
  );
}
