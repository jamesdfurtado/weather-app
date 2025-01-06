package com.example.backend.service;

import com.example.backend.model.Location;
import com.example.backend.repository.LocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LocationService {

    private final LocationRepository locationRepository;

    @Autowired
    public LocationService(LocationRepository locationRepository) {
        this.locationRepository = locationRepository;
    }

    // Save a location to the database, ensuring no duplicates
    public Location saveLocation(Location location) {
        // Check if the location already exists for this user
        Optional<Location> existingLocation = locationRepository
                .findByUsernameAndLocation(location.getUsername(), location.getLocation());

        if (existingLocation.isPresent()) {
            return null;  // Return null if the location already exists
        }

        return locationRepository.save(location);  // Save if location doesn't exist
    }

    // Find all locations for a given username
    public List<Location> findLocationsByUsername(String username) {
        return locationRepository.findByUsername(username);
    }

    // Find a location by its ID
    public Optional<Location> findLocationById(Integer id) {
        return locationRepository.findById(id);
    }

    // Delete a location by its username and location name
    public void deleteLocation(String username, String location) {
        Optional<Location> locationToDelete = locationRepository
                .findByUsernameAndLocation(username, location);

        locationToDelete.ifPresent(locationRepository::delete);  // Delete if location exists
    }
}
