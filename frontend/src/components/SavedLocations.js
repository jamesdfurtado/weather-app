import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SavedLocations = ({ username, savedLocationsChanged, onSearch }) => {
  const [savedLocations, setSavedLocations] = useState([]);

  // Fetch saved locations whenever the username or savedLocationsChanged prop changes
  useEffect(() => {
    if (username !== 'Guest') {
      axios.get(`http://localhost:8080/api/locations/user/${username}`)
        .then(response => {
          setSavedLocations(response.data);  // Set retrieved locations in state
        })
        .catch(error => {
          console.error('Error fetching saved locations:', error);
        });
    }
  }, [username, savedLocationsChanged]); // Re-fetch when savedLocationsChanged changes

  // Handle deleting a location
  const handleDeleteLocation = (locationName) => {
    axios.delete('http://localhost:8080/api/locations/delete', {
      data: { username: username, location: locationName }
    })
      .then(() => {
        setSavedLocations(savedLocations.filter(location => location.location !== locationName)); // Remove deleted location from state
      })
      .catch(error => {
        console.error('Error deleting location:', error);
      });
  };

  return (
    <div>
      {savedLocations.length > 0 ? (
        <div className="saved-locations-tabs">
          {savedLocations.map((location) => (
            <div key={location.id} className="saved-location">
              <span onClick={() => onSearch(location.location)}>{location.location}</span> {/* Trigger search on click */}
              <button onClick={() => handleDeleteLocation(location.location)}>X</button>
            </div>
          ))}
        </div>
      ) : (
        <p>No saved locations.</p>
      )}
    </div>
  );
};

export default SavedLocations;
