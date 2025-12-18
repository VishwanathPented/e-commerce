package com.ecommerce.controller;

import com.ecommerce.model.Shipment;
import com.ecommerce.service.DelhiveryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/shipments")
@RequiredArgsConstructor
public class ShipmentController {

    private final DelhiveryService delhiveryService;

    // Admin or System trigger to create shipment
    @PostMapping("/create/{orderId}")
    public ResponseEntity<Shipment> createShipment(@PathVariable Long orderId) {
        return ResponseEntity.ok(delhiveryService.createShipment(orderId));
    }

    @GetMapping("/track/{trackingId}")
    public ResponseEntity<String> trackShipment(@PathVariable String trackingId) {
        return ResponseEntity.ok(delhiveryService.trackShipment(trackingId));
    }
}
