import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Checkout = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    };

    const handlePayment = async () => {
        setLoading(true);
        const res = await loadRazorpayScript();

        if (!res) {
            alert('Razorpay SDK failed to load. Are you online?');
            setLoading(false);
            return;
        }

        try {
            // 1. Create Order on Backend
            // First we need to "place" the order to get an Order ID
            const orderRes = await api.post('/orders');
            const order = orderRes.data; // This is our internal Order entity

            // 2. Create Razorpay Order via our Backend Payment API
            const paymentOrderRes = await api.post(`/payment/create-order/${order.id}`);
            const { razorpayOrderId, amount, currency } = paymentOrderRes.data;

            // 3. Open Razorpay Options
            const options = {
                key: "rzp_test_YourKeyId", // Enter the Key ID generated from the Dashboard
                amount: amount * 100,
                currency: currency,
                name: "ShopEasy Corp",
                description: "Test Transaction",
                order_id: razorpayOrderId,
                handler: async function (response) {
                    const data = {
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_signature: response.razorpay_signature,
                        orderId: order.id
                    };

                    try {
                        await api.post('/payment/verify', data);
                        alert('Payment Successful!');
                        navigate('/orders'); // Redirect to orders
                    } catch (err) {
                        alert('Payment Verification Failed');
                        console.error(err);
                    }
                },
                prefill: {
                    name: "User Name",
                    email: "user@example.com",
                    contact: "9999999999"
                },
                theme: {
                    color: "#61dafb"
                }
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();

        } catch (error) {
            console.error("Error during checkout", error);
            alert("Error during checkout. See console.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto py-10 px-4 text-center">
            <h1 className="text-3xl font-bold mb-6">Checkout</h1>
            <p className="text-gray-600 mb-8">You are about to place your order.</p>
            <button
                onClick={handlePayment}
                disabled={loading}
                className="bg-indigo-600 text-white px-8 py-3 rounded-md font-bold hover:bg-indigo-700 disabled:opacity-50"
            >
                {loading ? 'Processing...' : 'Pay Now'}
            </button>
        </div>
    );
};

export default Checkout;
