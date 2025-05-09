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

    public Location saveLocation(Location location) {
        Optional<Location> existing = locationRepository
                .findByUsernameAndLocation(location.getUsername(), location.getLocation());

        return existing.isPresent() ? null : locationRepository.save(location);
    }

    public List<Location> findLocationsByUsername(String username) {
        return locationRepository.findByUsername(username);
    }

    public Optional<Location> findLocationById(int id) {
        return locationRepository.findById(id);
    }

    public void deleteLocation(String username, String location) {
        locationRepository
                .findByUsernameAndLocation(username, location)
                .ifPresent(locationRepository::delete);
    }
}
