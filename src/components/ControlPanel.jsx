import React from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import SideBar from "./SideBar";

const menuButtonClass =
  "w-full text-left p-2.5 mb-2 rounded-md transition-colors duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400";
const activeMenuButtonClass = "bg-blue-500 text-white hover:bg-blue-600";
const inactiveMenuButtonClass = "bg-gray-200 hover:bg-gray-300 text-gray-700";

export default function ControlPanel({ currentCityData, handleSearch }) {
  const location = useLocation();

  // Καθορίζουμε αν ένα info panel είναι "ανοιχτό" με βάση το URL path
  const isInfoPanelOpen = location.pathname !== "/";

  return (
    <div
      className={`${
        isInfoPanelOpen ? "w-[32rem]" : "w-60"
      } flex-shrink-0 bg-white shadow-xl flex overflow-hidden transition-all duration-300 ease-in-out`}
    >
      {/* Υπο-στήλη 1: Περιοχή Μενού */}
      <div className="p-4 flex flex-col space-y-4 flex-shrink-0 w-60">
        <h1 className="text-2xl sm:text-3xl font-bold text-blue-600">
          Map Explorer
        </h1>
        <SideBar handleSearch={handleSearch} />
        <nav className="flex-grow flex flex-col space-y-1">
          <h2 className="text-xs uppercase text-gray-500 font-semibold my-2 tracking-wider">
            Menu
          </h2>
          <NavLink
            to="/details"
            className={({ isActive }) =>
              `${menuButtonClass} ${
                isActive ? activeMenuButtonClass : inactiveMenuButtonClass
              }`
            }
          >
            City Details
          </NavLink>
          <NavLink
            to="/weather"
            className={({ isActive }) =>
              `${menuButtonClass} ${
                isActive ? activeMenuButtonClass : inactiveMenuButtonClass
              }`
            }
          >
            Weather
          </NavLink>
          <NavLink
            to="/poi"
            className={({ isActive }) =>
              `${menuButtonClass} ${
                isActive ? activeMenuButtonClass : inactiveMenuButtonClass
              }`
            }
          >
            Points of Interest
          </NavLink>
          <NavLink
            to="/instructions"
            className={({ isActive }) =>
              `${menuButtonClass} ${
                isActive ? activeMenuButtonClass : inactiveMenuButtonClass
              }`
            }
          >
            How to Use
          </NavLink>
        </nav>

        {!isInfoPanelOpen && ( // Εμφάνισε αυτό μόνο αν κανένα info panel δεν είναι ανοιχτό (δηλ. είμαστε στο '/')
          <div className="mt-auto pt-4 text-sm text-gray-500">
            {currentCityData ? (
              <p>
                Select an option from the menu to learn more about{" "}
                {currentCityData.name}.
              </p>
            ) : (
              <p>Search for a city or click "How to Use" from the menu.</p>
            )}
          </div>
        )}
      </div>

      {/* Υπο-στήλη 2: Πλαίσιο Πληροφοριών - Τώρα είναι ένα Outlet */}
      {isInfoPanelOpen && (
        <div className="flex-1 p-4 border-l border-gray-200 bg-gray-50 overflow-y-auto min-w-0">
          <Outlet context={{ cityData: currentCityData }} />
        </div>
      )}
    </div>
  );
}
