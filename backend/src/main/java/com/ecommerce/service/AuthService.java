package com.ecommerce.service;

import com.ecommerce.dto.AuthDto;
import com.ecommerce.model.User;
import com.ecommerce.repository.UserRepository;
import com.ecommerce.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

/**
 * AuthService
 *
 * Handles business logic for authentication.
 * - Register: Checks if user exists, encodes password, saves user, generates token.
 * - Login: Authenticates via AuthenticationManager, generates token.
 */
@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;

    public AuthDto.AuthResponse register(AuthDto.RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already in use");
        }

        var user = User.builder()
                .fullName(request.getFullName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role("ROLE_CUSTOMER") // Default role
                .build();

        userRepository.save(user);

        // Generate token immediately (auto-login after register)
        var userDetails = new CustomUserDetailsService(userRepository).loadUserByUsername(user.getEmail());
        var jwtToken = jwtUtil.generateToken(userDetails);

        return AuthDto.AuthResponse.builder()
                .token(jwtToken)
                .role(user.getRole())
                .message("User registered successfully")
                .build();
    }

    public AuthDto.AuthResponse login(AuthDto.LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        var user = userRepository.findByEmail(request.getEmail())
                .orElseThrow();

        // We need UserDetails for token generation.
        // In a real app, we might just map the User entity directly if it implemented UserDetails,
        // but here we used a separate implementation in CustomUserDetailsService.
        // Re-fetching UserDetails or reconstructing it is fine.
        var userDetails = org.springframework.security.core.userdetails.User.builder()
                .username(user.getEmail())
                .password(user.getPassword())
                .roles(user.getRole().replace("ROLE_", ""))
                .build();

        var jwtToken = jwtUtil.generateToken(userDetails);

        return AuthDto.AuthResponse.builder()
                .token(jwtToken)
                .role(user.getRole())
                .message("Login successful")
                .build();
    }
}
