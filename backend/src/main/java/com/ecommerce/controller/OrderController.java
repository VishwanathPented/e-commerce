package com.ecommerce.controller;

import com.ecommerce.model.Order;
import com.ecommerce.model.User;
import com.ecommerce.repository.UserRepository;
import com.ecommerce.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;
    private final UserRepository userRepository;

    private User getUser(Principal principal) {
        String email = principal.getName();
        return userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
    }

    @PostMapping
    public ResponseEntity<Order> placeOrder(Principal principal) {
        return ResponseEntity.ok(orderService.placeOrder(getUser(principal)));
    }

    @GetMapping
    public ResponseEntity<List<Order>> getUserOrders(Principal principal) {
        return ResponseEntity.ok(orderService.getUserOrders(getUser(principal)));
    }

    @GetMapping("/all")
    public ResponseEntity<List<Order>> getAllOrders() {
        // In real app: Check for ROLE_ADMIN here or via SecurityConfig
        return ResponseEntity.ok(orderService.getAllOrders());
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Order> updateOrderStatus(@PathVariable Long id, @RequestParam String status) {
        return ResponseEntity.ok(orderService.updateOrderStatus(id, status));
    }
}
