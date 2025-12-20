import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const LandingPage = () => {
    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className="bg-white dark:bg-gray-900 transition-colors duration-200">
            {/* Hero Section */}
            <div className="relative bg-gray-900 overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        className="w-full h-full object-cover opacity-60"
                        src="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                        alt="Fashion background"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/40 to-transparent"></div>
                </div>
                <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        transition={{ duration: 0.8 }}
                        variants={fadeInUp}
                    >
                        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                            New Arrivals are here
                        </h1>
                        <p className="mt-6 text-xl text-gray-300 max-w-3xl">
                            Discover the latest trends in fashion, electronics, and home essentials.
                            Premium quality products for a premium lifestyle.
                        </p>
                        <div className="mt-10">
                            <Link
                                to="/products"
                                className="inline-block bg-indigo-600 border border-transparent py-3 px-8 rounded-md font-medium text-white hover:bg-indigo-700 transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                            >
                                Shop Collection
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Features Section */}
            <div className="py-12 bg-gray-50 dark:bg-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="lg:text-center">
                        <h2 className="text-base text-indigo-600 dark:text-indigo-400 font-semibold tracking-wide uppercase">Why Choose Us</h2>
                        <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                            A better way to shop
                        </p>
                    </div>

                    <div className="mt-10">
                        <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
                            {[
                                {
                                    name: 'Free Shipping',
                                    description: 'We offer free shipping on all orders over $100. No heavy lifting required.',
                                    icon: (
                                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    ),
                                },
                                {
                                    name: '24/7 Support',
                                    description: 'Our team is here to help you around the clock with any questions or issues.',
                                    icon: (
                                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                                        </svg>
                                    ),
                                },
                                {
                                    name: 'Secure Payment',
                                    description: 'Your payment information is processed securely. We don\'t store credit card details.',
                                    icon: (
                                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                    ),
                                },
                            ].map((feature, index) => (
                                <motion.div
                                    key={feature.name}
                                    className="relative"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.2, duration: 0.5 }}
                                >
                                    <dt>
                                        <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                                            {feature.icon}
                                        </div>
                                        <p className="ml-16 text-lg leading-6 font-medium text-gray-900 dark:text-white">{feature.name}</p>
                                    </dt>
                                    <dd className="mt-2 ml-16 text-base text-gray-500 dark:text-gray-400">{feature.description}</dd>
                                </motion.div>
                            ))}
                        </dl>
                    </div>
                </div>
            </div>

            {/* Featured Categories (Static) */}
            <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
                <div className="sm:flex sm:items-baseline sm:justify-between">
                    <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">Shop by Category</h2>
                    <Link to="/products" className="hidden text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 sm:block">
                        Browse all categories<span aria-hidden="true"> &rarr;</span>
                    </Link>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:grid-cols-3 md:gap-x-6 lg:gap-8">
                    {[
                        { name: 'Electronics', img: 'https://images.unsplash.com/photo-1498049860654-af1a5c5668ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80' },
                        { name: 'Fashion', img: 'https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-1.2.1&auto=format&fit=crop&w=1951&q=80' },
                        { name: 'Home & Living', img: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1953&q=80' }
                    ].map((category) => (
                        <div key={category.name} className="group relative rounded-lg overflow-hidden bg-white dark:bg-gray-800 shadow-lg h-80 hover:shadow-xl transition-shadow duration-300">
                            <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700">
                                <img src={category.img} alt={category.name} className="w-full h-full object-center object-cover group-hover:opacity-75 transition-opacity" />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black opacity-60"></div>
                            <div className="absolute bottom-0 p-6">
                                <h3 className="text-xl font-bold text-white">
                                    <Link to="/products">
                                        <span className="absolute inset-0" />
                                        {category.name}
                                    </Link>
                                </h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Newsletter */}
            <div className="bg-indigo-700 dark:bg-indigo-900">
                <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
                    <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                        <span className="block">Ready to dive in?</span>
                        <span className="block text-indigo-200">Start your free trial today.</span>
                    </h2>
                    <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
                        <div className="inline-flex rounded-md shadow">
                            <Link to="/register" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50">
                                Get started
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
