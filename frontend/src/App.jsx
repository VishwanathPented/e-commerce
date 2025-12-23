import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './pages/Login';
import Register from './pages/Register';
import LandingPage from './pages/LandingPage';
import ProductListing from './pages/ProductListing';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import Checkout from './pages/Checkout';
import OrderHistory from './pages/OrderHistory';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import AdminDashboard from './pages/AdminDashboard';
import { ThemeProvider } from './context/ThemeContext';

import { CartProvider } from './context/CartContext';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <CartProvider>
            <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
              <Toaster position="bottom-right" reverseOrder={false} />
              <Navbar />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />

                  {/* Admin Route */}
                  <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />

                  {/* Public Routes with Optional Auth */}
                  <Route path="/products" element={<ProductListing />} />
                  <Route path="/products/:id" element={<ProductDetails />} />

                  {/* Protected Routes */}
                  <Route path="/cart" element={<PrivateRoute><Cart /></PrivateRoute>} />
                  <Route path="/wishlist" element={<PrivateRoute><Wishlist /></PrivateRoute>} />
                  <Route path="/checkout" element={<PrivateRoute><Checkout /></PrivateRoute>} />
                  <Route path="/orders" element={<PrivateRoute><OrderHistory /></PrivateRoute>} />
                </Routes>
              </main>
              <Footer />
            </div>
          </CartProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
