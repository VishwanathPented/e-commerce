import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 transition-colors duration-200">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
                <div className="xl:grid xl:grid-cols-3 xl:gap-8">
                    <div className="space-y-8 xl:col-span-1">
                        <Link to="/" className="flex items-center">
                            <span className="sr-only">LuxeCart</span>
                            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-pink-500 font-[Outfit]">
                                LuxeCart
                            </span>
                        </Link>
                        <p className="text-gray-500 dark:text-gray-400 text-base">
                            Premium quality products for a premium lifestyle. Redefining your shopping experience with style and elegance.
                        </p>
                        <div className="flex space-x-6">
                            <a href="#" className="text-gray-400 hover:text-indigo-500 transition-colors">
                                <span className="sr-only">Facebook</span>
                                <Facebook className="h-6 w-6" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-pink-500 transition-colors">
                                <span className="sr-only">Instagram</span>
                                <Instagram className="h-6 w-6" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                                <span className="sr-only">Twitter</span>
                                <Twitter className="h-6 w-6" />
                            </a>
                        </div>
                    </div>
                    <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div>
                                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Shop</h3>
                                <ul className="mt-4 space-y-4">
                                    <li>
                                        <Link to="/products" className="text-base text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">All Products</Link>
                                    </li>
                                    <li>
                                        <Link to="/products" className="text-base text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">New Arrivals</Link>
                                    </li>
                                    <li>
                                        <Link to="/products" className="text-base text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Featured</Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="mt-12 md:mt-0">
                                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Support</h3>
                                <ul className="mt-4 space-y-4">
                                    <li>
                                        <Link to="#" className="text-base text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Contact Us</Link>
                                    </li>
                                    <li>
                                        <Link to="#" className="text-base text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">FAQ</Link>
                                    </li>
                                    <li>
                                        <Link to="#" className="text-base text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Shipping & Returns</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="md:grid md:grid-cols-1 md:gap-8">
                            <div>
                                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Contact</h3>
                                <ul className="mt-4 space-y-4">
                                    <li className="flex items-center text-base text-gray-500 dark:text-gray-400">
                                        <MapPin className="h-5 w-5 mr-2 text-indigo-500" />
                                        123 Fashion Ave, NY 10001
                                    </li>
                                    <li className="flex items-center text-base text-gray-500 dark:text-gray-400">
                                        <Phone className="h-5 w-5 mr-2 text-indigo-500" />
                                        +1 (555) 123-4567
                                    </li>
                                    <li className="flex items-center text-base text-gray-500 dark:text-gray-400">
                                        <Mail className="h-5 w-5 mr-2 text-indigo-500" />
                                        support@luxecart.com
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-12 border-t border-gray-200 dark:border-gray-700 pt-8">
                    <p className="text-base text-gray-400 xl:text-center">
                        &copy; 2024 LuxeCart Inc. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
