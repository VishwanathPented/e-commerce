package com.ecommerce.controller;

import com.ecommerce.model.User;
import com.ecommerce.model.Wishlist;
import com.ecommerce.repository.UserRepository;
import com.ecommerce.service.WishlistService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/api/wishlist")
@RequiredArgsConstructor
public class WishlistController {

    private final WishlistService wishlistService;
    private final UserRepository userRepository;

    private User getUser(Principal principal) {
        String email = principal.getName();
        return userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
    }

    @GetMapping
    public ResponseEntity<Wishlist> getWishlist(Principal principal) {
        return ResponseEntity.ok(wishlistService.getWishlist(getUser(principal)));
    }

    @PostMapping("/add/{productId}")
    public ResponseEntity<Wishlist> addToWishlist(Principal principal, @PathVariable Long productId) {
        return ResponseEntity.ok(wishlistService.addToWishlist(getUser(principal), productId));
    }

    @DeleteMapping("/remove/{productId}")
    public ResponseEntity<Wishlist> removeFromWishlist(Principal principal, @PathVariable Long productId) {
        return ResponseEntity.ok(wishlistService.removeFromWishlist(getUser(principal), productId));
    }
}
