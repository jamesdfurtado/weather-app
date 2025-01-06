package com.example.backend.repository;

import com.example.backend.model.Location;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface LocationRepository extends JpaRepository<Location, Integer> {
    // Custom query method to find all locations by username
    List<Location> findByUsername(String username);

    // Custom query method to find a location by username and location name
    Optional<Location> findByUsernameAndLocation(String username, String location);
}
