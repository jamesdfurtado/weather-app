package com.example.backend.controller;

import com.example.backend.model.User;
import com.example.backend.service.UserService;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
// @CrossOrigin(origins = "*")  // ❌ remove or narrow to "http://localhost:3000"
public class AuthController {

    @Autowired private UserService userService;
    @Autowired private PasswordEncoder passwordEncoder;

    /* ---------- REGISTER ---------- */
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String,String> body) {
        String username = body.get("username");
        String idToken  = body.get("idToken");

        try {
            FirebaseToken decoded = FirebaseAuth.getInstance().verifyIdToken(idToken);
            String phone = (String) decoded.getClaims().get("phone_number");

            if (userService.findByPhone(phone).isPresent())
                return ResponseEntity.badRequest().body("Phone already linked to another account");

            if (userService.findUserByUsername(username).isPresent())
                return ResponseEntity.badRequest().body("Username already exists");

            User u = new User();
            u.setUsername(username);
            u.setPassword(passwordEncoder.encode("firebase"));
            u.setPhone(phone);
            u.setPhoneVerified(true);
            userService.saveUser(u);

            return ResponseEntity.ok(Map.of("username", username));

        } catch (Exception ex) {
            return ResponseEntity.badRequest().body("Invalid Firebase token");
        }
    }

    /* ---------- LOGIN ---------- */
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String,String> body) {
        String idToken = body.get("idToken");

        try {
            FirebaseToken decoded = FirebaseAuth.getInstance().verifyIdToken(idToken);
            String phone = (String) decoded.getClaims().get("phone_number");

            var optUser = userService.findByPhone(phone);
            if (optUser.isEmpty())
                return ResponseEntity.badRequest().body("No account linked to this phone");

            return ResponseEntity.ok(Map.of("username", optUser.get().getUsername()));

        } catch (Exception ex) {
            return ResponseEntity.badRequest().body("Invalid Firebase token");
        }
    }
}
