package com.ecommerce.controller;

import com.ecommerce.model.Cart;
import com.ecommerce.model.User;
import com.ecommerce.service.CartService;
import com.ecommerce.service.CustomUserDetailsService;
import com.ecommerce.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;
    private final UserRepository userRepository;

    // Helper to get authenticated User entity
    private User getUser(Principal principal) {
        String email = principal.getName();
        return userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
    }

    @GetMapping
    public ResponseEntity<Cart> getCart(Principal principal) {
        return ResponseEntity.ok(cartService.getCart(getUser(principal)));
    }

    @PostMapping("/add")
    public ResponseEntity<Cart> addToCart(Principal principal, @RequestParam Long productId, @RequestParam int quantity) {
        System.out.println("DEBUG: Request to add to cart. User: " + principal.getName() + ", ProductId: " + productId + ", Qty: " + quantity);
        try {
            return ResponseEntity.ok(cartService.addToCart(getUser(principal), productId, quantity));
        } catch (Exception e) {
            System.err.println("DEBUG: Error in addToCart Controller: " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }

    @DeleteMapping("/remove/{productId}")
    public ResponseEntity<Cart> removeFromCart(Principal principal, @PathVariable Long productId) {
        return ResponseEntity.ok(cartService.removeFromCart(getUser(principal), productId));
    }
}
