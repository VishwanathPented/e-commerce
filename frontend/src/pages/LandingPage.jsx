import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Truck, ShieldCheck, Clock, ArrowRight, Heart, Star } from 'lucide-react';

const LandingPage = () => {
    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className="bg-gray-50 dark:bg-gray-900 transition-colors duration-200 overflow-hidden">

            {/* Hero Section with Animated Gradient Mesh */}
            <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
                {/* Background Blobs */}
                <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-purple-400 dark:bg-purple-900 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                <div className="absolute top-[-10%] right-[-10%] w-[40rem] h-[40rem] bg-indigo-400 dark:bg-indigo-900 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-[-10%] left-[20%] w-[40rem] h-[40rem] bg-pink-400 dark:bg-pink-900 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        transition={{ duration: 0.8 }}
                        variants={fadeInUp}
                    >
                        <span className="inline-block py-1 px-3 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-300 text-sm font-semibold mb-6 border border-indigo-200 dark:border-indigo-700">
                            New Season Arrivals
                        </span>
                        <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6">
                            Redefine Your <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                                Digital Lifestyle
                            </span>
                        </h1>
                        <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-10">
                            Experience the future of shopping with our curated collection of premium products.
                            Quality, style, and innovation in every package.
                        </p>
                        <div className="flex justify-center gap-4">
                            <Link
                                to="/products"
                                className="inline-flex items-center bg-indigo-600 text-white px-8 py-4 rounded-full font-medium hover:bg-indigo-700 transition-all shadow-lg hover:shadow-indigo-500/25 hover:-translate-y-1"
                            >
                                Shop Collection <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                            <Link
                                to="/register"
                                className="inline-flex items-center bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 px-8 py-4 rounded-full font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-all hover:-translate-y-1"
                            >
                                Get Started
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Glassmorphism Features Section */}
            <div className="py-24 bg-white dark:bg-gray-900 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Why Choose Us</h2>
                        <p className="mt-2 text-4xl font-extrabold text-gray-900 dark:text-white">
                            Shopping reimagined
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                name: 'Free Worldwide Shipping',
                                description: 'On all orders over $100. Delivered to your doorstep with care.',
                                icon: <Truck className="h-8 w-8 text-indigo-500" />
                            },
                            {
                                name: '24/7 Premium Support',
                                description: 'Our dedicated team is here to assist you anytime, anywhere.',
                                icon: <Clock className="h-8 w-8 text-pink-500" />
                            },
                            {
                                name: 'Secure Payments',
                                description: 'Bank-grade encryption ensures your data is always safe.',
                                icon: <ShieldCheck className="h-8 w-8 text-purple-500" />
                            },
                        ].map((feature, index) => (
                            <motion.div
                                key={feature.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                                className="p-8 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
                            >
                                <div className="w-14 h-14 rounded-xl bg-gray-50 dark:bg-gray-700 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{feature.name}</h3>
                                <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                                    {feature.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Trending Categories */}
            <div className="py-24 bg-gray-50 dark:bg-gray-800/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Trending Categories</h2>
                            <p className="mt-2 text-gray-500">Explore our most popular collections</p>
                        </div>
                        <Link to="/products" className="text-indigo-600 font-medium hover:text-indigo-700 flex items-center">
                            View all <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { name: 'Electronics', img: 'https://images.unsplash.com/photo-1498049860654-af1a5c5668ba?auto=format&fit=crop&w=800&q=80', count: '120+ Products' },
                            { name: 'Fashion', img: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=800&q=80', count: '350+ Products' },
                            { name: 'Home & Living', img: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?auto=format&fit=crop&w=800&q=80', count: '80+ Products' }
                        ].map((cat) => (
                            <Link key={cat.name} to="/products" className="group relative h-96 rounded-3xl overflow-hidden cursor-pointer">
                                <img
                                    src={cat.img}
                                    alt={cat.name}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                                <div className="absolute bottom-0 left-0 p-8">
                                    <h3 className="text-2xl font-bold text-white mb-1">{cat.name}</h3>
                                    <p className="text-white/80 text-sm flex items-center gap-2">
                                        {cat.count} <span className="w-1 h-1 bg-white rounded-full"></span> Trending
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
