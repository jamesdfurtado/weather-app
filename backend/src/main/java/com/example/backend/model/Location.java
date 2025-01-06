package com.example.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "locations")
public class Location {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "location", nullable = false)
    private String location;

    @Column(name = "username", nullable = false)
    private String username;  // Changed from userId (int) to username (String)

    // Constructors
    public Location() {
    }

    public Location(String location, String username) {
        this.location = location;
        this.username = username;  // Updated constructor
    }

    // Getters and Setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getUsername() {
        return username;  // Getter for username
    }

    public void setUsername(String username) {
        this.username = username;  // Setter for username
    }
}
