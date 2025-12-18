package com.ecommerce.controller;

import com.ecommerce.model.Order;
import com.ecommerce.model.Payment;
import com.ecommerce.repository.OrderRepository;
import com.ecommerce.repository.PaymentRepository;
import com.ecommerce.service.RazorpayService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.Map;

@RestController
@RequestMapping("/api/payment")
@RequiredArgsConstructor
public class PaymentController {

    private final RazorpayService razorpayService;
    private final OrderRepository orderRepository;
    private final PaymentRepository paymentRepository;

    // Step 1: Frontend calls this to get razorpay_order_id
    @PostMapping("/create-order/{orderId}")
    public ResponseEntity<?> createPaymentOrder(@PathVariable Long orderId) {
        try {
            Order order = orderRepository.findById(orderId)
                    .orElseThrow(() -> new RuntimeException("Order not found"));

            // Call Razorpay to create order
            com.razorpay.Order razorpayOrder = razorpayService.createRazorpayOrder(order.getTotalAmount());

            // Save razorpay_order_id to local order
            String rzpOrderId = razorpayOrder.get("id");
            order.setRazorpayOrderId(rzpOrderId);
            orderRepository.save(order);

            return ResponseEntity.ok(Map.of(
                "orderId", orderId,
                "razorpayOrderId", rzpOrderId,
                "amount", order.getTotalAmount(),
                "currency", "INR"
            ));

        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error creating payment order: " + e.getMessage());
        }
    }

    // Step 2: Frontend calls this after successful payment
    @PostMapping("/verify")
    public ResponseEntity<?> verifyPayment(@RequestBody Map<String, String> data) {
        try {
            String razorpayOrderId = data.get("razorpay_order_id");
            String razorpayPaymentId = data.get("razorpay_payment_id");
            String razorpaySignature = data.get("razorpay_signature");
            Long orderId = Long.parseLong(data.get("orderId"));

            boolean isValid = razorpayService.verifySignature(razorpayOrderId, razorpayPaymentId, razorpaySignature);

            if (isValid) {
                Order order = orderRepository.findById(orderId).orElseThrow();
                order.setStatus("PAID");
                orderRepository.save(order);

                // Record Payment
                Payment payment = Payment.builder()
                        .order(order)
                        .razorpayPaymentId(razorpayPaymentId)
                        .razorpaySignature(razorpaySignature)
                        .amount(order.getTotalAmount())
                        .status("SUCCESS")
                        .build();
                paymentRepository.save(payment);

                return ResponseEntity.ok("Payment confirmed");
            } else {
                return ResponseEntity.badRequest().body("Invalid signature");
            }

        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Verification failed: " + e.getMessage());
        }
    }
}
