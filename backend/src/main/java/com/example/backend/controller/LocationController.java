package com.example.backend.controller;

import com.example.backend.model.Location;
import com.example.backend.service.LocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/locations")
public class LocationController {

    private final LocationService locationService;

    @Autowired
    public LocationController(LocationService locationService) {
        this.locationService = locationService;
    }

    // Save a location for a user
    @PostMapping("/save")
    public ResponseEntity<?> saveLocation(@RequestBody Location location) {
        if (location.getUsername() == null || location.getLocation() == null) {
            return ResponseEntity.badRequest().body("Username and location are required.");
        }

        Location saved = locationService.saveLocation(location);
        if (saved == null) {
            return ResponseEntity.status(409).body("Location already saved.");
        }

        return ResponseEntity.ok(saved);
    }

    // Get all saved locations for a user
    @GetMapping("/user/{username}")
    public ResponseEntity<?> getLocationsByUsername(@PathVariable String username) {
        if (username == null || username.trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Username is required.");
        }

        List<Location> locations = locationService.findLocationsByUsername(username);
        return ResponseEntity.ok(locations);
    }

    // Delete a location by username and location name
    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteLocation(@RequestBody Location location) {
        if (location.getUsername() == null || location.getLocation() == null) {
            return ResponseEntity.badRequest().body("Username and location are required.");
        }

        locationService.deleteLocation(location.getUsername(), location.getLocation());
        return ResponseEntity.ok("Location deleted successfully!");
    }
}
