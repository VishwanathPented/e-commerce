import React, { useEffect, useState } from 'react';
import api from '../services/api';
import ProductCard from '../components/ProductCard';
import { useAuth } from '../context/AuthContext';

const Wishlist = () => {
    const [wishlist, setWishlist] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    const fetchWishlist = async () => {
        try {
            const response = await api.get('/wishlist');
            setWishlist(response.data);
        } catch (error) {
            console.error("Error fetching wishlist", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWishlist();
    }, []);

    if (loading) {
        return <div className="text-center py-10 dark:text-white">Loading wishlist...</div>;
    }

    if (!wishlist || !wishlist.products || wishlist.products.length === 0) {
        return (
            <div className="max-w-7xl mx-auto py-16 px-4 text-center">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Your Wishlist is Empty</h2>
                <p className="text-gray-600 dark:text-gray-400">Save items you want to buy later!</p>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">My Wishlist</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {wishlist.products.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default Wishlist;
