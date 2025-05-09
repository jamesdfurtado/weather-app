package com.example.backend.controller;

import com.example.backend.model.User;
import com.example.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired private UserService userService;
    @Autowired private PasswordEncoder passwordEncoder;

    @PostMapping("/signup")
    public ResponseEntity<String> signUp(@RequestBody User user) {
        if (userService.findUserByUsername(user.getUsername()).isPresent()) {
            return ResponseEntity.badRequest().body("Username already exists");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userService.saveUser(user);
        return ResponseEntity.ok("Sign-up successful");
    }

    @PostMapping("/signin")
    public ResponseEntity<String> signIn(@RequestBody User user) {
        var storedUserOpt = userService.findUserByUsername(user.getUsername());
        if (storedUserOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Username not found");
        }

        User storedUser = storedUserOpt.get();
        if (passwordEncoder.matches(user.getPassword(), storedUser.getPassword())) {
            return ResponseEntity.ok("Sign-in successful");
        } else {
            return ResponseEntity.badRequest().body("Incorrect password");
        }
    }
}
