import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu, X, Sun, Moon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-800/90 backdrop-blur-md shadow-md transition-colors duration-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0 flex items-center">
                            <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">ShopEasy</span>
                        </Link>
                        <div className="hidden md:ml-6 md:flex md:space-x-8">
                            <Link to="/" className="text-gray-900 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Home</Link>
                            <Link to="/products" className="text-gray-900 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Shop</Link>
                            {user && user.role === 'ROLE_ADMIN' && (
                                <Link to="/admin" className="text-gray-900 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Admin Dashboard</Link>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none transition-colors"
                        >
                            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                        </button>

                        {/* Wishlist Link */}
                        {user && (
                            <Link to="/wishlist" className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none transition-colors">
                                <span role="img" aria-label="wishlist">❤️</span>
                            </Link>
                        )}

                        {/* Cart Logic: Only show if user is logged in */}
                        {user && (
                            <Link to="/cart" className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none transition-colors">
                                <ShoppingCart size={24} />
                            </Link>
                        )}

                        <div className="hidden md:flex items-center space-x-4">
                            {user ? (
                                <div className="flex items-center space-x-4">
                                    <span className="text-sm text-gray-700 dark:text-gray-300">Hello, {user.role === 'ROLE_ADMIN' ? 'Admin' : 'User'}</span>
                                    <button onClick={handleLogout} className="text-sm text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 font-medium transition-colors">
                                        Logout
                                    </button>
                                </div>
                            ) : (
                                <div className="flex items-center space-x-4">
                                    <Link to="/login" className="text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                                        Login
                                    </Link>
                                    <Link to="/register" className="bg-indigo-600 dark:bg-indigo-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors">
                                        Sign Up
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Mobile menu button */}
                        <div className="flex items-center md:hidden">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 transition-colors"
                            >
                                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700">Home</Link>
                        <Link to="/products" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700">Shop</Link>
                        {user && user.role === 'ROLE_ADMIN' && (
                            <Link to="/admin" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700">Admin Dashboard</Link>
                        )}
                    </div>
                    <div className="pt-4 pb-4 border-t border-gray-200 dark:border-gray-700">
                        {user ? (
                            <div className="px-4 flex items-center justify-between">
                                <div className="text-base font-medium text-gray-800 dark:text-gray-200">Hello, {user.role === 'ROLE_ADMIN' ? 'Admin' : 'User'}</div>
                                <button onClick={handleLogout} className="text-sm font-medium text-red-600 dark:text-red-400">Logout</button>
                            </div>
                        ) : (
                            <div className="px-4 space-y-2">
                                <Link to="/login" className="block text-center w-full px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">Login</Link>
                                <Link to="/register" className="block text-center w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-base font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">Sign Up</Link>
                            </div>
                        )}
                        {user && (
                            <Link to="/wishlist" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700">My Wishlist</Link>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
