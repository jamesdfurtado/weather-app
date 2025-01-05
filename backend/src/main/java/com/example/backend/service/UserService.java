package com.example.backend.service;

import com.example.backend.model.User;
import com.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Save a user to the database
    public User saveUser(User user) {
        return userRepository.save(user);
    }

    // Find a user by ID
    public Optional<User> findUserById(Long id) {
        return userRepository.findById(id);
    }

    // Find a user by username
    public Optional<User> findUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    // Validate password for a given username
    public boolean validatePassword(String username, String password) {
        Optional<User> userOpt = findUserByUsername(username);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            return user.getPword().equals(password);  // Compare the stored password (not hashed yet)
        }
        return false;  // User not found, return false
    }
}
