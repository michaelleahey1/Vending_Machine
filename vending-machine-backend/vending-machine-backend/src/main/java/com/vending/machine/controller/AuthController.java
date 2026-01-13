package com.vending.machine.controller;

import com.vending.machine.dto.AuthResponse;
import com.vending.machine.dto.LoginRequest;
import com.vending.machine.dto.RegisterRequest;
import com.vending.machine.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")

public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/user/auth/login")
    public ResponseEntity<AuthResponse> userLogin(@RequestBody LoginRequest request) {
        AuthResponse response = authService.loginUser(request);
        if (response.isSuccess()) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }

    @PostMapping("/user/auth/register")
    public ResponseEntity<AuthResponse> userRegister(@RequestBody RegisterRequest request) {
        AuthResponse response = authService.registerUser(request);
        if (response.isSuccess()) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    @PostMapping("/admin/auth/login")
    public ResponseEntity<AuthResponse> adminLogin(@RequestBody LoginRequest request) {
        AuthResponse response = authService.loginAdmin(request);
        if (response.isSuccess()) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }
}

