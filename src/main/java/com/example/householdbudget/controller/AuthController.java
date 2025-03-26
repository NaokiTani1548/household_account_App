package com.example.householdbudget.controller;

import com.example.householdbudget.model.User;
import com.example.householdbudget.repository.UserRepository;
import com.example.householdbudget.security.JwtUtil;
import com.example.householdbudget.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;
    
    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, Object> request) {
        String username = (String) request.get("username");
        String password = (String) request.get("password");
        String email = (String) request.get("email");
        System.out.println("Received username: " + username);
        System.out.println("Received password: " + password);
        System.out.println("Received email: " + email);
        try {
            User user = userService.registerUser(username, password, email);
            return ResponseEntity.ok(Map.of("message", "User registered successfully", "userId", user.getId()));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> request) {
    	if(request.get("userId") == null || request.get("password") == null) {
    		return ResponseEntity.status(400).body(Map.of("error", "Missing userId or password"));
    	}
        String userIdStr = request.get("userId");
        String password = request.get("password");
        System.out.println("Received userId: " + userIdStr);
        System.out.println("Received password: " + password);
        
        Long userId = Long.parseLong(userIdStr);

        Optional<User> user = userService.authenticateUser(userId, password);
        if (user.isPresent()) {
            String token = userService.generateToken(userIdStr);
            System.out.println("Received token: " + token);
            return ResponseEntity.ok(Map.of("token", token));
        }
        return ResponseEntity.status(401).body(Map.of("error", "Invalid credentials"));
    }
    
//    @GetMapping("/protected")
//    public ResponseEntity<?> protectedRoute(@RequestHeader ("Authorization") String token) {
//    	String username = userService.validateToken(token);
//    	if (username == null) {
//    		return ResponseEntity.status(401).body("Invalid token");
//    	}
//    	return ResponseEntity.ok("Welcome " + username);
//    	
//    }
}
