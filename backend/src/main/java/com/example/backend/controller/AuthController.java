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
public class AuthController {

    @Autowired private UserService userService;
    @Autowired private PasswordEncoder passwordEncoder;

    /* ---------- SIGNUP ---------- */
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody Map<String, String> body) {
        String username = body.get("username");
        String password = body.get("password");
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
            u.setPassword(passwordEncoder.encode(password));
            u.setPhone(phone);
            u.setPhoneVerified(true);
            userService.saveUser(u);

            return ResponseEntity.ok(Map.of("username", username));

        } catch (Exception ex) {
            return ResponseEntity.badRequest().body("Invalid Firebase token");
        }
    }

    /* ---------- SIGNIN (Step 1: Password Check) ---------- */
    @PostMapping("/signin")
    public ResponseEntity<?> signin(@RequestBody Map<String, String> body) {
        String username = body.get("username");
        String password = body.get("password");

        var optUser = userService.findUserByUsername(username);
        if (optUser.isEmpty())
            return ResponseEntity.badRequest().body("Invalid username or password");

        User user = optUser.get();
        if (!passwordEncoder.matches(password, user.getPassword()))
            return ResponseEntity.badRequest().body("Invalid username or password");

        return ResponseEntity.ok(Map.of(
                "message", "Password validated. Proceed to phone verification.",
                "username", username,
                "phone", user.getPhone()
        ));
    }

    /* ---------- VERIFY LOGIN (Step 2: Firebase SMS ID Token) ---------- */
    @PostMapping("/verify-login")
    public ResponseEntity<?> verifyLogin(@RequestBody Map<String, String> body) {
        String username = body.get("username");
        String idToken = body.get("idToken");

        try {
            FirebaseToken decoded = FirebaseAuth.getInstance().verifyIdToken(idToken);
            String phoneFromToken = (String) decoded.getClaims().get("phone_number");

            var optUser = userService.findUserByUsername(username);
            if (optUser.isEmpty())
                return ResponseEntity.badRequest().body("User not found");

            User user = optUser.get();
            if (!user.getPhone().equals(phoneFromToken))
                return ResponseEntity.badRequest().body("Phone number does not match");

            // Optionally: update user.lastLogin, session, etc.
            return ResponseEntity.ok(Map.of(
                    "message", "User successfully signed in.",
                    "username", username
            ));

        } catch (Exception ex) {
            return ResponseEntity.badRequest().body("Invalid Firebase token");
        }
    }
}
