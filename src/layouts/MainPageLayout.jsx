import React from "react";
import ControlPanel from "../components/ControlPanel";
import MapDisplay from "../components/MapDisplay";

export default function MainPageLayout({
  currentCityData,
  handleSearch,
  mapCenter,
  markerPosition,
  popupInfo,
}) {
  return (
    <div className="flex flex-col md:flex-row h-screen">
      <ControlPanel
        currentCityData={currentCityData}
        handleSearch={handleSearch}
      />
      <div className="flex-1 h-full min-w-0 relative">
        {" "}
        <MapDisplay
          mapCenter={mapCenter}
          markerPosition={markerPosition}
          popupInfo={popupInfo}
        />
      </div>
    </div>
  );
}
