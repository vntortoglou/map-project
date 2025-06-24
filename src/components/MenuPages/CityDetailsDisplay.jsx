import React, { useState, useEffect, useRef, useCallback } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import axios from "axios";

export default function CityDetailsDisplay() {
  const { cityData } = useOutletContext();
  const navigate = useNavigate();

  const [wikiInfo, setWikiInfo] = useState({
    loading: false,
    error: null,
    summary: "",
    imageUrl: "",
  });

  const fetchTimeoutRef = useRef(null);
  const handleClose = useCallback(() => {
    navigate("/"); // Πλοήγηση στην αρχική διαδρομή για "κλείσιμο"
  }, [navigate]);

  useEffect(() => {
    // Καθαρίζουμε τυχόν προηγούμενο timeout για να αποφύγουμε περιττές κλήσεις
    if (fetchTimeoutRef.current) {
      clearTimeout(fetchTimeoutRef.current);
    }

    // Αν δεν υπάρχει όνομα πόλης, επαναφέρουμε την κατάσταση και σταματάμε
    if (!cityData?.name) {
      setWikiInfo({ loading: false, error: null, summary: "", imageUrl: "" });
      return;
    }

    // Ορίζουμε την κατάσταση σε "loading" για να δώσουμε άμεση ανατροφοδότηση στον χρήστη
    setWikiInfo({ loading: true, error: null, summary: "", imageUrl: "" });

    // Εφαρμόζουμε debouncing για την κλήση στο API
    fetchTimeoutRef.current = setTimeout(async () => {
      const cityName = cityData.name;
      const endpoint = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
        cityName
      )}`;

      try {
        const response = await axios.get(endpoint, {
          headers: {
            "Api-User-Agent": "MapExplorer/1.0 (contact@example.com)",
          },
        });

        if (response.data.type === "disambiguation") {
          setWikiInfo({
            loading: false,
            error: null,
            summary:
              "<p>Multiple pages found for this city. Please specify further.</p>",
            imageUrl: "",
          });
        } else {
          setWikiInfo({
            loading: false,
            error: null,
            summary: response.data.extract_html,
            imageUrl: response.data.thumbnail?.source || "",
          });
        }
      } catch (error) {
        console.error("Error fetching Wikipedia data:", error);
        setWikiInfo({
          loading: false,
          error:
            "Failed to fetch Wikipedia information. Please try again later.",
          summary: "",
          imageUrl: "",
        });
      }
    }, 100); // Περιμένουμε 100ms πριν κάνουμε την κλήση

    // Συνάρτηση καθαρισμού: ακυρώνει το timeout αν το component φύγει από την οθόνη
    return () => {
      if (fetchTimeoutRef.current) {
        clearTimeout(fetchTimeoutRef.current);
      }
    };
  }, [cityData?.name]); // Το effect εκτελείται μόνο όταν αλλάζει το όνομα της πόλης

  const wikipediaUrl = cityData?.name
    ? `https://en.wikipedia.org/wiki/${encodeURIComponent(cityData.name)}`
    : null;

  // Βοηθητική συνάρτηση για να κρατήσουμε το JSX καθαρό
  const renderWikiDetails = () => {
    if (wikiInfo.loading) {
      return (
        <p className="text-sm text-gray-500 mt-4">
          Loading Wikipedia information...
        </p>
      );
    }

    if (wikiInfo.error) {
      return (
        <p className="text-sm text-red-600 bg-red-100 p-3 rounded-md mt-4">
          {wikiInfo.error}
        </p>
      );
    }

    if (wikiInfo.summary) {
      return (
        <div className="space-y-3 mt-4">
          {wikiInfo.imageUrl && (
            <img
              src={wikiInfo.imageUrl}
              alt={`View of ${cityData.name}`}
              className="w-full h-40 object-cover rounded-lg shadow-md"
            />
          )}
          <div
            className="prose prose-sm max-w-none text-gray-700"
            dangerouslySetInnerHTML={{ __html: wikiInfo.summary }}
          />
          {wikipediaUrl && (
            <a
              href={wikipediaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline mt-2 block"
            >
              Read more on Wikipedia
            </a>
          )}
        </div>
      );
    }

    if (cityData?.name) {
      return (
        <p className="text-sm text-gray-500 mt-4">
          No Wikipedia information found for "{cityData.name}".
        </p>
      );
    }

    return null;
  };

  return (
    <div className="relative p-4">
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
        <>
          <ul className="text-sm space-y-1 mt-2 bg-gray-50 p-3 rounded-md">
            <li>
              <strong>Name:</strong> {cityData.name}
            </li>
            <li>
              <strong>Country:</strong> {cityData.country}
            </li>
            {cityData.state && (
              <li>
                <strong>State:</strong> {cityData.state}
              </li>
            )}
            <li>
              <strong>Latitude:</strong> {cityData.lat.toFixed(4)}
            </li>
            <li>
              <strong>Longitude:</strong> {cityData.lon.toFixed(4)}
            </li>
          </ul>
          {renderWikiDetails()}
        </>
      ) : (
        <p className="mt-2 text-gray-500">
          Search for a city to see more information.
        </p>
      )}
    </div>
  );
}
