package com.ecommerce.service;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.razorpay.Utils;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

/**
 * RazorpayService
 *
 * Wraps Razorpay Java SDK.
 * - Creates orders on Razorpay server (prerequisite for payment UI).
 * - Verifies payment signature (security check).
 */
@Service
public class RazorpayService {

    @Value("${razorpay.key.id}")
    private String keyId;

    @Value("${razorpay.key.secret}")
    private String keySecret;

    private RazorpayClient client;

    // Initialize client lazily or in constructor
    private RazorpayClient getClient() throws RazorpayException {
        if (client == null) {
            client = new RazorpayClient(keyId, keySecret);
        }
        return client;
    }

    public Order createRazorpayOrder(BigDecimal amount) throws RazorpayException {
        // Mock logic for development if keys are not set
        if (keyId.contains("YourKeyId") || keySecret.contains("YourKeySecret")) {
            System.out.println("DEBUG: RazorpayService - Using MOCK mode (Invalid Keys detected)");
            JSONObject mockOrderJson = new JSONObject();
            mockOrderJson.put("id", "order_mock_" + System.currentTimeMillis());
            mockOrderJson.put("amount", amount.multiply(new BigDecimal(100)).intValue());
            mockOrderJson.put("currency", "INR");
            mockOrderJson.put("receipt", "txn_" + System.currentTimeMillis());
            mockOrderJson.put("status", "created");
            return new Order(mockOrderJson);
        }

        JSONObject options = new JSONObject();
        // Razorpay expects amount in paise (multiply by 100)
        options.put("amount", amount.multiply(new BigDecimal(100)).intValue());
        options.put("currency", "INR");
        options.put("receipt", "txn_" + System.currentTimeMillis());
        options.put("payment_capture", 1); // Auto capture

        return getClient().orders.create(options);
    }

    public boolean verifySignature(String orderId, String paymentId, String signature) throws RazorpayException {
        // Mock verification
        if (keyId.contains("YourKeyId") || keySecret.contains("YourKeySecret")) {
            System.out.println("DEBUG: RazorpayService - Mocking verification for order: " + orderId);
            return true; // Always return true in mock mode
        }

        JSONObject options = new JSONObject();
        options.put("razorpay_order_id", orderId);
        options.put("razorpay_payment_id", paymentId);
        options.put("razorpay_signature", signature);

        return Utils.verifyPaymentSignature(options, keySecret);
    }
}
