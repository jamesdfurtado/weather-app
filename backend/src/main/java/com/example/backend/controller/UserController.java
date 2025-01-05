package com.example.backend.controller;

import com.example.backend.model.User;
import com.example.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    // Endpoint for signing up (creating a user)
    @PostMapping("/signup")
    public ResponseEntity<User> signUp(@RequestBody User user) {
        if (userService.findUserByUsername(user.getUsername()).isPresent()) {
            return ResponseEntity.badRequest().build();  // Username already taken
        }
        User savedUser = userService.saveUser(user);
        return ResponseEntity.ok(savedUser);  // Return the created user
    }

    // Endpoint for getting user by username
    @GetMapping("/{username}")
    public ResponseEntity<User> getUserByUsername(@PathVariable String username) {
        Optional<User> user = userService.findUserByUsername(username);
        return user.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // New sign-in endpoint
    @PostMapping("/signin")
    public ResponseEntity<String> signIn(@RequestBody User user) {
        // Check if the user exists
        Optional<User> existingUser = userService.findUserByUsername(user.getUsername());

        if (existingUser.isEmpty()) {
            return ResponseEntity.badRequest().body("Username not found!");
        }

        // Check if passwords match
        if (existingUser.get().getPword().equals(user.getPword())) {
            return ResponseEntity.ok("Sign-in successful!");
        } else {
            return ResponseEntity.badRequest().body("Incorrect password!");
        }
    }
}
