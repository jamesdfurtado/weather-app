package com.example.backend.controller;

import com.example.backend.model.Location;
import com.example.backend.service.LocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/locations")
public class LocationController {

    private final LocationService locationService;

    @Autowired
    public LocationController(LocationService locationService) {
        this.locationService = locationService;
    }

    // Endpoint to save a location for a user
    @PostMapping("/save")
    public ResponseEntity<Location> saveLocation(@RequestBody Location location) {
        Location savedLocation = locationService.saveLocation(location);
        if (savedLocation == null) {
            return ResponseEntity.status(400).body(null);  // Location already exists for the user
        }
        return ResponseEntity.ok(savedLocation);
    }

    // Endpoint to retrieve all locations for a user
    @GetMapping("/user/{username}")
    public ResponseEntity<List<Location>> getLocationsByUsername(@PathVariable String username) {
        List<Location> locations = locationService.findLocationsByUsername(username);
        return ResponseEntity.ok(locations);
    }

    // Endpoint to retrieve a specific location by its ID (if still required)
    @GetMapping("/{id}")
    public ResponseEntity<Location> getLocationById(@PathVariable Integer id) {
        Optional<Location> location = locationService.findLocationById(id);
        return location.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Endpoint to delete a location by its username and location name
    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteLocation(@RequestBody Location location) {
        locationService.deleteLocation(location.getUsername(), location.getLocation());
        return ResponseEntity.ok("Location deleted successfully!");
    }

}
