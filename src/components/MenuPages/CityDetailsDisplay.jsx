import React, { useState, useEffect } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function CityDetailsDisplay() {
  const { cityData } = useOutletContext();
  const navigate = useNavigate();

  const [wikipediaExtract, setWikipediaExtract] = useState('');
  const [isLoadingWikipedia, setIsLoadingWikipedia] = useState(false);
  const [wikipediaError, setWikipediaError] = useState(null);

  useEffect(() => {
    if (cityData && cityData.name) {
      const fetchWikipediaLink = async () => {
        setIsLoadingWikipedia(true);
        setWikipediaError(null);
        setWikipediaExtract('');

        try {
          const response = await axios.get('https://el.wikipedia.org/w/api.php', {
            params: {
              action: 'query',
              format: 'json',
              prop: 'extracts',
              exintro: true,
              explaintext: true,
              redirects: 1,
              origin: '*',
              titles: cityData.name,
            },
          });

          const pages = response.data.query.pages;
          const page = Object.values(pages)[0];
          setWikipediaExtract(page.extract || 'Information not found at Wikipedia.');
        }
        catch (error) {
          setWikipediaError(`Error fetching Wikipedia data: ${error.message}`);
        }
        finally {
          setIsLoadingWikipedia(false);
        }
      };
      fetchWikipediaLink();
    }
  }, [cityData]);

  const handleClose = () => {
    navigate('/'); // Πλοήγηση στην αρχική διαδρομή για "κλείσιμο"
  };

  const wikipediaUrl = cityData ? `https://wikipedia.org/wiki/${encodeURIComponent(cityData.name)}` : null;

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
        <>
          <ul className="text-sm space-y-1 mt-2">
            <li><strong>Name:</strong> {cityData.name}</li>
            <li><strong>Country:</strong> {cityData.country}</li>
            {cityData.state && <li><strong>State:</strong> {cityData.state}</li>}
            <li><strong>Latitude:</strong> {cityData.lat.toFixed(4)}</li>
            <li><strong>Longitude:</strong> {cityData.lon.toFixed(4)}</li>
          </ul>

          {isLoadingWikipedia && (
            <p className="text-sm text-gray-400 mt-4">Loading information from Wikipedia...</p>
          )}

          {wikipediaError && (
            <p className="text-sm text-red-500 mt-4">{wikipediaError}</p>
          )}

          {wikipediaExtract && !isLoadingWikipedia && (
            <div className="mt-4">
              <h4 className="font-semibold">Wikipedia:</h4>
              <p className="text-sm">{wikipediaExtract}</p>
              {wikipediaUrl && (
                <a
                  href={wikipediaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline mt-2 block"
                >
                  more about Wikipedia
                </a>
              )}
            </div>
          )}
        </>
      ) : (
        <p className="mt-2">Search a city for more information.</p>
      )}
    </div>
  );
}
