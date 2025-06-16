import React from "react";
import { useNavigate } from "react-router-dom";

export default function DefaultInfoMessage() {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate("/"); // Πλοήγηση στην αρχική διαδρομή για "κλείσιμο"
  };

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">Information</h3>
        <button
          onClick={handleClose}
          className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
          aria-label="Close panel"
        >
          &times;
        </button>
      </div>
      <p className="text-sm text-gray-500">Select an option from the menu.</p>
    </div>
  );
}
