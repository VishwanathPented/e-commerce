package com.ecommerce.service;

import com.ecommerce.model.Order;
import com.ecommerce.model.Shipment;
import com.ecommerce.repository.OrderRepository;
import com.ecommerce.repository.ShipmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.UUID;

/**
 * DelhiveryService
 *
 * Handles logistics operations.
 * - Creates shipment in Delhivery system.
 * - Tracks shipment status.
 */
@Service
@RequiredArgsConstructor
public class DelhiveryService {

    @Value("${delhivery.api.token}")
    private String apiToken;

    @Value("${delhivery.api.url}")
    private String apiUrl;

    private final ShipmentRepository shipmentRepository;
    private final OrderRepository orderRepository;
    private final RestTemplate restTemplate = new RestTemplate();

    public Shipment createShipment(Long orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        if (!"PAID".equals(order.getStatus())) {
            throw new RuntimeException("Order is not PAID. Cannot ship.");
        }

        // 1. Call real Delhivery API here.
        // For production, we would map Order address to Delhivery Payload.
        // String response = restTemplate.postForObject(apiUrl + "/cmu/creation.json", request, String.class);

        // 2. Mocking response for now
        String mockTrackingId = "DELHI_" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();

        Shipment shipment = Shipment.builder()
                .order(order)
                .delhiveryTrackingId(mockTrackingId)
                .status("Ready for Pickup")
                .build();

        Shipment savedShipment = shipmentRepository.save(shipment);

        // Update Order Status
        order.setStatus("SHIPPED");
        orderRepository.save(order);

        return savedShipment;
    }

    public String trackShipment(String trackingId) {
        // 1. Call Delhivery Tracking API
        // return restTemplate.getForObject(apiUrl + "/json/scan/bwb/" + trackingId, String.class);

        // 2. Mocking response
        return "Shipment " + trackingId + " is currently in transit.";
    }
}
