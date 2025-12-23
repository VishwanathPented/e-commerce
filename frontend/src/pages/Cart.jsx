import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';

const Cart = () => {
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadingId, setLoadingId] = useState(null); // Track which item is updating
    const { fetchCartCount } = useCart(); // To update the navbar badge
    const navigate = useNavigate();

    const fetchCart = async () => {
        try {
            const response = await api.get('/cart');
            setCart(response.data);
            // Also update global count
            fetchCartCount();
        } catch (error) {
            console.error("Error fetching cart", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    const updateQuantity = async (productId, newQuantity) => {
        if (newQuantity < 1) {
            handleRemove(productId);
            return;
        }

        setLoadingId(productId);
        try {
            // Using a PUT request with params as per standard query param structure usually,
            // but api.put supports (url, data, config).
            // Our backend expects query params: ?productId=...&quantity=...
            await api.put(`/cart/update?productId=${productId}&quantity=${newQuantity}`);
            await fetchCart();
        } catch (error) {
            console.error("Error updating quantity", error);
        } finally {
            setLoadingId(null);
        }
    };

    const handleRemove = async (productId) => {
        try {
            await api.delete(`/cart/remove/${productId}`);
            fetchCart(); // This repairs layout & global badge count
        } catch (error) {
            console.error("Error removing item", error);
        }
    };

    // Note: To implement quantity updates properly, we'd need a backend endpoint for it.
    // For now, we'll just stick to remove or adding logic if the backend supports it,
    // but typically 'addToCart' handles increments.
    // Since we don't have a direct 'updateQuantity' endpoint exposed in the provided context,
    // we clearly focus on the layout and remove functionality for this UI revamp.

    const handleCheckout = () => {
        navigate('/checkout');
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
        </div>
    );

    const isEmpty = !cart || !cart.items || cart.items.length === 0;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-8 font-[Outfit]">shopping Cart</h1>

                {isEmpty ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center py-24 bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700"
                    >
                        <div className="flex justify-center mb-6">
                            <div className="p-6 bg-indigo-50 dark:bg-indigo-900/30 rounded-full">
                                <ShoppingBag size={64} className="text-indigo-600 dark:text-indigo-400" />
                            </div>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 font-[Outfit]">Your cart is empty</h2>
                        <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto">
                            Looks like you haven't added anything to your cart yet. Discover our premium collection and find something you love.
                        </p>
                        <Link
                            to="/products"
                            className="inline-flex items-center px-8 py-4 border border-transparent rounded-full shadow-lg text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 hover:shadow-indigo-500/30 transition-all hover:-translate-y-1"
                        >
                            Start Shopping <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </motion.div>
                ) : (
                    <div className="lg:grid lg:grid-cols-12 lg:gap-12">
                        {/* Cart Items List */}
                        <div className="lg:col-span-8">
                            <AnimatePresence>
                                <div className="space-y-4">
                                    {cart.items.map((item) => (
                                        <motion.div
                                            key={item.id}
                                            layout
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, x: -200 }}
                                            className="flex flex-col sm:flex-row bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 transition-colors"
                                        >
                                            {/* Product Image */}
                                            <div className="flex-shrink-0 w-full sm:w-32 h-32 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-700 mb-4 sm:mb-0">
                                                <img
                                                    src={item.product.imageUrl || 'https://via.placeholder.com/150'}
                                                    alt={item.product.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>

                                            {/* Product Details */}
                                            <div className="sm:ml-6 flex-1 flex flex-col justify-between">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <Link to={`/products/${item.product.id}`} className="text-lg font-bold text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors line-clamp-1 font-[Outfit]">
                                                            {item.product.name}
                                                        </Link>
                                                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                                            {item.product.description ? item.product.description.substring(0, 50) + '...' : 'Premium Product'}
                                                        </p>
                                                    </div>
                                                    <p className="text-xl font-bold text-gray-900 dark:text-white font-[Outfit]">
                                                        ₹{item.product.price * item.quantity}
                                                    </p>
                                                </div>

                                                <div className="flex justify-between items-end mt-4">
                                                    <div className="flex items-center space-x-4">
                                                        <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg">
                                                            <button
                                                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                                                className="px-3 py-1 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-l-lg transition-colors"
                                                                disabled={loadingId === item.product.id}
                                                            >
                                                                <Minus size={16} />
                                                            </button>
                                                            <span className="px-3 py-1 text-gray-900 dark:text-white font-medium border-l border-r border-gray-300 dark:border-gray-600 min-w-[3rem] text-center">
                                                                {item.quantity}
                                                            </span>
                                                            <button
                                                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                                className="px-3 py-1 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-r-lg transition-colors"
                                                                disabled={loadingId === item.product.id}
                                                            >
                                                                <Plus size={16} />
                                                            </button>
                                                        </div>
                                                    </div>

                                                    <button
                                                        onClick={() => handleRemove(item.product.id)}
                                                        className="flex items-center text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors text-sm font-medium p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                                                    >
                                                        <Trash2 size={18} className="mr-2" />
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </AnimatePresence>
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-4 mt-8 lg:mt-0">
                            <div className="sticky top-24">
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-8"
                                >
                                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 font-[Outfit]">Order Summary</h2>

                                    <div className="space-y-4">
                                        <div className="flex justify-between text-base text-gray-600 dark:text-gray-400">
                                            <p>Subtotal</p>
                                            <p className="font-medium text-gray-900 dark:text-white">₹{cart.totalPrice}</p>
                                        </div>
                                        <div className="flex justify-between text-base text-gray-600 dark:text-gray-400">
                                            <p>Shipping</p>
                                            <p className="text-green-600 font-medium">Free</p>
                                        </div>
                                        <div className="flex justify-between text-base text-gray-600 dark:text-gray-400">
                                            <p>Tax Estimate</p>
                                            <p className="font-medium text-gray-900 dark:text-white">₹{(cart.totalPrice * 0.18).toFixed(2)}</p>
                                        </div>

                                        <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
                                            <div className="flex justify-between items-center">
                                                <p className="text-lg font-bold text-gray-900 dark:text-white">Order Total</p>
                                                <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 font-[Outfit]">
                                                    ₹{cart.totalPrice + (cart.totalPrice * 0.18)}
                                                </p>
                                            </div>
                                            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1 text-right">Includes taxes</p>
                                        </div>
                                    </div>

                                    <button
                                        onClick={handleCheckout}
                                        className="w-full mt-8 btn-primary flex items-center justify-center py-4 text-lg shadow-lg hover:shadow-indigo-500/25"
                                    >
                                        Proceed to Checkout <ArrowRight className="ml-2 h-5 w-5" />
                                    </button>

                                    <div className="mt-6 flex items-center justify-center text-xs text-gray-500 dark:text-gray-400">
                                        <ShieldCheck className="h-4 w-4 mr-2 text-green-500" />
                                        Secure Checkout Encounter-to-End Encrypted
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
