package com.example.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api") // prefix for all endpoints in this controller
public class AuthController {

    // Handle POST request for user sign-up
    @PostMapping("/signup")
    public ResponseEntity<String> signUp(@RequestBody Map<String, String> userData) {
        // Retrieve username and password from request body
        String username = userData.get("username");
        String password = userData.get("password");

        // Temporary logic to mimic saving user data
        System.out.println("Received sign-up data:");
        System.out.println("Username: " + username);
        System.out.println("Password: " + password);

        // Respond with a success message
        return ResponseEntity.ok("Sign-up successful (temporary placeholder)!");
    }
}
