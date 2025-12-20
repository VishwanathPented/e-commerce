import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { ShoppingBag } from 'lucide-react';

const Cart = () => {
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchCart = async () => {
        try {
            const response = await api.get('/cart');
            setCart(response.data);
        } catch (error) {
            console.error("Error fetching cart", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    const handleRemove = async (productId) => {
        try {
            await api.delete(`/cart/remove/${productId}`);
            fetchCart(); // Refresh cart
        } catch (error) {
            console.error("Error removing item", error);
        }
    };

    const handleCheckout = () => {
        navigate('/checkout');
    };

    if (loading) return <div className="text-center py-10">Loading Cart...</div>;
    if (!cart || cart.items.length === 0) return (
        <div className="text-center py-16">
            <div className="flex justify-center mb-4">
                <div className="p-4 bg-indigo-100 dark:bg-indigo-900 rounded-full">
                    <ShoppingBag size={48} className="text-indigo-600 dark:text-indigo-400" />
                </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Your Cart is Empty</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6">Looks like you haven't added anything yet.</p>
            <Link to="/" className="inline-block bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors">Start Shopping</Link>
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <ul className="divide-y divide-gray-200">
                    {cart.items.map((item) => (
                        <li key={item.id} className="px-6 py-4 flex items-center">
                            <img
                                className="h-16 w-16 object-cover rounded-md"
                                src={item.product.imageUrl || 'https://via.placeholder.com/150'}
                                alt={item.product.name}
                            />
                            <div className="ml-4 flex-1">
                                <Link to={`/products/${item.product.id}`} className="text-lg font-medium text-gray-900 hover:text-indigo-600">
                                    {item.product.name}
                                </Link>
                                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-lg font-bold text-gray-900">₹{item.product.price * item.quantity}</p>
                                <button
                                    onClick={() => handleRemove(item.product.id)}
                                    className="text-red-500 text-sm hover:text-red-700 mt-1"
                                >
                                    Remove
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
                <div className="px-6 py-4 bg-gray-50 flex justify-between items-center">
                    <span className="text-xl font-bold text-gray-900">Total: ₹{cart.totalPrice}</span>
                    <button
                        onClick={handleCheckout}
                        className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 font-medium"
                    >
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
