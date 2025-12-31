package com.vending.machine.service;

import com.vending.machine.model.Admin;
import com.vending.machine.model.User;
import com.vending.machine.dto.AuthResponse;
import com.vending.machine.dto.LoginRequest;
import com.vending.machine.dto.RegisterRequest;
import com.vending.machine.repository.AdminRepository;
import com.vending.machine.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class AuthService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private AdminRepository adminRepository;

    // Hash password using SHA-256 (matching the database hashes)
    private String hashPassword(String password) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(password.getBytes(StandardCharsets.UTF_8));
            StringBuilder hexString = new StringBuilder();
            for (byte b : hash) {
                String hex = Integer.toHexString(0xff & b);
                if (hex.length() == 1) {
                    hexString.append('0');
                }
                hexString.append(hex);
            }
            return hexString.toString();
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("Error hashing password", e);
        }
    }

    public AuthResponse loginUser(LoginRequest request) {
        Optional<User> userOpt = userRepository.findByUsername(request.getUsername());
        if (userOpt.isEmpty()) {
            return new AuthResponse(false, "Invalid username or password");
        }

        User user = userOpt.get();
        String hashedPassword = hashPassword(request.getPassword());
        
        if (!user.getPassword().equals(hashedPassword)) {
            return new AuthResponse(false, "Invalid username or password");
        }

        if (!user.getIsActive()) {
            return new AuthResponse(false, "Account is inactive");
        }

        // Update last login
        user.setLastLogin(LocalDateTime.now());
        userRepository.save(user);

        AuthResponse response = new AuthResponse(true, "Login successful");
        response.setUserId(user.getUserId());
        response.setUsername(user.getUsername());
        response.setEmail(user.getEmail());
        response.setBalance(user.getBalance() != null ? user.getBalance().doubleValue() : 0.0);
        return response;
    }

    public AuthResponse loginAdmin(LoginRequest request) {
        Optional<Admin> adminOpt = adminRepository.findByUsername(request.getUsername());
        if (adminOpt.isEmpty()) {
            return new AuthResponse(false, "Invalid username or password");
        }

        Admin admin = adminOpt.get();
        String hashedPassword = hashPassword(request.getPassword());
        
        if (!admin.getPassword().equals(hashedPassword)) {
            return new AuthResponse(false, "Invalid username or password");
        }

        if (!admin.getIsActive()) {
            return new AuthResponse(false, "Account is inactive");
        }

        // Update last login
        admin.setLastLogin(LocalDateTime.now());
        adminRepository.save(admin);

        AuthResponse response = new AuthResponse(true, "Login successful");
        response.setUserId(admin.getAdminId());
        response.setUsername(admin.getUsername());
        response.setEmail(admin.getEmail());
        return response;
    }

    public AuthResponse registerUser(RegisterRequest request) {
        // Validate input
        if (request.getUsername() == null || request.getUsername().trim().isEmpty()) {
            return new AuthResponse(false, "Username is required");
        }
        if (request.getPassword() == null || request.getPassword().trim().isEmpty()) {
            return new AuthResponse(false, "Password is required");
        }
        if (request.getEmail() == null || request.getEmail().trim().isEmpty()) {
            return new AuthResponse(false, "Email is required");
        }

        // Check if username already exists
        if (userRepository.existsByUsername(request.getUsername())) {
            return new AuthResponse(false, "Username already exists");
        }

        // Check if email already exists
        if (userRepository.existsByEmail(request.getEmail())) {
            return new AuthResponse(false, "Email already exists");
        }

        // Create new user
        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(hashPassword(request.getPassword()));
        user.setEmail(request.getEmail());
        user.setPhoneNumber(request.getPhoneNumber());
        user.setBalance(java.math.BigDecimal.valueOf(50.00)); // Default balance
        user.setIsActive(true);

        User savedUser = userRepository.save(user);

        AuthResponse response = new AuthResponse(true, "Registration successful");
        response.setUserId(savedUser.getUserId());
        response.setUsername(savedUser.getUsername());
        response.setEmail(savedUser.getEmail());
        response.setBalance(savedUser.getBalance().doubleValue());
        return response;
    }
}

