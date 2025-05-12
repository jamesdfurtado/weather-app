import React, { useEffect, useState } from 'react';
import { getSavedLocations, deleteLocation } from '../api/weather';

function SavedLocations({ username, onSearch, refreshTrigger }) {
  const [locations, setLocations] = useState([]);

  // re-fetch saved locations when username or trigger changes
  useEffect(() => {
    if (!username) return;

    getSavedLocations(username)
      .then((res) => setLocations(res.data))
      .catch(() => {}); // silent fail for now
  }, [username, refreshTrigger]);

  // handle delete button press
  const handleDelete = async (locationName) => {
    try {
      await deleteLocation(username, locationName);
      setLocations((prev) => prev.filter((loc) => loc.location !== locationName));
    } catch {}
  };

  return (
    <div className="saved-locations">
      <h3>Saved Locations</h3>
      {locations.length === 0 ? (
        <p>No saved locations.</p>
      ) : (
        <ul>
          {locations.map((loc) => (
            <li key={loc.id}>
              {/* clicking the location re-triggers a search */}
              <span onClick={() => onSearch(loc.location)}>{loc.location}</span>
              <button onClick={() => handleDelete(loc.location)}>X</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SavedLocations;
