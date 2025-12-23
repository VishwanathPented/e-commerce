import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import api from '../services/api';

const Checkout = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        shippingName: '',
        shippingAddress: '',
        shippingCity: '',
        shippingZip: '',
        shippingPhone: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePlaceOrder = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await api.post('/orders', formData);
            toast.success('Order placed successfully!');
            navigate('/orders');
        } catch (error) {
            console.error("Error placing order", error);
            const status = error.response?.status || "Unknown";
            const errorMessage = error.response?.data?.message || `Failed to place order (Status: ${status}). Please try again.`;
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-xl mx-auto py-10 px-4">
            <h1 className="text-3xl font-bold mb-6 text-center">Checkout (Cash on Delivery)</h1>
            <form onSubmit={handlePlaceOrder} className="space-y-4 bg-white p-6 rounded-lg shadow-md">

                <div>
                    <label className="block text-gray-700 font-medium mb-1">Full Name</label>
                    <input
                        type="text"
                        name="shippingName"
                        value={formData.shippingName}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-1">Address</label>
                    <textarea
                        name="shippingAddress"
                        value={formData.shippingAddress}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">City</label>
                        <input
                            type="text"
                            name="shippingCity"
                            value={formData.shippingCity}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">ZIP / Postal Code</label>
                        <input
                            type="text"
                            name="shippingZip"
                            value={formData.shippingZip}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-1">Phone Number</label>
                    <input
                        type="text"
                        name="shippingPhone"
                        value={formData.shippingPhone}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-indigo-600 text-white py-3 rounded-md font-bold hover:bg-indigo-700 transition disabled:opacity-50"
                    >
                        {loading ? 'Placing Order...' : 'Place Order (Cash on Delivery)'}
                    </button>
                </div>

            </form>
        </div>
    );
};

export default Checkout;
