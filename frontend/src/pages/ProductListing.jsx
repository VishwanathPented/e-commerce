import React, { useEffect, useState } from 'react';
import api from '../services/api';
import ProductCard from '../components/ProductCard';
import { useSearchParams } from 'react-router-dom';

const ProductListing = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchParams] = useSearchParams();
    const [error, setError] = useState(null);
    const searchQuery = searchParams.get('search') || '';

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch Products and Categories in parallel
                const [productsRes, categoriesRes] = await Promise.all([
                    api.get('/products'),
                    api.get('/products/categories')
                ]);

                // Ensure data is array and filter out nulls immediately to prevent crashes later
                const validProducts = Array.isArray(productsRes.data) ? productsRes.data.filter(p => p) : [];
                setProducts(validProducts);

                const validCategories = Array.isArray(categoriesRes.data) ? categoriesRes.data : [];
                setCategories(["All", ...validCategories]);
            } catch (error) {
                console.error("Error fetching data", error);
                setError("Failed to load products. Please check your connection.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Initial value for filteredProducts
    let filteredProducts = products;

    // Filter by Category
    if (selectedCategory !== "All") {
        filteredProducts = filteredProducts.filter(p => p.category === selectedCategory);
    }

    // Filter by Search Query (Client-side for now)
    if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filteredProducts = filteredProducts.filter(p =>
            p && ( // Check if p exists first
                (p.name && p.name.toLowerCase().includes(query)) ||
                (p.description && p.description.toLowerCase().includes(query)) ||
                (p.category && p.category.toLowerCase().includes(query))
            )
        );
    }

    if (loading) {
        return <div className="text-center py-10 text-gray-600 dark:text-gray-400">Loading products...</div>;
    }

    if (error) {
        return (
            <div className="text-center py-10 text-red-500">
                <p>{error}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                >
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                {searchQuery ? `Search Results for "${searchQuery}"` : 'Latest Products'}
            </h1>

            {/* Category Filter */}
            {Array.isArray(categories) && categories.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-8">
                    {categories.map(category => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedCategory === category
                                ? 'bg-indigo-600 text-white'
                                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))
                ) : (
                    <div className="col-span-full text-center text-gray-500 dark:text-gray-400 py-10 bg-white dark:bg-gray-800 rounded-lg shadow">
                        No products found {searchQuery ? `matching "${searchQuery}"` : 'in this category'}.
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductListing;
