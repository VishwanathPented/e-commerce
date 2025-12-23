import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu, X, Sun, Moon, Search, User, LogOut, Heart, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const { cartCount } = useCart();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const handleLogout = () => {
        logout();
        navigate('/');
        setIsProfileOpen(false);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
            setSearchQuery('');
        }
    };

    return (
        <nav className="sticky top-0 z-50 bg-gray-50/80 dark:bg-gray-900/90 backdrop-blur-md shadow-sm transition-colors duration-200 border-b border-gray-200/50 dark:border-gray-700/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo & Links */}
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0 flex items-center">
                            <span className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600 font-[Outfit]">LuxeCart</span>
                        </Link>
                        <div className="hidden md:ml-8 md:flex md:space-x-8">
                            <Link to="/" className="text-gray-900 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Home</Link>
                            {user && (
                                <Link to="/products" className="text-gray-900 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Shop</Link>
                            )}
                            {user && user.role === 'ROLE_ADMIN' && (
                                <Link to="/admin" className="text-gray-900 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Admin</Link>
                            )}
                        </div>
                    </div>

                    {/* Search Bar (Hidden for guests) */}
                    <div className="hidden md:flex flex-1 max-w-md mx-8">
                        {user && (
                            <form onSubmit={handleSearch} className="relative w-full">
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-[Inter]"
                                />
                                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                            </form>
                        )}
                    </div>

                    {/* Right Side Icons */}
                    <div className="flex items-center space-x-2 sm:space-x-4">
                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none transition-colors"
                        >
                            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                        </button>

                        {/* Wishlist Link */}
                        {user && (
                            <Link to="/wishlist" className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none transition-colors relative">
                                <Heart size={20} />
                            </Link>
                        )}

                        {/* Cart Logic: Only show if user is logged in */}
                        {user && (
                            <Link to="/cart" className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none transition-colors relative">
                                <ShoppingCart size={20} />
                                {cartCount > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-bounce">
                                        {cartCount}
                                    </span>
                                )}
                            </Link>
                        )}

                        <div className="hidden md:ml-4 md:flex items-center">
                            {user ? (
                                <div className="relative">
                                    <button
                                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                                        className="flex items-center max-w-xs text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 bg-gray-200 dark:bg-gray-700 p-2"
                                    >
                                        <User size={20} className="text-gray-600 dark:text-gray-300" />
                                    </button>

                                    {/* Profile Dropdown */}
                                    {isProfileOpen && (
                                        <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                                            <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700">
                                                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{user.fullName || 'User'}</p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
                                            </div>
                                            {user.role === 'ROLE_ADMIN' && (
                                                <Link to="/admin" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => setIsProfileOpen(false)}>
                                                    <div className="flex items-center"><LayoutDashboard size={16} className="mr-2" /> Dashboard</div>
                                                </Link>
                                            )}
                                            <Link to="/orders" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => setIsProfileOpen(false)}>
                                                My Orders
                                            </Link>
                                            <Link to="/wishlist" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => setIsProfileOpen(false)}>
                                                My Wishlist
                                            </Link>
                                            <button
                                                onClick={handleLogout}
                                                className="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                                            >
                                                <div className="flex items-center"><LogOut size={16} className="mr-2" /> Logout</div>
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="flex items-center space-x-4">
                                    <Link to="/login" className="text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                                        Login
                                    </Link>
                                    <Link to="/register" className="btn-primary py-2 px-4 shadow-md hover:shadow-lg">
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
                    <div className="px-4 pt-4 pb-2">
                        <form onSubmit={(e) => { handleSearch(e); setIsMenuOpen(false); }}>
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                            />
                        </form>
                    </div>
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link to="/" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700">Home</Link>
                        <Link to="/products" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700">Shop</Link>
                        {user && user.role === 'ROLE_ADMIN' && (
                            <Link to="/admin" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700">Admin Dashboard</Link>
                        )}
                    </div>
                    <div className="pt-4 pb-4 border-t border-gray-200 dark:border-gray-700">
                        {user ? (
                            <div className="px-4 space-y-3">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                                            <User className="h-6 w-6 text-gray-500 dark:text-gray-300" />
                                        </div>
                                    </div>
                                    <div className="ml-3">
                                        <div className="text-base font-medium text-gray-800 dark:text-gray-200">{user.fullName || 'User'}</div>
                                        <div className="text-sm font-medium text-gray-500 dark:text-gray-400">{user.email}</div>
                                    </div>
                                </div>
                                <div className="mt-3 space-y-1">
                                    <Link to="/orders" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700">My Orders</Link>
                                    <Link to="/wishlist" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700">My Wishlist</Link>
                                    <button onClick={handleLogout} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 dark:text-red-400 hover:bg-gray-50 dark:hover:bg-gray-700">Logout</button>
                                </div>
                            </div>
                        ) : (
                            <div className="px-4 space-y-2">
                                <Link to="/login" className="block text-center w-full px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">Login</Link>
                                <Link to="/register" className="block text-center w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-base font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">Sign Up</Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
